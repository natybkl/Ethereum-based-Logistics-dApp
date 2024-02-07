# Ethereum-based-Logistics-dApp

This project builds a web app with an admin dashboard for managing drivers. Admins can create driver accounts, assign tasks, and approve opt-in requests, streamlining logistics operations.


## Usage

The first things you need to do are clone this repository and install its
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
This should bring a result similar to this:
![image](https://github.com/natybkl/Ethereum-based-Logistics-dApp/assets/62074050/a4be99d9-91c1-41fd-846f-b23880f45f3f)


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
need to have [Coinbase Wallet](https://www.coinbase.com/wallet) or [Metamask](https://metamask.io) installed and listen to
`localhost 8545`. If you are going to use Metamask, the Chain Id used for `localhost 8545` is  331337. 

![image](https://github.com/natybkl/Ethereum-based-Logistics-dApp/assets/62074050/77d4057c-4dd2-44aa-9b98-baa564aa5469)




