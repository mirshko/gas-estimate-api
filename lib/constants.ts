import cBAT from "abi/cBAT.json";
import cDAI from "abi/cDAI.json";
import cETH from "abi/cETH.json";
import cUSDC from "abi/cUSDC.json";

const constants = {
  Compound: {
    cDAI: {
      address: "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643",
      abi: cDAI,
    },
    cETH: {
      address: "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5",
      abi: cETH,
    },
    cBAT: {
      address: "0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e",
      abi: cBAT,
    },
    cUSDC: {
      address: "0x39aa39c021dfbae8fac545936693ac917d5e7563",
      abi: cUSDC,
    },
  },
};

export default constants;
