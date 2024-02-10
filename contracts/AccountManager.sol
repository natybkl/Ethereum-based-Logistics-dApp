//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./Token.sol";

contract AccountManager {
    struct Account {
        string name;
        address accountAddress;
        Token tokenContract;
    }

    mapping(address => Account) public accounts;
    address[] public accountAddresses; // Add an array to store account addresses

    event AccountCreated(string name, address accountAddress);

    function createAccount(string memory _name, address _accountAddress) public {
        require(accounts[_accountAddress].accountAddress == address(0), "Account already exists");
        
        // Deploy a new instance of the Token contract
        Token newTokenContract = new Token();
        
        accounts[_accountAddress] = Account({
            name: _name,
            accountAddress: _accountAddress,
            tokenContract: newTokenContract
        });

        // console.log("account created 0x0x0");
        // Set the newly created account's address as the owner of the token
        newTokenContract.updateOwner(_accountAddress);

        // Add the account address to the array
        accountAddresses.push(_accountAddress);

        emit AccountCreated(_name, _accountAddress);
    }

    function getAccount(address _accountAddress) public view returns (string memory, address) {
        return (accounts[_accountAddress].name, accounts[_accountAddress].accountAddress);
    }

    function getAccountCount() public view returns (uint256) {
        return accountAddresses.length;
    }
}
