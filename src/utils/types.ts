
export interface Chain {
  chainInfo: ChainInfo;
  validateAddress: (assetInfo: AssetInfo) => boolean;
  waitingService: BlockchainWaitingServiceFinder;
}



export type SourceOrDestination = "source" | "destination";

export type BlockchainWaitingServiceFinder = (
  chainInfo: ChainInfo,
  assetInfo: AssetInfo,
  sOrDChain: SourceOrDestination,
  environment: string
) => BlockchainWaitingService | Promise<BlockchainWaitingService>;

export interface BlockchainWaitingService {
  waitForDepositConfirmation(
    assetAndChainInfo: AssetAndChainInfo,
    interimStatusCb: any,
    clientSocketConnect: null //SocketServices https://github.com/axelarnetwork/axelarjs-sdk/blob/2fd76561f630ebb26195cd2ec7f161f39f64b6d7/src/services/SocketServices.ts#L14
  ): Promise<void>;
  waitForTransferEvent(
    assetAndChainInfo: AssetAndChainInfo,
    interimStatusCb: any,
    clientSocketConnect:  null //SocketServices
  ): Promise<void>;
  wait(
    assetAndChainInfo: AssetAndChainInfo,
    interimStatusCb: any,
    clientSocketConnect:  null //SocketServices
  ): Promise<void>;
}

export interface AssetAndChainInfo {
  assetInfo: AssetInfoResponse;
  sourceChainInfo: ChainInfo;
  destinationChainInfo: ChainInfo;
}

export interface AssetInfoResponse extends AssetInfo {
  sourceOrDestChain: SourceOrDestination;
  traceId: string;
}



// ___________________________________________________________
export interface ChainInfo {
  assets?: AssetInfo[];
  chainSymbol: string;
  chainName: string;
  fullySupported: boolean;
  estimatedWaitTime: number;
  txFeeInPercent: number;
  module: "axelarnet" | "evm";
  confirmLevel?: number;
  chainIdentifier: {
    devnet: string;
    testnet: string;
    mainnet: string;
  };
}

export interface AssetInfo {
  assetSymbol?: string;
  assetName?: string;
  assetAddress?: string;
  common_key?: string;
  fullySupported?: boolean;
  native_chain?: string;
  minDepositAmt?: number;
  decimals?: number;
}

export interface AssetTransferObject {
  sourceChainInfo: ChainInfo;
  destinationChainInfo: ChainInfo;
  selectedSourceAsset: AssetInfo;
  selectedDestinationAsset: AssetInfo;
  signature: string;
  otc: string;
  publicAddr: string;
  transactionTraceId?: string;
}