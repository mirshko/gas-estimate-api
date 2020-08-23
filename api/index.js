import { Contract as EthersContract, providers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
// import fetchEthPrices from "../lib/fetchEthPrices";
// import fetchGasPrices from "../lib/fetchGasPrices";
import cDAI from "../abi/cDAI.json";
import cETH from "../abi/cETH.json";

const API_KEY = "dd1817d5225849d18bce57c75d4c23d1";

const CONTRACTS = {
  Compound: {
    abi: {
      cDAI,
      cETH,
    },
  },
};

const ADDRESSES = {
  cDAI: "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643",
  cETH: "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5",
};

export default async (req, res) => {
  const { query } = req;

  const Provider = new providers.InfuraProvider(1, API_KEY);

  try {
    if (!(query.contract && query.function && query.token))
      throw new Error(`Parameters 'contract' & 'function' are required`);

    const Contract = new EthersContract(
      ADDRESSES[query.token],
      CONTRACTS[query.contract].abi[query.token],
      Provider
    );

    const gasLimit = await Contract.estimateGas[query.function](
      parseUnits(query?.amount ?? "1", 18).toString()
    );

    // const { price: gasPrice } = await fetchGasPrices(query?.speed);

    // const ethPrice = await fetchEthPrices(query?.currency);

    res.json({
      query,
      gwei: gasLimit.toString(),
      // gasPrice,
      // ethPrice,
    });
  } catch (error) {
    console.error(error);

    res.status(400).send("Error");
  }
};
