import { getRandom } from './generateData.js';
import axios from 'axios'

const axiosControl = async () => {
    console.log('axios test run\n')
}

const userTest = () => {
    console.log('user test run\n')//uye olma
    axios.post('http://localhost:4000/authentications/register/', {
        username: 'alihan',
        password: 'this.password',
        email: 'email@email.com',
        name: 'this.name'
    })
        .then((respose) => {
            console.log(respose.data)
        })
        .catch((err) => {
            console.log(err)
        })
        //uye olma sonu
}

const applicationTest = () => {
    console.log('application test run\n')
}

const dataSetTest = () => {
    console.log('data set test run\n')
}

export const test = () => {
    axiosControl()
    userTest()
    applicationTest()
    dataSetTest()
}
export default {
    test
}