<template>
  <div id="resetpw">
    <NavbarPage></NavbarPage>
    <div class="intro">
        <h2>비밀번호 변경</h2>
    </div>
    <form id="inputForm">
        <div>
            <input
                type="email"
                name=""
                :value="this.email"
                required
                class="input"
                readonly
            />
        </div>
        <div>
            <input
                type="password"
                name=""
                placeholder="현재 비밀번호"
                required
                class="input"
                v-model="pw"
            />
        </div>
        <div>
            <input
                type="password"
                name=""
                placeholder="새 비밀번호"
                required
                class="input"
                v-model="newPW"
            />
        </div>
        <div>
            <input
                type="password"
                name=""
                placeholder="새 비밀번호 확인"
                required
                class="input"
                v-model="newPWConfirm"
            />
        </div>
    </form>
    <div>
        <button class="join" @click="clickResetPW">비밀번호 변경하기</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavbarPage from '../../components/commons/NavbarPage.vue'

export default {
    components: {
        NavbarPage,
    },
    methods: {
        clickResetPW() {

            if(!this.email || !this.pw || !this.newPW || !this.newPWConfirm) {
                alert('이메일, 현재 비밀번호, 새 비밀번호, 새 비밀번호 확인을 입력하십시오.')
                return
            }

            if(this.newPW !== this.newPWConfirm) {
                alert('새 비밀번호를 다시 확인하십시오.')
            }

            axios({
                url: 'http://localhost:3000/users/reset-pw',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                data: {
                    email: this.email,
                    pw: this.pw,
                    newPW: this.newPW,
                    newPWConfirm: this.newPWConfirm
                }
            }).then((res) => {
                console.log(res.data.data)
                
                // !TODO mutation으로 상태 변화 시키기
                this.$store.commit('resetPW', res.data.data.newPW)
                this.$router.push('/')
            }).catch((err) => {
                console.log(`resetpwpage err console: ${err}`)
                alert('현재 비밀번호가 일치하지 않습니다.')
            })
        }
    },
    data() {
        return {
            email: this.$store.state.email,
            pw: '',
            newPW: '',
            newPWConfirm: ''
        }
    }
}
</script>

<style>
#resetpw {
    text-align: center;
}
.intro {
    margin: 20px;
}
</style>