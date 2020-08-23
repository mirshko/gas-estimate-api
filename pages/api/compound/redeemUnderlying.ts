import { Contract } from "ethers";
import type { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import constants from "lib/constants";
import Provider from "lib/provider";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
  result?: {
    timestamp: number;
    estimation: number;
  };
  error?: string;
  message?: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { query } = req;

  try {
    if (!(query.token && query.amount))
      throw new Error(`Parameters 'token' & 'amount' are required`);

    const Compound = new Contract(
      constants.Compound[query.token].address,
      constants.Compound[query.token].abi,
      Provider
    );

    let gasEstimation: BigNumber;

    switch (query.token) {
      case "cDAI":
      case "cETH":
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

    res.status(400).json({
      success: false,
    });
  }
};
