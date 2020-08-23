import cDAI from "abi/cDAI.json";
import cETH from "abi/cETH.json";

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
  },
};

export default constants;
