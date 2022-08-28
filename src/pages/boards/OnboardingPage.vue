<template>
<div>
    <!-- 다이얼로그 -->
    <div class="outer" v-if="this.selectIsModal === true" @click="clickOuter">
        <div class="inner">
            <div class="desc">
                <table class="store-table">
                    <thead>
                        <tr>
                            <th class="store-th">이름</th>
                            <th class="store-th">설명</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(i, idx) in this.stores" :key="idx">
                            <td class="store-td" >{{ i.store }}</td>
                            <td class="store-td" @click="clickDesc(i.store, i.id)">{{ i.description }}</td>
                        </tr>
                    </tbody>
                </table>


            </div>
        </div>
    </div>

    <div id="onboarding">
        <NavbarPage />
        <div class="sbipWrap">
            <select name="category" class="onboardingsb secsb">
                <option v-for="(i, idx) in totalExceptionSelect" :key="idx" :value="i" @click="categoryTrans(i)">
                    {{ i }}
                </option>
            </select>
            <!-- <v-select
                v-model="category"
                :items="selectCategory"
                background-color="lime"
                :change="categoryTrans"
            ></v-select> -->
            <button class="select-store" @click="clickStoreSelect">
                {{ this.selectIsStoreValue }}
            </button>
            <span class="store-name">{{ this.selectStoreName }}</span>
            <div>
                <input 
                    v-model="title"
                    type="text"
                    placeholder="메뉴 이름"
                    required
                    class="input"
                />
            </div>    
        </div>
        <div>
            <textarea 
                v-model="content"
                placeholder="내용"
                required
                class="obinput"                
            ></textarea>
        </div>

        <div>
            <button class="onboardingbtn" @click="clickOnboardingBtn">등록</button>
        </div>
    </div>
  </div>
</template>

<script>
import NavbarPage from '../../components/commons/NavbarPage.vue'
import axios from 'axios'

export default {
    data() {
        return {
            userId: this.$store.state.id,
            shopId: '',
            title: '',
            content: '',
            name: this.$store.state.name,
            category: '',
            regDate: '',
            foodDate: [],
            stores: this.$store.state.stores,
            selectIsModal: false,
            selectIsStore: false,
            selectIsStoreValue: '가게 선택',
            selectStoreName: '',
            selectCategory: this.$store.state.selectCategory
        }
    },
    computed: {
        totalExceptionSelect() {
            return this.selectCategory.slice(1, this.selectCategory.length)
        }
    },
    components: {
        NavbarPage,
    },
    methods: {
        categoryTrans(category) {
            this.category = category
        },
        clickOnboardingBtn() {
            const date = new Date()
            const year = date.getFullYear()
            const month = date.getMonth()  + 1
            const day = date.getDate()
            const testRegDate = `${year}.${month}.${day}`

            this.regDate = testRegDate
            
            if(!this.content || !this.title || !this.shopId) {
                alert('모든 항목을 입력해주세요.')
                return
            }

            axios({
                url: 'http://localhost:3000/boards/onboarding',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                data: {
                    userId: this.userId,
                    category: this.category,
                    title: this.title,
                    content: this.content,
                    name: this.name,
                    regdate: this.regDate,
                    shopId: this.shopId
                }
            }).then((res) => {
                console.log(res.data)
                console.log('게시글 등록 성공')
                
                this.$router.push('/')

            }).catch((err) => {
                console.log(err)
            })
        },
        clickDesc(name, shopId) {
            // TODO 가게 이름 전달
            this.selectStoreName = name
            this.shopId = shopId
            
            this.selectIsModal = false
        },
        clickStoreSelect() {
            this.selectIsModal = true
        },
        clickOuter() {
            this.selectIsModal = false
        }
    }
}
</script>

<style>
.store-name {
    font-size: 20px;
    height: 30px;
    margin-left: 25px;
}
.select-store{
    border: 1px solid black;
    border-radius: 5px;
    width: 120px;
    padding: 5px;
    font-size: 20px;
}
.store-table{
    width: 100%;
    border: 1px solid black;
    border-collapse: collapse;
}
.store-th{
    border: 1px solid black;
    padding: 3px;
}

.store-td{
    border: 1px solid black;
    padding: 20px;
    
}

#onboarding{
    text-align: center;
}

.onboardingsb {
    font-family: inherit;  
    background: url('../../assets/arrow.png') no-repeat 95% 50%; 
    -webkit-appearance: none; 
    -moz-appearance: none;
    appearance: none;
    margin: 10px;
    border-radius: 5px;
    border: 1px solid black;
    padding: 5px;
    background-color: white;
    color: black;
    font-size: 18px;
    width: 125px;
}

.secsb {
    margin-top: 100px;
}
.sbipWrap {
    margin-right: 500px;
}

.onboardingbtn {
    border: 1px solid black;
    border-radius: 6px;
    color: #fff;
    width: 80px;
    height: 50px;
    background-color: rgb(155, 0, 155);
    margin: 5px;
}
.obinput {
    margin-right: 640px;
    border: 1px solid black;
    margin: 5px;
    border-radius: 8px;
    padding: 10px;
    width: 800px;
    height: 300px;
}

.outer {
    width: 100%;
    height: 100%;
    background: rgba(50, 100, 50, 0.5);
    position: fixed;
    /* /* text-align: center; */
    display: flex;
}

.inner{
    width: 80%;
    height: 80%;
    /* margin: 0 auto; */
    background: white;
    border: 5px;
    padding: 50px;
    /* position: absolute; */
    justify-content: center;
    align-items: center;
    max-height: calc(100vh - 210px);
    overflow-y: auto;
}

.desc {
    margin: 10px;
    font-size: 20px;
}

.store-head {
    white-space: nowrap;
    border-radius: 1px;
}
.store-body {
    white-space: nowrap;
    border-radius: 1px;
}
</style>