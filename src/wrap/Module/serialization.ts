import {
  Read,
  ReadDecoder,
  Write,
  WriteSizer,
  WriteEncoder,
  Option,
  BigInt,
  BigNumber,
  JSON,
  Context
} from "@polywrap/wasm-as";
import * as Types from "..";

export class Args_getDepositAddress {
  fromChain: string;
  toChain: string;
  destinationAddress: string;
  asset: string;
  options: Types.Options | null;
}

export function deserializegetDepositAddressArgs(argsBuf: ArrayBuffer): Args_getDepositAddress {
  const context: Context = new Context("Deserializing module-type: getDepositAddress");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _fromChain: string = "";
  let _fromChainSet: bool = false;
  let _toChain: string = "";
  let _toChainSet: bool = false;
  let _destinationAddress: string = "";
  let _destinationAddressSet: bool = false;
  let _asset: string = "";
  let _assetSet: bool = false;
  let _options: Types.Options | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "fromChain") {
      reader.context().push(field, "string", "type found, reading property");
      _fromChain = reader.readString();
      _fromChainSet = true;
      reader.context().pop();
    }
    else if (field == "toChain") {
      reader.context().push(field, "string", "type found, reading property");
      _toChain = reader.readString();
      _toChainSet = true;
      reader.context().pop();
    }
    else if (field == "destinationAddress") {
      reader.context().push(field, "string", "type found, reading property");
      _destinationAddress = reader.readString();
      _destinationAddressSet = true;
      reader.context().pop();
    }
    else if (field == "asset") {
      reader.context().push(field, "string", "type found, reading property");
      _asset = reader.readString();
      _assetSet = true;
      reader.context().pop();
    }
    else if (field == "options") {
      reader.context().push(field, "Types.Options | null", "type found, reading property");
      let object: Types.Options | null = null;
      if (!reader.isNextNil()) {
        object = Types.Options.read(reader);
      }
      _options = object;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_fromChainSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'fromChain: String'"));
  }
  if (!_toChainSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'toChain: String'"));
  }
  if (!_destinationAddressSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'destinationAddress: String'"));
  }
  if (!_assetSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'asset: String'"));
  }

  return {
    fromChain: _fromChain,
    toChain: _toChain,
    destinationAddress: _destinationAddress,
    asset: _asset,
    options: _options
  };
}

export function serializegetDepositAddressResult(result: string | null): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: getDepositAddress");
  const sizer = new WriteSizer(sizerContext);
  writegetDepositAddressResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: getDepositAddress");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetDepositAddressResult(encoder, result);
  return buffer;
}

export function writegetDepositAddressResult(writer: Write, result: string | null): void {
  writer.context().push("getDepositAddress", "string | null", "writing property");
  writer.writeOptionalString(result);
  writer.context().pop();
}

export class Args_getOneTimeCode {
  signerAddress: string;
  traceId: string;
}

export function deserializegetOneTimeCodeArgs(argsBuf: ArrayBuffer): Args_getOneTimeCode {
  const context: Context = new Context("Deserializing module-type: getOneTimeCode");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _signerAddress: string = "";
  let _signerAddressSet: bool = false;
  let _traceId: string = "";
  let _traceIdSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "signerAddress") {
      reader.context().push(field, "string", "type found, reading property");
      _signerAddress = reader.readString();
      _signerAddressSet = true;
      reader.context().pop();
    }
    else if (field == "traceId") {
      reader.context().push(field, "string", "type found, reading property");
      _traceId = reader.readString();
      _traceIdSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_signerAddressSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'signerAddress: String'"));
  }
  if (!_traceIdSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'traceId: String'"));
  }

  return {
    signerAddress: _signerAddress,
    traceId: _traceId
  };
}

export function serializegetOneTimeCodeResult(result: Types.OTCResponce | null): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: getOneTimeCode");
  const sizer = new WriteSizer(sizerContext);
  writegetOneTimeCodeResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: getOneTimeCode");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetOneTimeCodeResult(encoder, result);
  return buffer;
}

export function writegetOneTimeCodeResult(writer: Write, result: Types.OTCResponce | null): void {
  writer.context().push("getOneTimeCode", "Types.OTCResponce | null", "writing property");
  if (result) {
    Types.OTCResponce.write(writer, result as Types.OTCResponce);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
}

export class Args_getInitRoomId {
  fromChain: string;
  toChain: string;
  destinationAddress: string;
  asset: string;
  publicAddress: string;
  signature: string;
  oneTimeCode: string;
  traceId: string;
}

export function deserializegetInitRoomIdArgs(argsBuf: ArrayBuffer): Args_getInitRoomId {
  const context: Context = new Context("Deserializing module-type: getInitRoomId");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _fromChain: string = "";
  let _fromChainSet: bool = false;
  let _toChain: string = "";
  let _toChainSet: bool = false;
  let _destinationAddress: string = "";
  let _destinationAddressSet: bool = false;
  let _asset: string = "";
  let _assetSet: bool = false;
  let _publicAddress: string = "";
  let _publicAddressSet: bool = false;
  let _signature: string = "";
  let _signatureSet: bool = false;
  let _oneTimeCode: string = "";
  let _oneTimeCodeSet: bool = false;
  let _traceId: string = "";
  let _traceIdSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "fromChain") {
      reader.context().push(field, "string", "type found, reading property");
      _fromChain = reader.readString();
      _fromChainSet = true;
      reader.context().pop();
    }
    else if (field == "toChain") {
      reader.context().push(field, "string", "type found, reading property");
      _toChain = reader.readString();
      _toChainSet = true;
      reader.context().pop();
    }
    else if (field == "destinationAddress") {
      reader.context().push(field, "string", "type found, reading property");
      _destinationAddress = reader.readString();
      _destinationAddressSet = true;
      reader.context().pop();
    }
    else if (field == "asset") {
      reader.context().push(field, "string", "type found, reading property");
      _asset = reader.readString();
      _assetSet = true;
      reader.context().pop();
    }
    else if (field == "publicAddress") {
      reader.context().push(field, "string", "type found, reading property");
      _publicAddress = reader.readString();
      _publicAddressSet = true;
      reader.context().pop();
    }
    else if (field == "signature") {
      reader.context().push(field, "string", "type found, reading property");
      _signature = reader.readString();
      _signatureSet = true;
      reader.context().pop();
    }
    else if (field == "oneTimeCode") {
      reader.context().push(field, "string", "type found, reading property");
      _oneTimeCode = reader.readString();
      _oneTimeCodeSet = true;
      reader.context().pop();
    }
    else if (field == "traceId") {
      reader.context().push(field, "string", "type found, reading property");
      _traceId = reader.readString();
      _traceIdSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_fromChainSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'fromChain: String'"));
  }
  if (!_toChainSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'toChain: String'"));
  }
  if (!_destinationAddressSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'destinationAddress: String'"));
  }
  if (!_assetSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'asset: String'"));
  }
  if (!_publicAddressSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'publicAddress: String'"));
  }
  if (!_signatureSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'signature: String'"));
  }
  if (!_oneTimeCodeSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'oneTimeCode: String'"));
  }
  if (!_traceIdSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'traceId: String'"));
  }

  return {
    fromChain: _fromChain,
    toChain: _toChain,
    destinationAddress: _destinationAddress,
    asset: _asset,
    publicAddress: _publicAddress,
    signature: _signature,
    oneTimeCode: _oneTimeCode,
    traceId: _traceId
  };
}

export function serializegetInitRoomIdResult(result: string | null): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: getInitRoomId");
  const sizer = new WriteSizer(sizerContext);
  writegetInitRoomIdResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: getInitRoomId");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetInitRoomIdResult(encoder, result);
  return buffer;
}

export function writegetInitRoomIdResult(writer: Write, result: string | null): void {
  writer.context().push("getInitRoomId", "string | null", "writing property");
  writer.writeOptionalString(result);
  writer.context().pop();
}

export class Args_approveAndSendToken {
  destinationChain: string;
  destinationAddress: string;
  symbol: string;
  amount: BigInt;
  tokenAddress: string;
  gatewayAddress: string;
  connection: Types.Ethereum_Connection | null;
  txOverrides: Types.Ethereum_TxOverrides | null;
}

export function deserializeapproveAndSendTokenArgs(argsBuf: ArrayBuffer): Args_approveAndSendToken {
  const context: Context = new Context("Deserializing module-type: approveAndSendToken");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _destinationChain: string = "";
  let _destinationChainSet: bool = false;
  let _destinationAddress: string = "";
  let _destinationAddressSet: bool = false;
  let _symbol: string = "";
  let _symbolSet: bool = false;
  let _amount: BigInt = BigInt.fromUInt16(0);
  let _amountSet: bool = false;
  let _tokenAddress: string = "";
  let _tokenAddressSet: bool = false;
  let _gatewayAddress: string = "";
  let _gatewayAddressSet: bool = false;
  let _connection: Types.Ethereum_Connection | null = null;
  let _txOverrides: Types.Ethereum_TxOverrides | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "destinationChain") {
      reader.context().push(field, "string", "type found, reading property");
      _destinationChain = reader.readString();
      _destinationChainSet = true;
      reader.context().pop();
    }
    else if (field == "destinationAddress") {
      reader.context().push(field, "string", "type found, reading property");
      _destinationAddress = reader.readString();
      _destinationAddressSet = true;
      reader.context().pop();
    }
    else if (field == "symbol") {
      reader.context().push(field, "string", "type found, reading property");
      _symbol = reader.readString();
      _symbolSet = true;
      reader.context().pop();
    }
    else if (field == "amount") {
      reader.context().push(field, "BigInt", "type found, reading property");
      _amount = reader.readBigInt();
      _amountSet = true;
      reader.context().pop();
    }
    else if (field == "tokenAddress") {
      reader.context().push(field, "string", "type found, reading property");
      _tokenAddress = reader.readString();
      _tokenAddressSet = true;
      reader.context().pop();
    }
    else if (field == "gatewayAddress") {
      reader.context().push(field, "string", "type found, reading property");
      _gatewayAddress = reader.readString();
      _gatewayAddressSet = true;
      reader.context().pop();
    }
    else if (field == "connection") {
      reader.context().push(field, "Types.Ethereum_Connection | null", "type found, reading property");
      let object: Types.Ethereum_Connection | null = null;
      if (!reader.isNextNil()) {
        object = Types.Ethereum_Connection.read(reader);
      }
      _connection = object;
      reader.context().pop();
    }
    else if (field == "txOverrides") {
      reader.context().push(field, "Types.Ethereum_TxOverrides | null", "type found, reading property");
      let object: Types.Ethereum_TxOverrides | null = null;
      if (!reader.isNextNil()) {
        object = Types.Ethereum_TxOverrides.read(reader);
      }
      _txOverrides = object;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_destinationChainSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'destinationChain: String'"));
  }
  if (!_destinationAddressSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'destinationAddress: String'"));
  }
  if (!_symbolSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'symbol: String'"));
  }
  if (!_amountSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'amount: BigInt'"));
  }
  if (!_tokenAddressSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'tokenAddress: String'"));
  }
  if (!_gatewayAddressSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'gatewayAddress: String'"));
  }

  return {
    destinationChain: _destinationChain,
    destinationAddress: _destinationAddress,
    symbol: _symbol,
    amount: _amount,
    tokenAddress: _tokenAddress,
    gatewayAddress: _gatewayAddress,
    connection: _connection,
    txOverrides: _txOverrides
  };
}

export function serializeapproveAndSendTokenResult(result: Types.Ethereum_TxReceipt): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: approveAndSendToken");
  const sizer = new WriteSizer(sizerContext);
  writeapproveAndSendTokenResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: approveAndSendToken");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeapproveAndSendTokenResult(encoder, result);
  return buffer;
}

export function writeapproveAndSendTokenResult(writer: Write, result: Types.Ethereum_TxReceipt): void {
  writer.context().push("approveAndSendToken", "Types.Ethereum_TxReceipt", "writing property");
  Types.Ethereum_TxReceipt.write(writer, result);
  writer.context().pop();
}

export class Args_approve {
  tokenAddress: string;
  amount: BigInt;
  gatewayAddress: string;
  connection: Types.Ethereum_Connection | null;
  txOverrides: Types.Ethereum_TxOverrides | null;
}

export function deserializeapproveArgs(argsBuf: ArrayBuffer): Args_approve {
  const context: Context = new Context("Deserializing module-type: approve");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _tokenAddress: string = "";
  let _tokenAddressSet: bool = false;
  let _amount: BigInt = BigInt.fromUInt16(0);
  let _amountSet: bool = false;
  let _gatewayAddress: string = "";
  let _gatewayAddressSet: bool = false;
  let _connection: Types.Ethereum_Connection | null = null;
  let _txOverrides: Types.Ethereum_TxOverrides | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "tokenAddress") {
      reader.context().push(field, "string", "type found, reading property");
      _tokenAddress = reader.readString();
      _tokenAddressSet = true;
      reader.context().pop();
    }
    else if (field == "amount") {
      reader.context().push(field, "BigInt", "type found, reading property");
      _amount = reader.readBigInt();
      _amountSet = true;
      reader.context().pop();
    }
    else if (field == "gatewayAddress") {
      reader.context().push(field, "string", "type found, reading property");
      _gatewayAddress = reader.readString();
      _gatewayAddressSet = true;
      reader.context().pop();
    }
    else if (field == "connection") {
      reader.context().push(field, "Types.Ethereum_Connection | null", "type found, reading property");
      let object: Types.Ethereum_Connection | null = null;
      if (!reader.isNextNil()) {
        object = Types.Ethereum_Connection.read(reader);
      }
      _connection = object;
      reader.context().pop();
    }
    else if (field == "txOverrides") {
      reader.context().push(field, "Types.Ethereum_TxOverrides | null", "type found, reading property");
      let object: Types.Ethereum_TxOverrides | null = null;
      if (!reader.isNextNil()) {
        object = Types.Ethereum_TxOverrides.read(reader);
      }
      _txOverrides = object;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_tokenAddressSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'tokenAddress: String'"));
  }
  if (!_amountSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'amount: BigInt'"));
  }
  if (!_gatewayAddressSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'gatewayAddress: String'"));
  }

  return {
    tokenAddress: _tokenAddress,
    amount: _amount,
    gatewayAddress: _gatewayAddress,
    connection: _connection,
    txOverrides: _txOverrides
  };
}

export function serializeapproveResult(result: Types.Ethereum_TxReceipt): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: approve");
  const sizer = new WriteSizer(sizerContext);
  writeapproveResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: approve");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeapproveResult(encoder, result);
  return buffer;
}

export function writeapproveResult(writer: Write, result: Types.Ethereum_TxReceipt): void {
  writer.context().push("approve", "Types.Ethereum_TxReceipt", "writing property");
  Types.Ethereum_TxReceipt.write(writer, result);
  writer.context().pop();
}

export class Args_sendToken {
  destinationChain: string;
  destinationAddress: string;
  symbol: string;
  amount: BigInt;
  gatewayAddress: string;
  connection: Types.Ethereum_Connection | null;
  txOverrides: Types.Ethereum_TxOverrides | null;
}

export function deserializesendTokenArgs(argsBuf: ArrayBuffer): Args_sendToken {
  const context: Context = new Context("Deserializing module-type: sendToken");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _destinationChain: string = "";
  let _destinationChainSet: bool = false;
  let _destinationAddress: string = "";
  let _destinationAddressSet: bool = false;
  let _symbol: string = "";
  let _symbolSet: bool = false;
  let _amount: BigInt = BigInt.fromUInt16(0);
  let _amountSet: bool = false;
  let _gatewayAddress: string = "";
  let _gatewayAddressSet: bool = false;
  let _connection: Types.Ethereum_Connection | null = null;
  let _txOverrides: Types.Ethereum_TxOverrides | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "destinationChain") {
      reader.context().push(field, "string", "type found, reading property");
      _destinationChain = reader.readString();
      _destinationChainSet = true;
      reader.context().pop();
    }
    else if (field == "destinationAddress") {
      reader.context().push(field, "string", "type found, reading property");
      _destinationAddress = reader.readString();
      _destinationAddressSet = true;
      reader.context().pop();
    }
    else if (field == "symbol") {
      reader.context().push(field, "string", "type found, reading property");
      _symbol = reader.readString();
      _symbolSet = true;
      reader.context().pop();
    }
    else if (field == "amount") {
      reader.context().push(field, "BigInt", "type found, reading property");
      _amount = reader.readBigInt();
      _amountSet = true;
      reader.context().pop();
    }
    else if (field == "gatewayAddress") {
      reader.context().push(field, "string", "type found, reading property");
      _gatewayAddress = reader.readString();
      _gatewayAddressSet = true;
      reader.context().pop();
    }
    else if (field == "connection") {
      reader.context().push(field, "Types.Ethereum_Connection | null", "type found, reading property");
      let object: Types.Ethereum_Connection | null = null;
      if (!reader.isNextNil()) {
        object = Types.Ethereum_Connection.read(reader);
      }
      _connection = object;
      reader.context().pop();
    }
    else if (field == "txOverrides") {
      reader.context().push(field, "Types.Ethereum_TxOverrides | null", "type found, reading property");
      let object: Types.Ethereum_TxOverrides | null = null;
      if (!reader.isNextNil()) {
        object = Types.Ethereum_TxOverrides.read(reader);
      }
      _txOverrides = object;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_destinationChainSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'destinationChain: String'"));
  }
  if (!_destinationAddressSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'destinationAddress: String'"));
  }
  if (!_symbolSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'symbol: String'"));
  }
  if (!_amountSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'amount: BigInt'"));
  }
  if (!_gatewayAddressSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'gatewayAddress: String'"));
  }

  return {
    destinationChain: _destinationChain,
    destinationAddress: _destinationAddress,
    symbol: _symbol,
    amount: _amount,
    gatewayAddress: _gatewayAddress,
    connection: _connection,
    txOverrides: _txOverrides
  };
}

export function serializesendTokenResult(result: Types.Ethereum_TxReceipt): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: sendToken");
  const sizer = new WriteSizer(sizerContext);
  writesendTokenResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: sendToken");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesendTokenResult(encoder, result);
  return buffer;
}

export function writesendTokenResult(writer: Write, result: Types.Ethereum_TxReceipt): void {
  writer.context().push("sendToken", "Types.Ethereum_TxReceipt", "writing property");
  Types.Ethereum_TxReceipt.write(writer, result);
  writer.context().pop();
}
