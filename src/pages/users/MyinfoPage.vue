<template>
  <div id="info">
    <NavbarPage></NavbarPage>
    <div>
        <div class="info-div">
            <span class="info-span">ID NO:</span> 
            {{ this.id }}
        </div>
        <div class="info-div">
            <span class="info-span">E-mail:</span> 
            {{ this.email }}
        </div>
        <div class="info-div">
            <span class="info-span">PW:</span> {{ this.pw }}
        </div>
        <div class="info-div">
            <span class="info-span">Name:</span> {{ this.name }}
        </div>
    </div>

    <div>
        <button class="pwchangebtn" @click="$router.push('/reset-pw')">패스워드 변경하기</button>
    </div>
    <div>
        <button class="deletebtn" @click="clickDelete">회원탈퇴</button>
    </div>
  </div>
</template>

<script>
import NavbarPage from '../../components/commons/NavbarPage.vue'
import axios from 'axios'

export default {
    components: {
        NavbarPage,
    },
    data() {
        return {
            id: this.$store.state.id,
            email: this.$store.state.email,
            pw: this.$store.state.pw,
            name: this.$store.state.name
        }
    },
    methods: {
        clickDelete() {
            axios({
                url: 'http://localhost:3000/users/delete',
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
                console.log(res.data)

                this.$router.push('/login')
            })
        },
        // clickResetPW() {
        //     axios({
        //         url: 'http://localhost:3000/',
        //         headers: {
        //             'X-Requested-With': 'XMLHttpRequest',
        //             'Content-Type': 'application/json'
        //         },
        //         method: 'post',
        //         data: {

        //         }
        //     })
        // }
    }
}
</script>

<style>
#info {
    text-align: center;
    font-size: 32px;
}

.info-div {
    margin: 50px;
}
.pwchangebtn {
    border: 1px solid black;
    border-radius: 6px;
    color: #fff;
    width: 300px;
    height: 50px;
    background-color: rgb(79, 151, 61);
    margin: 10px;
}
.deletebtn {
    border: 1px solid black;
    border-radius: 6px;
    color: #fff;
    width: 300px;
    height: 50px;
    background-color: rgb(5, 5, 50);
    margin: 10px;
}
#twobtn {
    text-align: center;
    font-size: 32px;
    margin: 50px;
}
.info-span {
    width: 100px;
    max-width: 100px;
}
</style>