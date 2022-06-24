# Axelar Wrapper

## This wrapper provides secure integration with Axelar Network

A "wrapper" consists of the following files:

• Query and mutation wasm modules containing the protocol's business logic functions
• GraphQL schema to provide types and parameters for the query and mutation functions
• Manifest files that orchestrate the wrapper


The wrapper is written in AssemblyScript, it has a robust test suite and performs arbitrary precision arithmetic. The wrapper business logic will be deployed on a decentralized endpoint, like IPFS.


## How To Run

### Install Dependencies
`nvm install && nvm use`  
`yarn`  

### Build
`yarn build`  

### Test
`yarn test` 

### This wrapper gives you the following functionality: 
Transfer tokens cross-chain : 

  There are two ways to transfer tokens cross-chain with Axelar:
  
 • Wrapper that perform approve and sendToken methods.
 • GetDepositAddress methods.


### SendToken method: 

 • Wrapper that perform approve and sendToken methods.
 • End-to-end test which spin up Axelar test environment using GitHub - axelarnetwork/axelar-local-dev:
   A local developer environment for building your cross-chain dapps,
   create 2 EVM networks and transfer ERC20 between it

### GetDepositAddress: 
  • Wrapper perform HTTP POST call to /transferAssets endpoint and get address
  • Integration test using nock library
  • End-to-end test using Axelar Tesnet Endpoint

### SignMessage:

  • Wrapper performs HTTP GET call to /getOneTimeCode endpoint of Axelar backend and get One Time Code and Validation Message.
  • Wrapper calls Ethereum Provider signMessage using Ethereum Plugin
  • Integration test using nock library and Ethereum Plugin
