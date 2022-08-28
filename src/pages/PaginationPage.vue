<template>
  <div>
    <div>
        <div class="listWrap">
            <table class="tablelist">
                <colgroup>
                    <col width="12%" />
                    <col width="*" />
                    <col width="20%" />
                    <col width="12%" />
                    <col width="15%" />
                </colgroup>

                <tr class="thead">
                    <th>카테고리</th>
                    <th>음식</th>
                    <th>가게</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>

                <tr class="tdbody" v-for="(i, idx) in paginatedData" :key="idx">
                    <td>{{ i.category }}</td>
                    <td>{{ i.title }}</td>
                    <td>{{ paginatedStoreData[idx] }}</td>
                    <td>{{ i.name }}</td>
                    <td>{{ i.regdate }}</td>
                </tr>
            </table>
            <div class="btnWrap">
                <button class="pnbtn" :disabled="pageNum === 0" @click="prevPage">이전</button>
                <span class="pagenumber">{{ pageNum + 1 }} / {{ pageCount }}</span>
                <button class="pnbtn" :disabled="pageNum >= pageCount - 1" @click="nextPage">다음</button>
            </div>
        </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'PaginationPage',
    data() {
        return {
            originList: this.$store.state.foodData,
            originStores: this.$store.state.stores,
            pageNum: 0,
            pageSize: 5,
            category: this.$route.params.category
        }
    },
    methods: {
        nextPage() {
            this.pageNum += 1
        },
        prevPage() {
            this.pageNum -= 1
    }

    },
    computed: {
        pageCount() {
            // 전체 페이지 수 
            let listLeng = this.originList.length
            let listSize = this.pageSize
            let page = Math.floor(listLeng / listSize)

            if(listLeng % listSize > 0) page += 1

            return page
        },
        paginatedData() {
            // 리스트 자르기
            const start = this.pageNum * this.pageSize
            const end = start + this.pageSize

            return this.originList.slice(start, end)
        },
        paginatedStoreData() {
            // 리스트 자르기2
            const start = this.pageNum * this.pageSize
            const end = start + this.pageSize

            return this.originStores.slice(start, end)
        },
    },
    created() {

        if(this.category === '전체' || this.category === undefined || this.category === '' || this.category === null) {

            axios({
                url: 'http://localhost:3000/boards/data',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json'
                },
                method: 'get',
                data: null
            }).then(async (res) => {
                this.foodData = res.data.data
                this.$store.commit('getFoodData', this.foodData)

                const tempShop = res.data.data
                let tempStores = []
                let values = []

                const shopIdArray = tempShop.map((i) => {
                return i.shop_id
                })

                

                for(let i = 0; i < shopIdArray.length; i++) {
                    tempStores[i] = await axios({
                        url: 'http://localhost:3000/shops/main-list',
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest',
                            'Content-Type': 'application/json'
                        },
                        method: 'get',
                        params: shopIdArray[i]
                        })     

                    values = [...tempStores]
                }

                const lastStores = values.map((i) => {
                    return i.data.data[0].store
                })
                this.$store.commit('getStores', lastStores)

                this.originList = this.$store.state.foodData
                this.originStores = this.$store.state.stores
                
            }).catch((err) => {
                console.log(err)
            })
            // end
        }
        // else {
        //     axios({
        //         url: 'http://localhost:3000/boards/main-list',
        //         headers: {
        //             'X-Requested-With': 'XMLHttpRequest',
        //             'Content-Type': 'application/json'
        //         },
        //         method: 'get',
        //         data: null,
        //         params: { category: this.$store.state.category }
        //     }).then(async (res) => {
        //         this.foodData = res.data.data
        //         this.$store.commit('getFoodData', this.foodData)

        //         const tempShop = res.data.data
        //         let tempStores = []
        //         let values = []

        //         const shopIdArray = tempShop.map((i) => {
        //         return i.shop_id
        //         })

        //         for(let i = 0; i < shopIdArray.length; i++) {
        //         tempStores[i] = await axios({
        //             url: 'http://localhost:3000/shops/main-list',
        //             headers: {
        //                 'X-Requested-With': 'XMLHttpRequest',
        //                 'Content-Type': 'application/json'
        //             },
        //             method: 'get',
        //             params: shopIdArray[i]
        //             })     

        //         values = [...tempStores]
        //         }

        //         const lastStores = values.map((i) => {
        //             return i.data.data[0].store
        //         })
        //         this.$store.commit('getStores', lastStores)

        //         console.log('================================')
        //         this.originList = this.$store.state.foodData
        //         this.originStores = this.$store.state.stores
        //     }).catch((err) => {

        //         console.log(err)
        //     })
        //     // end
        // }
    },

}
</script>

<style>
.btnWrap {
    padding: 5px;
    /* margin: 300px; */
}
.pnbtn {
    padding: 10px;
    margin: 30px;
    border: 1px solid black;
    font-size: 25px;
    font-weight: bolder;
    background-color: black;
    color: white;
}
.pagenumber {
    font-size: 25px;
}
.listWrap {
    width: 100%
}

.tablelist {
    width: 100%;
    border-collapse: collapse;
    /* margin: ; */
    
}
.thead {
    font-size: 32px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: darkblue;
    background-color: black;
    color: white;
}
.tdbody {
    font-size: 20px;
    background-color: aqua;

}
/* .tdtd {
    padding: 10px;
    
} */
th, td {
    border: 1px solid aqua;
    padding: 10px;
}
</style>