import { Network } from "@axelar-network/axelar-local-dev/src/Network";
const axelar = require("@axelar-network/axelar-local-dev");

import { Wallet } from "ethers";

jest.setTimeout(360000);

describe("e2e", () => {
  let chain1: Network;
  let chain2: Network;
  let user1: Wallet;
  let user2: Wallet;

  beforeAll(async () => {
    chain1 = await axelar.createNetwork();
    chain2 = await axelar.createNetwork();

    user1 = chain1.userWallets[0];
    user2 = chain2.userWallets[0];

    await chain1.giveToken(user1.address, "aUSDC", BigInt("12345"));
  });

  it("Send transaction", async () => {
    console.log(
      `user1 has ${await chain1.usdc.balanceOf(user1.address)} aUSDC BEFORE.`
    );
    console.log(
      `user2 has ${await chain2.usdc.balanceOf(user2.address)} aUSDC BEFORE.`
    );

    // Approve the AxelarGateway to use our aUSDC on chain1.
    await (
      await chain1.usdc.connect(user1).approve(chain1.gateway.address, 345)
    ).wait();
    // And have it send it to chain2.
    await (
      await chain1.gateway
        .connect(user1)
        .sendToken(chain2.name, user2.address, "aUSDC", 345)
    ).wait();
    // Have axelar relay the tranfer to chain2.
    await axelar.relay();

    //await new Promise(r => setTimeout(r, 15000));

    console.log(
      `user1 has ${await chain1.usdc.balanceOf(user1.address)} aUSDC AFTER.`
    );
    console.log(
      `user2 has ${await chain2.usdc.balanceOf(user2.address)} aUSDC AFTER.`
    );
  });
});
