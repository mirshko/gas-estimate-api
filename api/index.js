import { Contract as EthersContract, providers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
// import fetchEthPrices from "../lib/fetchEthPrices";
// import fetchGasPrices from "../lib/fetchGasPrices";
import cToken from "../abi/cToken.json";

const API_KEY = "dd1817d5225849d18bce57c75d4c23d1";

const CONTRACTS = {
  Compound: {
    abi: cToken,
  },
};

const ADDRESSES = {
  cDAI: "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643",
};

export default async (req, res) => {
  const { query } = req;

  const Provider = new providers.InfuraProvider(1, API_KEY);

  try {
    if (!(query.contract && query.function))
      throw new Error(`Parameters 'contract' & 'function' are required`);

    const Contract = new EthersContract(
      ADDRESSES[query?.token ?? "DAI"],
      CONTRACTS[query.contract].abi,
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
