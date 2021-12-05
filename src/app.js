//var Web3 = require("web3")
App = {
    load: async () => {
        await App.loadWeb3()  
        await App.loadAccount()
     },
     
  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
        // Initialize web3 and set the provider to the testRPC.
        if (typeof web3 !== 'undefined') {
          App.web3Provider = web3.currentProvider;
          web3 = new Web3(web3.currentProvider);
        } else {
          // set the provider you want from Web3.providers
          App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
          web3 = new Web3(App.web3Provider);
        }
  },
  loadAccount: async () => {
      App.account = web3.eth.accounts[0]
      console.log(App.account)
  }
}

$(()=> {
    $(window).load(() => {
        App.load()
    })
})