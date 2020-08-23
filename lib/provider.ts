import { providers } from "ethers";

const Provider = new providers.InfuraProvider(1, process.env.INFURA_API_KEY);

export default Provider;
