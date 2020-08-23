import { Contract } from "ethers";
import type { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import constants from "lib/constants";
import Provider from "lib/provider";
import type {
  GasEstimateApiRequest,
  GasEstimateApiResponse,
} from "types/utils";

export default async (
  req: GasEstimateApiRequest,
  res: GasEstimateApiResponse
) => {
  const { query } = req;

  try {
    if (!query.token) throw new Error(`Missing or invalid 'token' parameter`);

    if (!query.amount) throw new Error(`Missing or invalid 'amount' parameter`);

    const Compound = new Contract(
      constants.Compound[query.token].address,
      constants.Compound[query.token].abi,
      Provider
    );

    let gasEstimation: BigNumber;

    switch (query.token) {
      case "cDAI":
      case "cETH":
      case "cBAT":
      case "cUSDC":
      default:
        gasEstimation = await Compound.estimateGas.redeemUnderlying(
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

    if (error.code && error.reason) {
      res.status(400).json({
        success: false,
        error: error.code,
        message: error.reason,
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Internal Server Error",
        message: error.message ?? "Something Went Wrong",
      });
    }
  }
};
