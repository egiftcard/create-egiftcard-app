import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ConnectWallet } from "@3rdweb/react";
import { useWeb3 } from "@3rdweb/hooks";
import { Button } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { IoLogoGithub } from "react-icons/io";

const Home: NextPage = () => {
  const { provider } = useWeb3();
  function sendTx() {
    provider?.getSigner()?.sendTransaction({
      to: "0x0000000000000000000000000000000000000000",
      value: BigNumber.from(0),
    });
  }
  async function signMsg() {
    await provider?.getSigner()?.signMessage("gm");
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Thirdweb App</title>
        <meta name="description" content="Generated by create-thirdweb-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://thirdweb.com">thirdweb</a> Connect Wallet Starter
        </h1>
        <br />
        <ConnectWallet />

        <p className={styles.description}>
          This is a barebones nextjs app initialized by{" "}
          <a href="https://npmjs.com/package/@3rdweb/react">
            thirdweb wallet connect
          </a>
          . <br />
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Send Transaction</h2>
            <p>Send money to an address from connected wallet. </p>
            <Button onClick={sendTx}>Send Transaction</Button>
          </div>
          <div className={styles.card}>
            <h2>Sign Message </h2>
            <p>Sign a message with public keys of connected wallet </p>

            <Button onClick={signMsg}>Sign Message</Button>
          </div>
          <a href="https://typescript-sdk.thirdweb.com" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about thirdweb features and API.</p>
          </a>

          <a href="https://portal.thirdweb.com" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Thirdweb modules in the thirdweb portal!</p>
          </a>

          <a
            href="https://github.com/thirdweb-dev/create-thirdweb-app/tree/main/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example thirdweb projects.</p>
          </a>

          <a href="https://thirdweb.com" className={styles.card}>
            <h2>Dashboard &rarr;</h2>
            <p>Interact with and manage thirdweb modules without code</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://thirdweb.com?utm_source=create-thirdweb-app&utm_medium=default-template&utm_campaign=create-thirdweb-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image
              src="/thirdweb.svg"
              alt="Thirdweb Logo"
              width={29}
              height={16}
            />
          </span>
        </a>
        <a href="https://github.com/thirdweb-dev">
          <IoLogoGithub width={50} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
