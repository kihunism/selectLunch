<template>
  <div>
    <div id="mainpage">
      <NavbarPage />
      <div class="history-onboarding-filter">
        <button class="mainbtn">메뉴 추첨하기</button>
        <select name="category" class="mainsb">
          <option id="filter" v-for="(i, idx) in this.selectCategory" :key="idx" :value="i" @click="clickCategoryFilter(i)">{{ i }}</option>
        </select>
        <button class="mainbtn onboarding" @click="clickOnboarding">메뉴 등록</button>
      </div>
    </div>
    <PaginationPage />
  </div>
</template>

<script>
import NavbarPage from '../components/commons/NavbarPage.vue'
import axios from 'axios'
import PaginationPage from './PaginationPage.vue'

export default {
  name: 'MainPage',
  components: {
    NavbarPage,
    PaginationPage,
},
  data() {
    return {
      foodData: this.$store.state.foodData,
      storesArray: this.$store.state.stores,
      selectCategory: this.$store.state.selectCategory,
      selectedCategory: '',
      keyValue: 0,
      outer: []
    }
  },
  methods: {
    clickOnboarding() {
      axios({
        url: 'http://localhost:3000/shops/getstore',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
        },
        method: 'get',
        data: null
      }).then((res) => {
        this.$store.commit('getStores', res.data.data)
        this.$router.push('/onboarding')
      })
    },
  },
}
</script>

<style>
.history-onboarding-filter{
  margin: 30px 250px;
}
.mainbtn{
  margin: 10px;
  border-radius: 5px;
  border: 1px solid black;
  padding: 10px;
  font-size: 24px;
}
.mainsb {
  font-family: inherit;  
  background: url('../assets/arrow.png') no-repeat 95% 50%; 
  -webkit-appearance: none; 
  -moz-appearance: none;
  appearance: none;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid black;
  padding: 10px;
  background-color: white;
  color: black;
  font-size: 24px;
  width: 160px;
}

.onboarding {
  float: right;
}

.listWrap {
  text-align: center;
}
</style>