/**
 * @name fetchEthPrices
 *
 * @param {("USD"|"EUR"|"GBP")} currency
 */
export default async function fetchEthPrices(currency = "USD") {
  try {
    const res = await fetch("https://ethereum-api.xyz/eth-prices");

    if (res.ok) {
      const { result } = await res.json();

      return result[currency];
    }

    throw new Error("Failed to 'fetch' eth-prices");
  } catch (error) {
    console.error(error);
  }
}
