import w3 from '@/web3Connect'
import {ABI,address} from '@/Contract'

const web3 = w3();
const getContract = new Promise(function(resolve){
    let contract = new web3.eth.Contract(ABI,address)
    console.log(contract);
    resolve(contract)
})

export default getContract