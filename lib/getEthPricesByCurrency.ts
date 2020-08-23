type EthPricesResponse = {
  success: boolean;
  result?: {
    [key: string]: number;
  };
  error?: string;
  message?: string;
};

export default async function getEthPricesByCurrency(
  currency: "USD" | "EUR" | "GBP" = "USD"
) {
  try {
    const res = await fetch("https://ethereum-api.xyz/eth-prices");

    if (res.ok) {
      const { result }: EthPricesResponse = await res.json();

      return result[currency];
    }

    throw new Error("Failed to 'fetch' eth-prices");
  } catch (error) {
    console.error(error);
  }
}
