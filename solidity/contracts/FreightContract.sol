// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@chainlink/contracts/src/v0.8/ChainlinkClient.sol';
import '@chainlink/contracts/src/v0.8/ConfirmedOwner.sol';


// This is the main building block for smart contracts.
contract FreightContract is ChainlinkClient {
     using Chainlink for Chainlink.Request;
    // Some string type variables to identify the token.
    string public name;
    string public API_KEY = "1b48259b810e48ddb151889f9ea58db0";
    string public LOCATION_API_URL = "https://api.geoapify.com/v1/geocode/reverse";

    uint256 public price;
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    // Last recorded values.
    string public location;
    string public lat;
    string public lng;
    string public notes;
    address public lastSender;

   // An address type variable is used to store ethereum accounts.
    address public owner;
    bool public isCompleted;

    // The Transfer event helps off-chain applications understand
    // what happens within your contract.
    event FreightEvent(bytes32 _requestId, address indexed updater, string notes, string lat, string lng, string location);

    constructor(string memory _name, string memory _notes) payable {
        owner = msg.sender;
        name = _name;
        notes = _notes;
        isCompleted = false;

        // https://wiki.polygon.technology/docs/develop/oracles/chainlink/
        // Current Network: Polygon Mumbai Testnet
        // TODO: add alternative mainnet info
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        // oracle = 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9;
        oracle = 0x58BBDbfb6fca3129b91f0DBE372098123B38B5e9;
        jobId = "da20aae0e4c843f6949e5cb3f7cfe8c4";
        fee = 10 ** 16; // 0.01 LINK
    }

    function createLocationUrl(string memory _lat, string memory _lon) private view returns (string memory) {
        return string.concat(LOCATION_API_URL, "?lat=", _lat, "&lon=", _lon, "&format=json&apiKey=", API_KEY);
    }

    function recordParcelEvent(string memory _notes, string memory _lat, string memory _lng) public returns (bytes32) {
        require(!isCompleted, "This FreightContract has been marked completed and is no longer accepting events.");
        // Emit chainlink API call
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // Set the URL to perform the GET request on
        // API docs: https://www.coingecko.com/en/api/documentation?
        req.add('get', createLocationUrl(_lat, _lng));

   
        string[] memory path = new string[](2);
        path[0] = "results";
        path[1] = "0,formatted";
        req.addStringArray('path', path); // Chainlink nodes 1.0.0 and later support this format

        lastSender = msg.sender;
        notes = _notes;
        lat = _lat;
        lng = _lng;

        // emit FreightEvent(jobId, lastSender, lat, lng, notes, "");
        return sendChainlinkRequest(req, fee);
    }

     /**
      * Receive the response in the form of string
      * https://docs.chain.link/docs/any-api/get-request/examples/api-array-response/
      */
    function fulfill(bytes32 _requestId, string memory _location) public recordChainlinkFulfillment(_requestId) {
        // Send last recorded values including the matched geolocation.
        emit FreightEvent(_requestId, lastSender, lat, lng, notes, _location);
        location = _location;
    }

    function markCompleted() public {
        require(msg.sender == owner, "Only the contract owner may call this function");
        isCompleted = true;
    }
}