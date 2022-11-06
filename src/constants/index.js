export const APP_NAME = 'Blockfreight'
export const APP_DESC = 'Blockchain product tracking platform for any parcel'

const hostname = window.location.hostname
export const IS_LOCAL = hostname.indexOf("localhost") !== -1

export const COVALENT_KEY = process.env.REACT_APP_COVALENT_KEY; // covalent api key

export const EXAMPLE_FORM = {
    'title': 'Package 12345',
    'files': []
}


export const CHAIN_OPTIONS = {
    80001: {
      name: "Mumbai",
      url: "https://mumbai.polygonscan.com/",
      id: 80001,
    },
    137: {
      name: "Matic Mainnet",
      url: "https://polygonscan.com/",
      id: 137,
    },
  };
  // 1: { name: "ethereum", url: "https://etherscan.io/tx/", id: 1 },
  // 42: { name: "kovan", url: "https://kovan.etherscan.io/tx/", id: 42 },
  // 4: { name: "rinkeby", url: "https://rinkeby.etherscan.io/tx/", id: 4 },
  
  export const ACTIVE_CHAIN = CHAIN_OPTIONS["80001"];
  
  export const IPFS_BASE_URL = "https://ipfs.moralis.io:2053/ipfs";