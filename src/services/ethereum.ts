import { ethers } from "ethers";
import { useEffect, useState } from "react";

// eslint-disable-next-line
const ethereum = (window as any).ethereum;

export function useConnectedWallet() {
  const [wallet, setWallet] = useState<string>();
  useEffect(() => {
    onAccountsChange((accounts) => {
      if (accounts.length) setWallet(accounts[0]);
      else setWallet(undefined);
    });
  }, []);
  return wallet;
}

export function requestAccounts() {
  if (ethereum?.request)
    return ethereum.request({ method: "eth_requestAccounts" });
}

export function onAccountsChange(listener: (accounts: string[]) => void) {
  if (ethereum?.on) ethereum.on("accountsChanged", listener);
}

export function getProvider() {
  return new ethers.providers.Web3Provider(ethereum, "any");
}

export function getSigner() {
  return getProvider().getSigner();
}
