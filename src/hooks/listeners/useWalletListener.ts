import { useEffect } from "react";
import { getProvider, onAccountsChange } from "../../services/ethereum";
import { useRootDispatch, useRootSelector } from "../../store";
import { getUser } from "../../store/reducers/user/selectors";
import { setUserAddress } from "../../store/reducers/user/userSlice";

export const useWalletListener = () => {
  const dispatch = useRootDispatch();
  const { ens, address } = useRootSelector(getUser);

  useEffect(() => {
    const listener = (accounts: string[]) => {
      dispatch(setUserAddress(accounts[0]));
    };
    onAccountsChange(listener);
    getProvider().listAccounts().then(listener);
  }, []);

  useEffect(() => {
    if (address) {
      getProvider()
        .lookupAddress(address)
        .then((addressENS) => {
          if (addressENS) {
            dispatch(setUserAddress(addressENS));
          }
        });
    }
  }, [address]);

  return { address, ens };
};
