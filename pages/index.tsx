import Head from "next/head";
import styles from "../styles/Home.module.css";
import useSWR from "swr";

const fetcher = async (...args: [any]) => {
  const res = await fetch(...args);
  return res.json();
};

const CompoundDeposit = () => {
  const { data } = useSWR(
    () => `/api/compound/mint?token=${"cDAI"}&amount=${"25"}`,
    fetcher
  );

  return (
    <p className="flex">
      <div className="inline">Depositing</div>
      <div className="inline">
        <input type="text" size={2} defaultValue={25} />
      </div>
      <div className="inline">
        <select name="currency" id="currency">
          <option value="cDAI" selected>
            DAI
          </option>
          <option value="cETH">ETH</option>
          <option value="cBAT">BAT</option>
          <option value="cUSDC">USDC</option>
        </select>
      </div>
      <div className="inline">currently costs</div>
      <div className="inline">
        <strong>{data?.result?.fee.toFixed(4) ?? (0.0).toFixed(4)} ETH</strong>.
      </div>
    </p>
  );
};

const CompoundWithdraw = () => {
  const { data } = useSWR(
    () => `/api/compound/redeemUnderlying?token=${"cETH"}&amount=${"50"}`,
    fetcher
  );

  return (
    <p className="flex">
      <div className="inline">Withdrawing</div>
      <div className="inline">
        <input type="text" size={2} defaultValue={50} />
      </div>
      <div className="inline">
        <select name="currency" id="currency">
          <option value="cDAI">DAI</option>
          <option value="cETH" selected>
            ETH
          </option>
          <option value="cBAT">BAT</option>
          <option value="cUSDC">USDC</option>
        </select>
      </div>
      <div className="inline">currently costs</div>
      <div className="inline">
        <strong>{data?.result?.fee.toFixed(4) ?? (0.0).toFixed(4)} ETH</strong>.
      </div>
    </p>
  );
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>gas-estimate-api.xyz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <CompoundDeposit />

        <CompoundWithdraw />
      </main>
    </div>
  );
}
