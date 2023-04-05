# Staking app hardhat project

Contains contract, tests, and deployment script.

Contract allows you to mint NFT by passing metadata URI you get from off-chain. 

### Compile contracts:
```shell
npx hardhat compile
```

### Run tests:
```shell
npx hardhat test --grep "Should"
```

### Deploy to BSC Testnet:
```shell
npx hardhat run --network bnbt scripts/deploy.js
```