<p align='center'>
    <img src="./img/logo_trans.png" width=400/>
</p>

<br/>

Blockfreight
---


Blockfreight is a blockchain product tracking platform for any parcel.

Generates a unique blockchain-backed QR code that can either be presented or placed on the cargo of interest.

Built for the Chainlink Fall 2022 hackathon.

Note this project is currently a prototype and would require additional work to be production ready on Polygon mainnet.

### Motivation

Often excel spreadsheets that track the history of inventory and deliveries are shared via email.

For those vendors using existing SaaS platforms (such as Flexport) much of that data is only held within Flexport, subject to terms and conditions, and can be modified by their team. Other common challenges can include limitation from the non-universal nature of email (emails are private between sender and recipient), delays might not be accurately reported, and products might be lost.

By using Polygon contracts, Blockfreight can:
1. Enable an immutable, append-only, history of interactions with given parcels.
2. Create a permission framework (optional) that enforces only certain wallets or user accounts can log events against a given item.
3. Store the data in a transparent way for all parties, where no single party has to be the custodian of the data log.
4. Perform low cost and fast transactions.


### Technologies used

Polygon: Serves as the primary smart contract network for the Blockfreight application. Polygon enables fast and low cost smart contract transactions that make it easy to use Blockfreight in the field without heavy additional costs or time delays.

Chainlink: Grab information from port and pull into the application. Uses an on-chain API call for reverse geolocation (via https://www.geoapify.com/reverse-geocoding-api) to store the provided lat/lng as a formatted location. For example, a known location of a shipping warehouse can automatically be pulled and saved on the smart contract without having the user type anything.

IPFS: Record keeping and storage. IPFS is used as the backend for the QR code scanning data lookup and enables theaAbility to upload new images of the cargo at different checkpoints or if the status of the item has changed visibly during transit (ex: item experienced damage). Notes uploaded are also saved to the contract.

Every scan of the QR code emits a 'FreightEvent' that gets indexed and appended to the parcel's contract.
`emit FreightEvent(_requestId, lastSender, lat, lng, notes, _location);`


### Useful links
* Hardhat: https://hardhat.org/tutorial/writing-and-compiling-contracts
* Chainlink API parsing: https://docs.chain.link/docs/any-api/get-request/examples/api-array-response/

### Running the app

Define the follow environment variables.

<pre>
REACT_APP_COVALENT_KEY= // Your covalent API key (optional - needed from history tab)
REACT_APP_STORAGE_KEY=  // Your web3.storage key.
REACT_APP_ACTIVE_CHAIN_ID= // 80001 or 137 currently for polygon testnet or mainnet (defaults to testnet).
REACT_APP_WC_ID= // cloud.walletconnect.com app id (defaults to a demo app id).
</pre>


`yarn; yarn start`

Blockfreight should now be running on port 3000.


### Potential future work
* Add subscription costs for creating different record types, auditing, and organization permissioning.
* Enable data export of blockchain logs to more native or traditional formats such as excel or pdf.
* Add support for user logins in addition to metamask (or wallet-based) logins.


## Screenshots / User flow

### Home
<img src="./img/home.png" width=800 />

### Creating a new parcel contract
<img src="./img/create.png" width=800 />

### Connecting wallet for contract deployment
<img src="./img/wallet.png" width=800 />

### Confirm contract creation
<img src="./img/confirm.png" width=800 />

### Contract created!
<img src="./img/contract1.png" width=800 />


### IPFS record on contract creation
<img src="./img/ipfs.png" width=800 />

### Contract Metadata 
<img src="./img/metadata.png" width=800 />

### QR code
<img src="./img/qr.png" width=800 />

### Printing QR code
<img src="./img/print.png" width=800 />

### Providing a freight contract update
<img src="./img/update.png" width=800 />

### Freight update transaction added to contract record
<img src="./img/contract2.png" width=800 />

### Freight update event is emitted from the contract
<img src="./img/event.png" width=800 />

### Freight history lookup
<img src="./img/history.png" width=800 />



<!--

TODO: research on flexport and determine how to make blockchian compatible.

Demo flow:
Web Article stating problem (flexport)
Intro solution / website
Motivation
Create blockfreight
- Adds funds to the contract to do chainlink interaction
Show deployed contract
Send a contract update with notes.
Show contract event emitted from contract and new transaction.
Show contract history.
Closing (github+future work)


Make smart contract transaction at a checkpoint scan.

Social good idea

(e.g., sustainability, tackling the energy & logistic crises, preventing misinformation). Teams may create an oracle for Filecoin Green data, use Arbol data or build tools to establish information provenance.


-- Sponsors--
Smart contract for delivery or record keeping
Polygon: Low cost smart contract transactions
Chainlink: Grab information from port and pull into the application
IPFS: Record keeping and storage

-->


### TODO:
* QR code system for attaching to parcels.
* Scan creates a transaction against the parcel's smart contract (immutable and identity-tracking)
* Persistent storage 
* Smartcontract deployment for each parcel.


### Useful links
* https://chainlinkfall2022.devpost.com/
