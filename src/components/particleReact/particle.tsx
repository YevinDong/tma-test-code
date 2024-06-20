import React from "react";
import { Buffer } from "buffer";
import {
  useConnect,
  useUserInfo,
  useSolana,
} from "@particle-network/auth-core-modal";
import {
  AuthCoreContextProvider,
  PromptSettingType,
} from "@particle-network/auth-core-modal";
import * as web3 from "@solana/web3.js";
import bs58 from "bs58";
import { particleProjectConfig, style, particleWalletConfig } from "./helper";

export function Particle() {
  return (
    <>
      <AuthCoreContextProvider
        options={{
          projectId: particleProjectConfig.projectId,
          clientKey: particleProjectConfig.clientKey,
          appId: particleProjectConfig.appId,
          themeType: "dark",
          fiatCoin: "USD",
          language: "en",

          promptSettingConfig: {
            promptPaymentPasswordSettingWhenSign: PromptSettingType.first,
            promptMasterPasswordSettingWhenLogin: PromptSettingType.first,
          },
          wallet: particleWalletConfig,
        }}
      >
        <ConnectBox />
      </AuthCoreContextProvider>
    </>
  );
}

function ConnectBox(): React.JSX.Element {
  const { connect, disconnect } = useConnect();
  const { userInfo } = useUserInfo();

  function c() {
    connect();
    const shadowRoot = document.querySelector('#particle-auth-core-modal');
    console.log('shadowRoot: ', shadowRoot);
  }
  return (
    <>
      <div style={style.main}>
        <button className="button is-link" onClick={() => c()}>
          connect
        </button>
        <button className="button is-danger" onClick={() => disconnect()}>
          disconnect
        </button>
        {userInfo?.uuid ? <SolanaOperator /> : null}
      </div>
    </>
  );
}

function SolanaOperator() {
  const { address, signMessage, chainInfo, signAndSendTransaction } =
    useSolana();
  const { userInfo } = useUserInfo();
  async function signMessageHandler() {
    const bf = Buffer.from("hello world", "utf-8");
    const signed = await signMessage(bf);
    console.log("signed: ", bs58.encode(signed));
  }

  async function signTransactionHandler() {
    const connection = new web3.Connection(chainInfo.rpcUrl);
    const tx = new web3.Transaction();
    const web3_address = new web3.PublicKey(address!);
    tx.add(
      web3.SystemProgram.transfer({
        fromPubkey: web3_address,
        toPubkey: new web3.PublicKey(
          "DJ6csRd2d4dhms9MzG4wuigNeGz66a7mgUMdCJB8paYi"
        ),
        lamports: 0.01 * web3.LAMPORTS_PER_SOL,
      })
    );

    const blockInfo = await connection.getLatestBlockhash();
    tx.feePayer = web3_address;
    tx.recentBlockhash = blockInfo.blockhash;
    tx.lastValidBlockHeight = blockInfo.lastValidBlockHeight;

    const signed = await signAndSendTransaction(tx, chainInfo.id);
    console.log("signed: ", signed);
  }
  return (
    <>
      <div>{JSON.stringify(userInfo)}</div>
      <div>{address}</div>
      <button className="button is-link" onClick={() => signMessageHandler()}>
        Sign Message
      </button>
      <button
        className="button is-link"
        onClick={() => signTransactionHandler()}
      >
        Sign Transaction
      </button>
    </>
  );
}
