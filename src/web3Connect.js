var Web3 = require('web3')

const getWeb3 = function getw3(){
    return new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:8546'))
}
export default getWeb3