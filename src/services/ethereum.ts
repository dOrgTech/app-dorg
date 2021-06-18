import { ethers } from "ethers";
import { useEffect, useState } from "react";

// eslint-disable-next-line
const ethereum = (window as any).ethereum;

export function useIsWalletConnected() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const listener = (accounts: string[]) => {
      setLoading(false);
      if (accounts.length) setConnected(true);
      else setConnected(false);
    };
    onAccountsChange(listener);
    getProvider().listAccounts().then(listener);
  }, []);
  return { connected, loading };
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
