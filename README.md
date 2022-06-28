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


### SendToken method (Example): 
   
```typescript
const sourceChain = {
  name: "chain1",
  chainId: "Id of chain",
  tokenAddress: "Token address",
  gatewayAddress: "Address of gateway contract on source chain"
};

const destinationChain = {...};

const receiverAddress = "0xdsSADFs...";
const amount = new BN(100000);

 const txReceipt = client.query<{ approveAndSendToken: any }>({
      uri: apiUri,
      query: `
      mutation {
        approveAndSendToken(
          destinationChain: $destinationChain
          destinationAddress: $destinationAddress
          symbol: $symbol
          amount: $amount
          gatewayAddress: $gatewayAddress
          tokenAddress: $tokenAddress
        )
      }`,
      variables: {
        destinationChain: destinationChain.name,
        destinationAddress: receiverAddress,
        tokenAddress: sourceChain.tokenAddress,
        gatewayAddress: sourceChain.gatewayAddress,
        symbol: "aUSDC",
        amount: amount.toString(),
      },
      config: {
        envs: [
          {
            common: {
              chainId: sourceChain.chainId,
            },
          },
        ],
      },
    });
   ```

### GetDepositAddress method (Example):

```typescript
const destinationAddress = "0xabc..."

const depositAddress = await client.query<{ getDepositAddress: any }>({
      uri: apiUri,
      query: `
      query {
        getDepositAddress(
          fromChain: $fromChain
          toChain: $toChain
          destinationAddress: $destinationAddress
          asset: $asset
          options: $options
        )
      }`,
      variables: {
        fromChain: "Terra",
        toChain: "Avalanche",
        destinationAddress: destinationAddress,
        asset: "uusd",
        options: null,
      },
    });
```
