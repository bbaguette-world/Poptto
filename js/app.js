function scheduler(action, ms = 1000, runRightNow = true) {
  if (runRightNow) action();
  setInterval(action, ms);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let TOKEN = "0x28FfC692E954B274AFBfDD3993523Fcaab54278c";
var getReward;
const config = {
  contracts: {
    ERC20: {
      abi: abi.ERC20,
      address: TOKEN,
    },
  },
  network: {
    chainName: 'Rinkeby Testnet',
    chainId: 4,
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://dataseed.popcateum.org'],
    blockExplorerUrls: ['https://explorer.popcateum.org/'],
  },
};

const App = {
  web3Provider: null,
  currentAccount: null,
  connected: false,

  init: async function () {
    await App.initWeb3();
    await ERC20.init();
    await ERC20.pageInit();
    
    if (App.connected) {
      scheduler(this.CheckId, 2000);
    }
  },
  
  initWeb3: async function () {
    App.web3Provider = new Web3.providers.HttpProvider(
      config.network.rpcUrls[0],
    ); // Connect Node
    window.web3 = new Web3(App.web3Provider);

    if (window.ethereum) {
      try {
        await App.connect();
        await App.changed();
      } catch (error) {
        if (error.code === 4001) {

          alert('Please Connect MetaMask');
        }

      }
    } else {
      alert('There is no Metamask. Please install MetaMask.');
    }
  },
  
  switchNetwork: async function () {
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x' + config.network.chainId.toString(16),
          chainName: config.network.chainName,
          nativeCurrency: config.network.nativeCurrency,
          rpcUrls: config.network.rpcUrls,
          blockExplorerUrls: config.network.blockExplorerUrls,
        },
      ],
    });
  },

  connect: async function () {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    App.currentAccount = accounts[0];
    App.connected = true;
  },

  changed: async function () {
    ethereum.on('accountsChanged', async () => {
      await App.connect();
    });
  },

  CheckId: async function () {
   var myAddress = window.ethereum.selectedAddress;
   var StartAddress = myAddress.substring(1,6);
   var EndAddress = myAddress.substring(37, myAddress.length);
   document.getElementById("Account").innerHTML = "Your MetaMask Address : " + StartAddress + "...." + EndAddress;
  },

  ConnectId: async function() {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    App.currentAccount = accounts[0];
    App.connected = true;
  },
};

const ERC20 = {
  contract: null,
  init: async function () {
      this.contract = new web3.eth.Contract(
        config.contracts.ERC20.abi,
        config.contracts.ERC20.address,
      );
  },

  pageInit: async function () {
   // document.getElementById("editThisk2").disabled=true;
   // document.getElementById("editThisk2").style.cursor = "not-allowed";
    scheduler(this.playGameUserTicket, 2000);
    scheduler(this.fGetContractETH, 1000);
  },

  fAddETHInThisContract: async function () {
    cAddETHInThisContract = new web3.eth.Contract(abi.ERC20, TOKEN);

    const numberOfTokens1 = document.getElementById('gAddETH').value;

    const value = new BigNumber(web3.utils.toWei(numberOfTokens1, 'ether'))
      .toFixed();
    
    const evmData = cAddETHInThisContract.methods

      .addETHInThisContract()
      .encodeABI();
  
    ERC20.sendETH(web3.utils.toHex(value), evmData);
  },

  sendETH: async function (value, evmData) {
    const params = [
      {
        from: App.currentAccount,
        to: TOKEN,
        data: evmData,
        value,
      },
    ];
    ethereum
      .request({
        method: 'eth_sendTransaction',
        params,
      })
  },
  
  fBuyTicket: async function() {

    const ticketAmount = document.getElementById('gTicketAmount').value;
    var comparePOPTTO = await ERC20.fCheckPOPTTO();
    var compareTicketPrice = ticketAmount * ((200) * (10**8));
    //console.log(comparePOPTTO)
    //console.log(ERC20.toFixed(compareTicketPrice))
    if(ticketAmount > 0 && ticketAmount != null && ticketAmount != "" && ticketAmount != undefined)
      {
        if(comparePOPTTO > compareTicketPrice) {
          var cApproveBuyNFT = new web3.eth.Contract(abi.ERC20, TOKEN);
            const evmData = cApproveBuyNFT.methods
            .buyTicket(ticketAmount)
            .encodeABI();
          const params = [
            {
              from: App.currentAccount,
              to: TOKEN,
              data: evmData
            },
          ];
          ethereum
            .request({
              method: 'eth_sendTransaction',
              params,
            }).then(function () {
          })
        }
        else {
          alert("You don't have enough money to buy game ticket")
        }
      }
    else {
      alert("Insert correct number")
    }
  },

  toFixed: function(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
          e -= 20;
          x /= Math.pow(10,e);
          x += (new Array(e+1)).join('0');
      }
    }
    return x;
  },

  fMint: async function () {
    cMint = new web3.eth.Contract(abi.ERC20, TOKEN);
    var buyToken = document.getElementById('fn_flag_price').value;
    if(buyToken > 0 && buyToken != "" && buyToken != null) {
    buyToken = (buyToken * (10 ** 18));
    var str = buyToken.toString();

    const value = new BigNumber(web3.utils.toWei(ERC20.toFixed(str), 'wei'))
      .toFixed();

    const evmData = cMint.methods
      .mint(ERC20.toFixed(str))
      .encodeABI();

      ERC20.sendMint(web3.utils.toHex(value), evmData);
    }
    else{
      alert("Insert correct number")
    }
  },

  sendMint: async function (value, evmData) {
    const params = [
      {
        from: App.currentAccount,
        to: TOKEN,
        data: evmData,
        value,
      },
    ];
    ethereum
      .request({
        method: 'eth_sendTransaction',
        params,
      })
  },

  playGameUserTicket: async function() {
    var PGUT = new web3.eth.Contract(abi.ERC20, TOKEN);
    Pbalance = await PGUT.methods.playGameUserCount(App.currentAccount).call();
    document.getElementById('Ticket').innerHTML = "You have "+ Pbalance + " game ticket";
  },

  gameResult: async function() {
    document.getElementById("getMyReward").innerHTML = "";
    if(k == 6) {
      
      if(Pbalance <= 0) {
        alert("Please buy Ticket");
        
        return 0;
      }
      document.getElementById("editThisk").disabled=true;
      document.getElementById("editThisk").style.cursor = "not-allowed";
      getspr();
      openLoading();
      const randomNum = Math.floor(Math.random() * 100);
      var afterTimer = 2000;
      var first = await web3.eth.getBalance(App.currentAccount);
      
      var cApproveBuyNFT = new web3.eth.Contract(abi.ERC20, TOKEN);
      var getYourReward = await cApproveBuyNFT.methods.getContractETH().call() / (10 ** 18);
      const evmData = cApproveBuyNFT.methods
        .playGame(liczbyWygrane + 40, randomNum)
        .encodeABI();
      
      const params = [
        {
          from: App.currentAccount,
          to: TOKEN,
          data: evmData
        },
      ];
  
      ethereum
        .request({
          method: 'eth_sendTransaction',
          params,
        })
        .then(async function () {
          var second = await web3.eth.getBalance(App.currentAccount);
          var interval = setInterval(async function(){

          if(first == second){
            second = await web3.eth.getBalance(App.currentAccount);

          }
          else{
            var checkSpr = 0;
           
            if(checkSpr == 0) {
              
              document.getElementById("editThisk").style.cursor = "not-allowed";
              
              spr();
              closeLoading();
              //console.log(((getYourReward / 300) * sum5).toFixed(5));
              if(liczbyWygrane >= 0 && liczbyWygrane <= 2) {
                var getReward = ((getYourReward / 300) * liczbyWygrane).toFixed(5);
                document.getElementById("getMyReward").innerHTML = "Not good.. you got " + getReward + " POP";
              }
              if(liczbyWygrane >= 3 && liczbyWygrane <= 5) {
                var getReward = ((getYourReward / 100) * liczbyWygrane).toFixed(5);
                document.getElementById("getMyReward").innerHTML = "WOW! you got " + getReward + " POP";
              }
              if(liczbyWygrane == 6) {
                var getReward = ((getYourReward / 7) * liczbyWygrane).toFixed(5);
                document.getElementById("getMyReward").innerHTML = "WINNER! you got " + getReward + " POP";
              }

              clearInterval(interval);
            }
            checkSpr = 1;
            return 0;
          }
          return 0;
        }, afterTimer)
        })
        .catch((error) => {
          
          if(error.code == 4001) {

          closeLoading(); }
        });
    }
    else {
    }
  },

  refresh: async function () {
    editedUpdateDiv();
  },

  fGetContractETH: async function () {
    cGetContractETH = new web3.eth.Contract(abi.ERC20, TOKEN);
    getReward = await cGetContractETH.methods.getContractETH().call() / (10 ** 18);
    document.getElementById('hGetContractETH').innerHTML = "The contract have " +
    (getReward).toFixed(5) + " POP";
  },

  writeTotalSupply: async function () {
    document.getElementById('total-supply').innerHTML =
    await ERC721.getTotalSupply();
  },

  fSellToken: async function() {
    inContractETH = await cGetContractETH.methods.getContractETH().call() / (10 ** 18);
    
    var ticketAmount = document.getElementById('fn_sell_price').value;
    ticketAmount = (ticketAmount * (10 ** 18));
    ticketAmount = ERC20.toFixed(ticketAmount);
    ticketAmount = ticketAmount.toString();
    if(ticketAmount > 0 && ticketAmount != null && ticketAmount != undefined && ticketAmount != "") {
    var returnAmount = document.getElementById('sell_total').value;
    if(inContractETH > returnAmount) {
      var ccSellToken = new web3.eth.Contract(abi.ERC20, TOKEN);
      const evmData = ccSellToken.methods
        .sellToken(ticketAmount)
        .encodeABI();
      const params = [
        {
          from: App.currentAccount,
          to: TOKEN,
          data: evmData
        },
      ];
      ethereum
        .request({
          method: 'eth_sendTransaction',
          params,
        }).then(function () {
        })
    }
    else {
      alert("Contract don't have enough ETH")
    }
  }
  else {
    alert("Insert correct number")
  }
  },

  fCheckPOPTTO: async function() {
      var ccSellToken = new web3.eth.Contract(abi.ERC20, TOKEN);
      var getBalanceOf = await ccSellToken.methods
        .balanceOf(App.currentAccount).call();
      return getBalanceOf;
  },

  
  addTokenOnMetaMask: async function () {
    const tokenSymbol = 'POPTTO';
    const tokenDecimals = 18;
    const tokenImage = 'https://i.ibb.co/g6NpMg2/2022-09-04-10-02-12.png';

    try {
      await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: TOKEN,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });
    } catch (error) {
      //console.log(error);
    }
  },
};

App.init();