export function createPayload() {}

export const CLIENT_API_GET_OTC = "/getOneTimeCode";

export async function getTransferFee(
  sourceChain: string,
  destinationChain: string,
  asset: string
): Promise<number> {
  try {
    const sourceChainFeeInfo = await this.getFeeForChainAndAsset(
      sourceChain,
      asset
    );
    const destinationChainFeeInfo = await this.getFeeForChainAndAsset(
      destinationChain,
      asset
    );
    return (
      +sourceChainFeeInfo?.fee_info?.min_fee +
      +destinationChainFeeInfo?.fee_info?.min_fee
    );
  } catch (e: any) {
    throw e;
  }
}

export async function getOneTimeCode(
  signerAddress: string
): Promise<{ validationMsg: string; otc: string }> {
  try {
    return (await this.restServices.get(
      CLIENT_API_GET_OTC + `?publicAddress=${signerAddress}`
    )) as { validationMsg: string; otc: string };
  } catch (e: any) {
    throw e;
  }
}
