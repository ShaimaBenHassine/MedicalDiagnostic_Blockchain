
App = {
    //loading: false,
    var: Web3 = require("web3"),
    contracts: {},
    load: async () => {
        await App.loadWeb3()  
        await App.loadAccount()
        await App.loadContract()
        await App.render()
     },
     
  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },
  //retrieve the account
  loadAccount: async () => {
      App.account = web3.eth.accounts[0]
  },
  //we retrieve the smart contract
  loadContract: async () => {
      const hospitalRecord = await $.getJISON('HospitalRecord.json')
      App.contracts.HospitalRecord = TruffleContract(hospitalRecord)
      App.contracts.HospitalRecord.setProvider(App.web3Provider)

      //Hydrate the smart contract with values from the blockchain
      App.hospitalRecord = await App.contracts.HospitalRecord.deployed()

      //console.log(hospitalRecord)

  },

  render: async () => {
    // Prevent double render
    if (App.loading){
        return
    }
    // //update app loading state
    // App.setLoading(true)

      //Render Account
      $('#account').html(App.account)

    //   //update app loading state
    // App.setLoading(false)
  },

  renderRecords: async () => {
    //load the total record count from the blockchain
    const recordCount = await App.hospitalRecord.recordCount()
    const $recordTemplate = $('.recordTemplate')

    //Render out each record with a new record template
    for (var i =1; i <= recordCount; i++){
        //Fetch the record data from the blockchain
        const record = await App.hospitalRecord.records(i)
        const recordId = record[0].toNumber()
        const doctorNname= record[2]
        const patientNname= record[3]
        const patientAge= record[4].toNumber()
        const recordDiagnostic= record[5]
        const recordMedication= record[6]

        // Create the html for the record
      const $newRecordTemplate = $recordTemplate.clone()
      $newRecordTemplate.find('.content').html(recordContent)
      $newRecordTemplate.find('input')
                      .prop('name', recordId)
                      //.on('click', App.toggleCompleted)
// Put the record in the correct list
  $('#recordList').append($newRecordTemplate)
}

// Show the record
$newRecordTemplate.show()
},

  // setLoading: (boolean) => {
  //   App.loading = boolean
  //   const loader = $('#loader')
  //   const content = $('#content')
  //   if (boolean) {
  //     loader.show()
  //     content.hide()
  //   } else {
  //     loader.hide()
  //     content.show()
  //   }
  // }
}

$(()=> {
    $(window).load(() => {
        App.load()
    })
})