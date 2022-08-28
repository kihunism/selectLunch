<template>
  <div id="usersignuppage">
    <div class="introduction">
        <h1>점심 뭐 먹지?</h1>
    </div>
    <form id="inputForm">
        <div>
            <input
                v-model="email"
                type="email"
                name=""
                placeholder="Email"
                required
                class="input"
            />
        </div>
        <div>
            <input
                v-model="pw"
                type="password"
                name=""
                placeholder="Password"
                required
                class="input"                
            />
        </div>
        <div>
            <input
                v-model="pwConfirm"
                type="password"
                name=""
                placeholder="Password Confirm"
                required
                class="input"                
            />
        </div>
        <div>
            <input
                v-model="name"
                type="text"
                name=""
                placeholder="Name"
                required
                class="input"                
            />
        </div>
    </form>
        <div>
            <button class="join" @click="clickJoin">가입하기</button>
        </div>
        <div>
            <button class="join" @click="clickCancel">취소</button>
        </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {

  },
  data() {
    return {
      email: this.$store.state.email,
      pw: this.$store.state.pw,
      pwConfirm: this.$store.state.pwConfirm,
      name: this.$store.state.name
    }
  },
  methods: {
    clickJoin(e) {
      
      e.preventDefault();
      if(!this.pw === '' || !this.pw === '' || this.pwConfirm === '' || this.name === '') {
        alert('아이디 및 비밀번호, 이름을 입력하십시오.')
        return
      }

      if(this.pw !== this.pwConfirm) {
        alert('비밀번호를 다시 확인하십시오.')
      }

      const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
      if(!regEmail.test(this.email)) {
        alert('이메일형식이 부정확합니다.')
      }

      axios({
          url: 'http://localhost:3000/users/join',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
          },
          method: 'post',
          data: {
              email: this.email,
              pw: this.pw,
              pwConfirm: this.pwConfirm,
              name: this.name
          }
          }).then((res) => {
              console.log(res.data)
              this.$router.push('/login')
          }).catch((err) => {
              console.log(`회원가입페이지, err코드는: ${err}`)
          })
    },

    clickCancel() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
#usersignuppage{
  text-align: center;
}
.introduction {
    margin-top: 50px;
    margin-bottom: 80px;
}
.join {
    border: 1px solid black;
    border-radius: 6px;
    color: #fff;
    width: 300px;
    height: 50px;
    background-color: rgb(255, 0, 85);
    margin: 5px;
}
</style>