import { getRandom } from './generateData.js';
import axios from 'axios'

axios.get('https://mavidurak.github.io/').then(res => {
    console.log(res.data,'\n\n\nRandom number: ', getRandom());
})