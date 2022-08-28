<template>
  <div>
    <div v-if="isRecommendModal" class="recommend-outer">
      <div class="recommend-inner">
        <button @click="isRecommendModal = false" class="recommend-cancel">취소</button>
        
        <div class="menu">
          <span class="menu2">분류: {{ this.recommendFood[0] }}</span>
          <span class="menu2">메뉴: {{ this.recommendFood[1] }}</span>
          <span class="menu2">가게: {{ this.recommendFood[2] }}</span>
        </div>
      </div>
    </div>
    <div>
      <HistoryPage 
        v-if="isHistoryModal" 
        :isHistoryModal="this.isHistoryModal"
        :recommendFood="this.recommendFood"
      />
    </div>
    
    <NavbarPage />
    <div>
      <div class="history-onboarding-filter">
        <v-btn color="teal" class="recommend" @click="clickMenuRecommend">메뉴 추첨</v-btn>
        <select class="mainsb">
          <option id="filter" v-for="(el, idx) in this.selectCategory" :key="idx" :value="el" @click="clickCategoryFilter(el)">{{ el }}</option>
        </select>
        <v-btn color="cyan" @click="clickHistory">지난 내역</v-btn>
        <v-btn class="light-blue" @click="clickOnboarding">메뉴 등록</v-btn>
      </div>
      <ListPage 
        :foodList="paginatedData"
        :storeList="paginatedStoreData"
      />
      <TempTemp 
        :pageSize="this.pageSize"
        :totalListLength="this.foodList.length"
        :pageCount="pageCount"
        :pageNum="this.pageNum"
        v-on:prev="prev"
        v-on:next="next"
      />
    </div>
  </div>
</template>

<script>
import NavbarPage from '../../components/commons/NavbarPage.vue'
import axios from 'axios'
import HistoryPage from '../history/HistoryPage.vue'
import TempTemp from '../../components/paginations/TempTemp.vue'
import ListPage from '@/components/lists/ListPage.vue'
// import boardApi from '../../api/boards'


export default {
  components: {
    NavbarPage,
    HistoryPage,
    TempTemp,
    ListPage
},
  async created() {

    const tempFoodList = await axios({
      method: 'get',
      url: 'http://localhost:3000/boards/data'
    })
    // const tempFoodList = boardApi.getTotalFoodList('http://localhost:3000/boards/data', 'get')
    // console.log(tempFoodList)
    this.foodList = [...tempFoodList.data.data]

    let shopIdList = tempFoodList.data.data.map((el) => {
      return el.shop_id
    })
    const tempStoreList = await axios({
      method: 'get',
      url: 'http://localhost:3000/shops/main-list',
      params: shopIdList
    })
    
    this.storeList = tempStoreList.data.data.map((el) => {
      return el.store
    })

    console.log(`this.foodList: ${JSON.stringify(this.storeList)}`)
  },
  data() {
    return {
      selectCategory: this.$store.state.selectCategory,
      totalFoodData: this.$store.state.foodData,
      totalStoreData: this.$store.state.stores,
      recommendFood: '',
      category: '',
      isRecommendModal: false,
      isHistoryModal: false,

      foodList: [],
      storeList: [],
      pageSize: 5,
      pageNum: 0
    }
  },
  computed: {
      paginatedData() {
          // 리스트 자르기
          const start = this.pageNum * this.pageSize
          const end = start + this.pageSize

          return this.foodList.slice(start, end)
      },
      paginatedStoreData() {
          // 리스트 자르기2
          const start = this.pageNum * this.pageSize
          const end = start + this.pageSize

          return this.storeList.slice(start, end)
      },
      pageCount() {
        // 전체 페이지 수 
        let listLeng = this.foodList.length
        let listSize = this.pageSize
        let page = Math.floor(listLeng / listSize)

        if(listLeng % listSize > 0) page += 1

        return page
    },
  },
  
  methods: {
    next() {
      this.pageNum += 1
      console.log('===============')
    },
    prev() {
      this.pageNum -= 1
      console.log('===============prev')
    },
    clickHistory() {
      this.isHistoryModal = true
      this.$router.push('/history')
    },
    clickCategoryFilter(category) {
      console.log(category)

      axios({
        url: 'http://localhost:3000/boards/filter',
        method: 'get',
        params: { category }
      }).then(async (res) => {
          this.foodData = res.data.data
          const tempShop = res.data.data

          let tempStores = []
          let values = []

          const shopIdArray = tempShop.map((i) => {
            return i.shop_id
          })

          for(let i = 0; i < shopIdArray.length; i++) {
            tempStores[i] = await axios({
                url: 'http://localhost:3000/shops/main-list',
                method: 'get',
                params: shopIdArray[i]
              })     

            values = [...tempStores]
          }

          const lastStores = values.map((i) => {
            return i.data.data[0].store
          })
          
          this.$store.commit('getFoodData', this.foodData)
          this.$store.commit('getStores', lastStores)
          this.$router.push(`/boards/${category}`)

        }).catch((err) => {
            console.log(`err는 ${err}`)
        })
    // end
    },
    clickOnboarding() {
      
      axios({
        url: 'http://localhost:3000/shops/getstore',
        method: 'get',
      }).then((res) => {
        this.$store.commit('getStores', res.data.data)
        this.$router.push('/onboarding')
      })
    },
    clickMenuRecommend() {
      const totalStoreData = [...this.totalStoreData]
      const totalFoodData = [...this.totalFoodData]

      const recommendData = totalFoodData.map((el, idx) => {
        return [el.category, el.title, totalStoreData[idx]]
      })

      const end = recommendData.length

      if(end === 0) {
        alert('메뉴가 없습니다.')
        return
      }
      const randomNumber = Math.floor(Math.random() * end)

      this.recommendFood = recommendData[randomNumber]
      this.isRecommendModal = true
      console.log(this.recommendFood)
    },
    clickRecommendCancel() {
      this.isRecommendModal = false
    }
  },
}
</script>

<style>
.recommend {
  margin-bottom: 20px;
}
.recommend-inner {
  width: 80%;
  height: 50%;
  /* text-align: center; */
  margin: 0;
  background: white;
  border-radius: 5px;
  padding: 30px;
  top: 25%;
  left: 25%;
  position: absolute;
}

.recommend-outer {
  width: 100%;
  height: 100%;
  background: rgba(50, 100, 50, 0.5);
  position: fixed;
}
.menu{
  padding: 10px;
}
.menu2 {
  margin: 15px;
  font-size: 24px;
}
</style>