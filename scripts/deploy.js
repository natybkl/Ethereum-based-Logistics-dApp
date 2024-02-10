// // This is a script for deploying your contracts. You can adapt it to deploy
// // yours, or create new ones.

// const path = require("path");

// async function main() {
//   // This is just a convenience check
//   if (network.name === "hardhat") {
//     console.warn(
//       "You are trying to deploy a contract to the Hardhat Network, which" +
//         "gets automatically created and destroyed every time. Use the Hardhat" +
//         " option '--network localhost'"
//     );
//   }

//   // ethers is available in the global scope
//   const [deployer] = await ethers.getSigners();
//   console.log(
//     "Deploying the contracts with the account:",
//     await deployer.getAddress()
//   );

//   console.log("Account balance:", (await deployer.getBalance()).toString());

//   const Token = await ethers.getContractFactory("Token");
//   const token = await Token.deploy();
//   await token.deployed();

//   console.log("Token address:", token.address);

//   // We also save the contract's artifacts and address in the frontend directory
//   saveFrontendFiles(token);
// }

// function saveFrontendFiles(token) {
//   const fs = require("fs");
//   const contractsDir = path.join(__dirname, "..", "admin", "src", "contracts");

//   if (!fs.existsSync(contractsDir)) {
//     fs.mkdirSync(contractsDir);
//   }

//   fs.writeFileSync(
//     path.join(contractsDir, "contract-address.json"),
//     JSON.stringify({ Token: token.address }, undefined, 2)
//   );

//   const TokenArtifact = artifacts.readArtifactSync("Token");

//   fs.writeFileSync(
//     path.join(contractsDir, "Token.json"),
//     JSON.stringify(TokenArtifact, null, 2)
//   );
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy Token contract
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();

  console.log("Token address:", token.address);

  // Deploy Account contract
  const Account = await ethers.getContractFactory("AccountManager");
  const account = await Account.deploy();
  await account.deployed();

  console.log("Account address:", account.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles({ Token: token, Account: account });
}

function saveFrontendFiles({ Token, Account }) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "admin", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Token: Token.address, Account: Account.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Token");
  const AccountArtifact = artifacts.readArtifactSync("AccountManager");

  fs.writeFileSync(
    path.join(contractsDir, "Token.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );

  fs.writeFileSync(
    path.join(contractsDir, "AccountManager.json"),
    JSON.stringify(AccountArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

