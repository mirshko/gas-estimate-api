type GasPricesResponse = {
  success: boolean;
  result?: GasPrices;
  error?: string;
  message?: string;
};

interface GasPrice {
  time: number;
  price: number;
}

interface GasPrices {
  timestamp: number;
  slow: GasPrice;
  average: GasPrice;
  fast: GasPrice;
}

export default async function getGasPriceBySpeed(
  speed: "slow" | "average" | "fast" = "average"
) {
  try {
    const res = await fetch("https://ethereum-api.xyz/gas-prices");

    if (res.ok) {
      const { result }: GasPricesResponse = await res.json();

      return result[speed];
    }

    throw new Error("Failed to 'fetch' gas-prices");
  } catch (error) {
    console.error(error);
  }
}
