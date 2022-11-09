import { ethers } from "ethers";
import { FREIGHT_CONTRACT } from "./metadata";

// const getSigner = async () => {
//     await window.ethereum.enable();
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     return signer;
// };

// https://dapp-world.com/smartbook/how-to-use-ethers-with-polygon-k5Hn
export async function deployContract(signer, title) {

  //   https://dev.to/yosi/deploy-a-smart-contract-with-ethersjs-28no

  // Create an instance of a Contract Factory
  const factory = new ethers.ContractFactory(
    FREIGHT_CONTRACT.abi,
    FREIGHT_CONTRACT.bytecode,
    signer
  );

  // const validatedAddress = ethers.utils.getAddress(signerAddress);

  // Start deployment, returning a promise that resolves to a contract object
  const contract = await factory.deploy(title)//, validatedAddress);
  await contract.deployed();
  console.log("Contract deployed to address:", contract.address);
  return contract;
}

export const validAddress = (addr) => {
  try {
    ethers.utils.getAddress(addr);
    return true;
  } catch (e) {
    return false;
  }
};

export const markContractCompleted = async (provider, contractAddress) => {
  if (!contractAddress) {
    return {};
  }
  const freightContract = new ethers.Contract(
    contractAddress,
    FREIGHT_CONTRACT.abi,
    provider.getSigner()
  );
  const result = await freightContract.markCompleted();
  return result;
}
