import type { NextApiRequest, NextApiResponse } from "next";

type GasEstimateResponse = {
  success: boolean;
  result?: {
    timestamp: number;
    estimation: number;
  };
  error?: string;
  message?: string;
};

export type GasEstimateApiResponse = NextApiResponse<GasEstimateResponse>;

export interface GasEstimateApiRequest extends NextApiRequest {
  query: {
    [key: string]: string | string[];
    token: "cDAI" | "cETH";
    amount: string;
  };
}
