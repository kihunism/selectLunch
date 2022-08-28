import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLogin: false,
        id: 0,
        email: '',
        pw: '',
        pwConfirm: '',
        name: '',
        pageReloading: 0,
        
        category: '',
        shopId: 0,
        storeName: '',
        foodData: [],
        stores: [],
        selectCategory: []
    },
    mutations: {
        categoryChange(state, clickCategory) {
            state.category = clickCategory
        },
        pageReloadingAddOne(state) {
            state.pageReloading = 1
        },
        setStoreName(state, name) {
            state.storeName = name
        },
        login(state, inputName) {
            state.isLogin = true
            state.name = inputName
            state.selectCategory = ['전체','한식', '일식', '중식', '양식', '경양식','고기','다이어트','벌크업','선식', '데이트','후식',]
        },
        logout(state) {
            state.isLogin = false
            state.id = 0
            state.email = ''
            state.pw = ''
            state.pwConfirm = ''
            state.name = ''
            state.selectCategory = []
            state.stores = []
            state.foodData = [],
            state.pageReloading = 0
        },
        userLogin(state, payload) {
            state.id = payload.id
            state.email = payload.email,
            state.pw = payload.pw,
            state.name = payload.name
        },
        resetPW(state, newPW) {
            state.pw = newPW
        },
        addFood(state, food) {
            state.foodData = [food, ...state.foodData]
        },
        getStores(state, storePayload) {
            state.stores = [...storePayload]
        },
        getFoodData(state, foodDataPayload) {
            state.foodData = [...foodDataPayload]
        }
    },
    getters: {
        getIsLogin(state) {
            return state.isLogin
        }
    },
    actions: {
        // logout(state) {
        //     state.isLogin = false
        //     state.email = ''
        //     state.pw = ''
        //     state.pwConfirm = ''
        //     state.name = ''
        // }
    },
    plugins: [
        createPersistedState()
    ]
})
export default store
