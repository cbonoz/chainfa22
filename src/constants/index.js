export const APP_NAME = 'Blockfreight'
export const APP_DESC = 'Blockchain product tracking platform for any parcel'

const hostname = window.location.hostname
export const IS_LOCAL = hostname.indexOf("localhost") !== -1

export const COVALENT_KEY = process.env.REACT_APP_COVALENT_KEY; // covalent api key

export const EXAMPLE_FORM = {
    'title': 'Package 12345',
    'files': []
}
export const WEB3_PROJECT_ID = process.env.REACT_APP_WC_ID || 'ec17b7971a950170d6c5710eb878ba9b';

export const CHAIN_OPTIONS = {
    80001: {
      name: "Mumbai Testnet",
      url: "https://mumbai.polygonscan.com/",
      blockExplorers: ["https://mumbai.polygonscan.com/"],
      id: 80001,
      rpcUrls: ['https://rpc-mumbai.maticvigil.com']
    },
    137: {
      name: "Matic Mainnet",
      url: "https://polygonscan.com/",
      blockExplorers: ["https://polygonscan.com/"],
      id: 137,
      rpcUrls: ['https://polygon-rpc.com']
    },
  };
  // 1: { name: "ethereum", url: "https://etherscan.io/tx/", id: 1 },
  // 42: { name: "kovan", url: "https://kovan.etherscan.io/tx/", id: 42 },
  // 4: { name: "rinkeby", url: "https://rinkeby.etherscan.io/tx/", id: 4 },
  
  export const ACTIVE_CHAIN = CHAIN_OPTIONS[process.env.REACT_APP_ACTIVE_CHAIN_ID || "80001"];
  
  export const IPFS_BASE_URL = "https://ipfs.moralis.io:2053/ipfs";