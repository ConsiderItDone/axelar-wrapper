import { EVM_Chains } from "../mutation/w3";

export function mapChainId(chainId: i32): EVM_Chains {
  switch (chainId) {
    case 1:
      return EVM_Chains.ETHEREUM;
    case 3:
      return EVM_Chains.ETHEREUM_ROPSTEN;
    case 137:
      return EVM_Chains.POLYGON;
    case 80001:
      return EVM_Chains.POLYGON_MUMBAI;
    case 1284:
      return EVM_Chains.MOONBEAM;
    case 1287:
      return EVM_Chains.MOONBEAM_ALPHA;
    case 43114:
      return EVM_Chains.AVALANCHE;
    case 43113:
      return EVM_Chains.AVALANCHE_FUJI;
    case 250:
      return EVM_Chains.FANTOM;
    case 4002:
      return EVM_Chains.FANTOM_TESTNET;
    default:
      throw new Error("Unknown chain ID. This should never happen.");
  }
}

export function getGatewayContractAddress(chainId: i32): string {
  const mappedChainId = mapChainId(chainId);

  switch (mappedChainId) {
    case EVM_Chains.ETHEREUM:
      return "0x4F4495243837681061C4743b74B3eEdf548D56A5";
    case EVM_Chains.ETHEREUM_ROPSTEN:
      return "0xBC6fcce7c5487d43830a219CA6E7B83238B41e71";
    case EVM_Chains.POLYGON:
      return "0x6f015F16De9fC8791b234eF68D486d2bF203FBA8";
    case EVM_Chains.POLYGON_MUMBAI:
      return "0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B";
    case EVM_Chains.MOONBEAM:
      return "0x4F4495243837681061C4743b74B3eEdf548D56A5";
    case EVM_Chains.MOONBEAM_ALPHA:
      return "0x5769D84DD62a6fD969856c75c7D321b84d455929";
    case EVM_Chains.AVALANCHE:
      return "0x5029C0EFf6C34351a0CEc334542cDb22c7928f78";
    case EVM_Chains.AVALANCHE_FUJI:
      return "0xC249632c2D40b9001FE907806902f63038B737Ab";
    case EVM_Chains.FANTOM:
      return "0x304acf330bbE08d1e512eefaa92F6a57871fD895";
    case EVM_Chains.FANTOM_TESTNET:
      return "0x97837985Ec0494E7b9C71f5D3f9250188477ae14";
    default:
      throw new Error("Provided Chain ID isn't supported");
  }
}

export function getGasReceiverContractAddress(chainId: i32): string {
  const mappedChainId = mapChainId(chainId);

  switch (mappedChainId) {
    case EVM_Chains.ETHEREUM:
      return "0x4154CF6eea0633DD9c4933E76a077fD7E9260738";
    case EVM_Chains.ETHEREUM_ROPSTEN:
      return "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6";
    case EVM_Chains.POLYGON:
      return "0xc8E0b617c388c7E800a7643adDD01218E14a727a";
    case EVM_Chains.POLYGON_MUMBAI:
      return "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6";
    case EVM_Chains.MOONBEAM:
      return "0x27927CD55db998b720214205e598aA9AD614AEE3";
    case EVM_Chains.MOONBEAM_ALPHA:
      return "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6";
    case EVM_Chains.AVALANCHE:
      return "0xB53C693544363912D2A034f70D9d98808D5E192a";
    case EVM_Chains.AVALANCHE_FUJI:
      return "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6";
    case EVM_Chains.FANTOM:
      return "0x2879da536D9d107D6b92D95D7c4CFaA5De7088f4";
    case EVM_Chains.FANTOM_TESTNET:
      return "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6";
    default:
      throw new Error("Provided Chain ID isn't supported");
  }
}
