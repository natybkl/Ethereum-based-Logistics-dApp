// import React, { useState, useEffect } from 'react';
// import './../css/DriverTable.css';
// import { ethers } from 'ethers';
// import TokenArtifact from "../contracts/Token.json";
// import AccountArtifact from "../contracts/AccountManager.json";
// import contractAddress from "../contracts/contract-address.json";

// export function DriverTable() {
//   const [drivers, setDrivers] = useState([]);

//   useEffect(() => {
//     fetchDrivers();
//   }, []);

//   const fetchDrivers = async () => {
//     try {
//       // Assuming you have a contract instance available
//       const accountManagerContract = await getAccountManagerContract();
     
//       console.log("Contract type: " + typeof accountManagerContract);
//       console.log("Contract --: ", accountManagerContract.account);
//       // Get the count of accounts
//       const accounts = await accountManagerContract.account;

//       console.log("Account type: " + typeof accounts);
//       // Fetch data for each account
//       const fetchedDrivers = [];
      
//       for (const accountAddress of Object.keys(accounts)) {
//         // console.log("Account Iterated")
//         const account = await accounts[accountAddress];
//         fetchedDrivers.push({
//           name: account.name,
//           address: accountAddress,
//           totalAsset: account.Token.totalSupply
//         });
//       }
      
//       setDrivers(fetchedDrivers);
//     } catch (error) {
//       console.error('Error fetching drivers:', error);
//     }
//   };

 
//   const getAccountManagerContract = async () => {
//     // const provider = new ethers.providers.JsonRpcProvider();
//     console.log("1")
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     console.log("2")
//     const signer = provider.getSigner();
//     console.log("3")
//     const contract = new ethers.Contract(contractAddress.Account, AccountArtifact.abi, signer);
//     console.log("4")
//     return contract;
//   };

//   return (
//     <div>
//       <table className="driver-table">
//         <thead>
//           <tr className="header-row">
//             <th>Name</th>
//             <th>Address</th>
//             <th>Total Asset</th>
//             <th>On Duty Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {drivers.map((driver, index) => (
//             <tr key={index}>
//               <td>{driver.name}</td>
//               <td>{driver.address}</td>
//               <td>{driver.totalAsset}</td>
//               <td>"Pending"</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import './../css/DriverTable.css';
import { ethers } from 'ethers';
import TokenArtifact from "../contracts/Token.json";
import AccountArtifact from "../contracts/AccountManager.json";
import contractAddress from "../contracts/contract-address.json";

export function DriverTable() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      // Get the contract instance
      const accountManagerContract = await getAccountManagerContract();
      
      // console.log("Contract: ", accountManagerContract)
      // Get the count of accounts
      const accountCount = await accountManagerContract.getAccountCount();
      console.log("Contract: ", accountCount)

      // Fetch data for each account
      const fetchedDrivers = [];
      for (let i = 0; i < accountCount; i++) {
        const accountAddress = await accountManagerContract.accountAddresses(i);
        // console.log(i, accountAddress)
        const [name, address] = await accountManagerContract.getAccount(accountAddress);
        // console.log(i, name, accountAddress)
        const totalAsset = await getTotalAsset(accountManagerContract, accountAddress);
        fetchedDrivers.push({
          name,
          address,
          totalAsset
        });
      }
      
      setDrivers(fetchedDrivers);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const getAccountManagerContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress.Account, AccountArtifact.abi, signer);
    return contract;
  };

  const getTotalAsset = async (accountManagerContract, accountAddress) => {
    const account = await accountManagerContract.accounts(accountAddress);
    const tokenContract = new ethers.Contract(account.tokenContract, TokenArtifact.abi, accountManagerContract.provider);
    return await tokenContract.totalSupply();
  };

  return (
    <div>
      <table className="driver-table">
        <thead>
          <tr className="header-row">
            <th>Name</th>
            <th>Address</th>
            <th>Total Asset</th>
            <th>On Duty Status</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => (
            <tr key={index}>
              <td>{driver.name}</td>
              <td>{driver.address}</td>
              <td>{driver.totalAsset.toString()}</td>
              <td>Pending</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
