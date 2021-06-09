import { useEffect, useState } from "react";
import { BigNumberish, ethers } from "ethers";
import { getProvider } from "../services/ethereum";

export const useWallet = (address: string) => {
  const [balance, setBalance] = useState<BigNumberish>("0");

  useEffect(() => {
    getProvider()
      .getBalance(address)
      .then((walletBalance) => {
        setBalance(ethers.utils.formatEther(walletBalance));
      });
  }, []);

  return { balance };
};
