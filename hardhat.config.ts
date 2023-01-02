// prettier-ignore
import { task } from "hardhat/config";
// prettier-ignore
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// prettier-ignore
import { BigNumber } from "ethers";
import "@nomiclabs/hardhat-waffle";

// When using the hardhat network, you may choose to fork Fuji or Avalanche Mainnet
// This will allow you to debug contracts using the hardhat network while keeping the current network state
// To enable forking, turn one of these booleans on, and then run your tasks/scripts using ``--network hardhat``
// For more information go to the hardhat guide
// https://hardhat.org/hardhat-network/
// https://hardhat.org/guides/mainnet-forking.html
const FORK_FUJI = false;
const FORK_MAINNET = false;
const forkingData = FORK_FUJI
  ? {
      url: "https://rpc0.altcoinchain.org/rpc",
    }
  : FORK_MAINNET
  ? {
      url: "https://rpc0.altcoinchain.org/rpc",
    }
  : undefined;

task(
  "accounts",
  "Prints the list of accounts",
  async (args, hre): Promise<void> => {
    const accounts: SignerWithAddress[] = await hre.ethers.getSigners();
    accounts.forEach((account: SignerWithAddress): void => {
      console.log(account.address);
    });
  }
);

task(
  "balances",
  "Prints the list of ALT account balances",
  async (args, hre): Promise<void> => {
    const accounts: SignerWithAddress[] = await hre.ethers.getSigners();
    for (const account of accounts) {
      const balance: BigNumber = await hre.ethers.provider.getBalance(
        account.address
      );
      console.log(`${account.address} has balance ${balance.toString()}`);
    }
  }
);

export default {
  solidity: {
    compilers: [
      {
        version: "0.5.16",
      },
      {
        version: "0.6.2",
      },
      {
        version: "0.6.4",
      },
      {
        version: "0.7.0",
      },
      {
        version: "0.8.0",
      },
      {
        version: "0.8.1",
      },
      {
        version: "0.8.2",
      },
      {
        version: "0.8.3",
      },
    ],
  },
  networks: {
    hardhat: {
      gasPrice: 225000000000,
      chainId: !forkingData ? 2330 : undefined, //Only specify a chainId if we are not forking
      forking: forkingData,
    },
    local: {
      url: "https://rpc0.altcoinchain.org/rpc",
      gasPrice: 225000000000,
      chainId: 2330,
      accounts: [
        "0xB52eF8FF876110783511D413c3343bB5ff1D77d1",
      ],
    },
    fuji: {
      url: "https://rpc0.altcoinchain.org/rpc",
      gasPrice: 225000000000,
      chainId: 2330,
      accounts: [],
    },
    mainnet: {
      url: "https://rpc0.altcoinchain.org/rpc",
      gasPrice: 225000000000,
      chainId: 2330,
      accounts: [],
    },
  },
};
