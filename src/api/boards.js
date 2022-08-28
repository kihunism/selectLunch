import axios from 'axios'
const boardApi = {
    getTotalFoodList: async (url, method) => {
        const list = await axios({
            method,
            url,
        })
        return list
    }
}

export default boardApi

// import { instance } from './index'

// async function getTotalFoodList(endpoint) {
//     return await instance.get(endpoint)
// }

// export { getTotalFoodList }