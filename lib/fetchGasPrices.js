/**
 * @name fetchGasPrices
 *
 * @param {("slow"|"average"|"fast")} speed
 */
export default async function fetchGasPrices(speed = "average") {
  try {
    const res = await fetch("https://ethereum-api.xyz/gas-prices");

    if (res.ok) {
      const { result } = await res.json();

      return result[speed];
    }

    throw new Error("Failed to 'fetch' gas-prices");
  } catch (error) {
    console.error(error);
  }
}
