import constants from "lib/constants";
import { Contract } from "ethers";
import { parseEther, parseUnits } from "ethers/lib/utils";
import Provider from "lib/provider";

export default async (req, res) => {
  const { query } = req;

  try {
    if (!(query.token && query.amount))
      throw new Error(`Parameters 'token' & 'amount' are required`);

    const Compound = new Contract(
      constants.Compound[query.token].address,
      constants.Compound[query.token].abi,
      Provider
    );

    let gasEstimation;

    switch (query.token) {
      case "cETH":
        gasEstimation = await Compound.estimateGas.mint({
          value: parseEther(query.amount),
        });

        break;

      case "cDAI":
      default:
        gasEstimation = await Compound.estimateGas.mint(
          parseUnits(query.amount, 18)
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
