<template>
  <div id="loginpage">
    <div class="introduction">
        <h1>점심 뭐 먹지?</h1>
    </div>
    <form id="inputForm">
        <div>
            <input
                v-model="email"
                type="email"
                placeholder="Email"
                required
                class="input"
            />
        </div>
        <div>
            <input
                v-model="pw"
                type="password"
                placeholder="Password"
                required
                class="input"
            />
        </div>
    </form>
        <div>
            <button class="loginjoin" @click="clickLogin">로그인</button>
        </div>
        <div>
            <button class="loginjoin" @click="$router.push('/create')">회원가입</button>
        </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
    mounted() {
        // axios({
        //     url: 'http://localhost:3000/boards/data',
        //     headers: {
        //         'X-Requested-With': 'XMLHttpRequest',
        //         'Content-Type': 'application/json'
        //     },
        //     method: 'get',
        //     data: null
        // }).then(async (res) => {
        //     this.foodData = res.data.data
        //     this.$store.commit('getFoodData', this.foodData)

        //     const tempShop = res.data.data
        //     let tempStores = []
        //     let values = []

        //     const shopIdArray = tempShop.map((i) => {
        //     return i.shop_id
        //     })

        //     for(let i = 0; i < shopIdArray.length; i++) {
        //     tempStores[i] = await axios({
        //         url: 'http://localhost:3000/shops/main-list',
        //         headers: {
        //             'X-Requested-With': 'XMLHttpRequest',
        //             'Content-Type': 'application/json'
        //         },
        //         method: 'get',
        //         params: shopIdArray[i]
        //         })     

        //     values = [...tempStores]
        //     }

        //     const lastStores = values.map((i) => {
        //         return i.data.data[0].store
        //     })
        //     this.$store.commit('getStores', lastStores)

            
        // }).catch((err) => {
        //     console.log(err)
        // }).finally(() => {

        // })
    },
    props: {

    },
    data() {
        return {
            id: 0,
            email: '',
            pw: '',
            name: '',
            foodData: [],
        }
    },
    methods: {
        clickLogin(e) {
            e.preventDefault();

            const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
            if(!regEmail.test(this.email)) {
                alert('이메일형식이 부정확합니다.')
                return
            }

            axios({
                url: 'http://localhost:3000/users/login',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                data: {
                    email: this.email,
                    pw: this.pw
                }
            }).then((res) => {
                const loginResult = res.data.data

                this.name = loginResult.name
                this.id = loginResult.id

                this.$store.commit('userLogin', {
                    id: this.id,
                    email: this.email,
                    pw: this.pw,
                })
                
                this.$store.commit('login', this.name)
                this.$router.push('/')

            }).catch((err) => {
                console.log(`err코드는: ${err}`)
                alert('아이디와 비밀번호를 확인하십시오.')
            })


            
        }
    }
}
</script>

<style>
#loginpage{
    text-align: center;
}
.introduction {
    margin-top: 50px;
    margin-bottom: 80px;
}
.input {
    border: 1px solid black;
    padding: 8px;
    width: 300px;
    height: 40px;
    margin: 5px;
    border-radius: 8px;
}
.loginjoin {
    border: 1px solid black;
    border-radius: 6px;
    color: #fff;
    width: 300px;
    height: 50px;
    background-color: rgb(255, 0, 85);
    margin: 5px;
}
</style>