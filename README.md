# Ethereum-based-Logistics-dApp

This project builds a web app with an admin dashboard for managing drivers. Admins can create driver accounts, assign tasks, and approve opt-in requests, streamlining logistics operations.


## Usage

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/natybkl/Ethereum-based-Logistics-dApp.git
cd Ethereum-based-Logistics-dApp
npm install
```

Once installed, let's run Hardhat's testing network:

```sh
npx hardhat node
```

Then, on a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

Finally, we can run the admin dashboard with:

```sh
cd admin
npm install
npm start
```

Open [http://localhost:3000/](http://localhost:3000/) to see your Dapp. You will
need to have [Coinbase Wallet](https://www.coinbase.com/wallet) or [Metamask](https://metamask.io) installed and listening to
`localhost 8545`.


