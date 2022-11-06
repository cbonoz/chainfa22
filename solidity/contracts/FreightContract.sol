pragma solidity ^0.8.9;


// This is the main building block for smart contracts.
contract FreightContract {
    // Some string type variables to identify the token.
    string public name;

   // An address type variable is used to store ethereum accounts.
    address public owner;
    bool public isCompleted;

    // The Transfer event helps off-chain applications understand
    // what happens within your contract.
    event FreightEvent(address indexed updater, string eventDescription);

    /**
     * Contract initialization.
     */
    constructor(string memory _name) {
        owner = msg.sender;
        name = _name;
        isCompleted = false;
    }

    function recordEvent(string memory _eventDescription) public {
        emit FreightEvent(msg.sender, _eventDescription);
    }

    function markCompleted() public {
        require(msg.sender == owner, "Only the contract owner may call this function");
        isCompleted = true;
    }



}