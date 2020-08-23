import { Contract } from "ethers";
import { parseUnits, parseEther } from "ethers/lib/utils";
import cDAI from "../../../abi/cDAI.json";
import cETH from "../../../abi/cETH.json";
import Provider from "../../../lib/provider";

const ABI = {
  cDAI,
  cETH,
};

const ADDRESSES = {
  cDAI: "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643",
  cETH: "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5",
};

export default async (req, res) => {
  const { query } = req;

  try {
    if (!query.token) throw new Error(`Parameter 'token' is required`);

    const Compound = new Contract(
      ADDRESSES[query.token],
      ABI[query.token],
      Provider
    );

    let gasEstimation;

    switch (query.token) {
      case "cETH":
        gasEstimation = await Compound.estimateGas.mint({
          value: parseEther(query?.amount ?? "1"),
        });

        break;

      case "cDAI":
      default:
        gasEstimation = await Compound.estimateGas.mint(
          parseUnits(query?.amount ?? "1", 18)
        );

        break;
    }

    res.json({
      success: true,
      result: {
        timestamp: Date.now(),
        estimation: gasEstimation.toNumber(),
      },
    });
  } catch (error) {
    console.error(error);

    res.status(400).send("Error");
  }
};
