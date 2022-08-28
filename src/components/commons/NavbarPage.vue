<template>
    <div>
    <div class="modal-outer" v-if="this.logoutModal === true">
        <div class="modal-inner">
            <div class="divbtn">
                <h5>로그아웃을 하시겠습니까?</h5>
                <button class="logoutBtn" @click="logoutYesClick">네</button>
                <button class="logoutBtn" @click="logoutNoClick">아니오</button>
            </div>
        </div>
    </div>
 
    <nav id="navbar">

        <div id="introduction">
            <button id="navbtn" @click="moveMain"><h2>점심 뭐먹지?</h2></button>
        </div>

        <div id="clickbutton">
            <ul class="users" >
                <li class="users-li">
                    <button id="navbtn" @click="mypageClick">Mypage</button>
                </li>
                <li class="users-li">
                    <button id="navbtn" @click="logoutClick">Logout</button>
                </li>
            </ul>
        </div>
        
    </nav>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            logoutModal: false
        }
    },

    methods: {
        logoutClick() {
            console.log('logout 클릭')
            this.logoutModal = true
        },
        mypageClick() {
            this.$router.push('/myinfo')
        },
        moveMain() {
            axios({
                url: 'http://localhost:3000/boards/data',
                method: 'get',
                data: null
            }).then(async (res) => {
                this.foodData = res.data.data
                const tempShop = res.data.data

                let tempStores = []
                let values = []

                const shopIdArray = tempShop.map((i) => {
                    return i.shop_id
                })

                // 추후에 map() or 재귀호출로 변경
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

                this.$router.push('/boards').catch((err) => {console.log(err)})
                // this.$router.go()

            }).catch((err) => {
                console.log(err)
            }).finally(() => {

            })

            
        },
        logoutYesClick() {

            this.logoutModal = false
            this.$store.commit('logout')

            this.$router.push('/login')
        },
        logoutNoClick() {
            this.logoutModal = false
        }
     },
}
</script>

<style>
#navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 200px;
    background-color: black;
}

#introduction {
    text-align: center;
}
#navbtn {
    font-size: 24px;
    color: white;
    margin: 10px;
}
.users {
    list-style: none;
    display: flex;
    margin: 0;
    padding-left: 0;
}
.modal-outer {
    width: 100%;
    height: 100%;
    background: rgba(50, 100, 50, 0.5);
    position: fixed;
}

.modal-inner {
    width: 50%;
    height: 20%;
    /* text-align: center; */
    margin: 0;
    background: white;
    border-radius: 5px;
    padding: 30px;
    top: 25%;
    left: 25%;
    position: absolute;
}

.logoutBtn {
    font-size: 24px;
    cursor: pointer;
    border: none;
    background: #6667AB;
    color: white;
    font-weight: bolder;
    border-radius: 5px;
    padding: 5px 15px;
    margin: 10px;
}
.divbtn {
    text-align: center;
}
</style>