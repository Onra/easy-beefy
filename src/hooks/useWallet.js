import { useContext, useCallback } from "react";
import { Context } from "../context";
import { API_HOST } from "../config/api-config";
import axios from "axios";

const useWallet = () => {
  const { isLoading, setLoading, data, setData } = useContext(Context);

  const fetchData = useCallback(
    async walletAddress => {
      try {
        setLoading(true);
        const walletData = await axios.get(
          API_HOST + walletAddress + "?platforms=beefy"
        );

        setData(walletData?.data?.result);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
    [setData, setLoading]
  );

  const getTVL = () => {
    return (
      data?.BeefyFinance?.vaults?.totalUSDValues?.total +
      data?.BeefyFinance?.LPVaults?.totalUSDValues?.total +
      data?.BeefyFinance?.staking?.totalUSDValues?.total +
      data?.BeefyFinance?.barnOfTrust?.totalUSDValues?.total
    );
  };

  const getAnnualYieldAmount = () => {
    return data?.BeefyFinance?.vaults?.vaults?.reduce((accumulator, vault) => {
      return (
        accumulator +
        vault.currentTokens * vault.priceInUSDDepositToken * vault.apy
      );
    }, 0);
  };

  const getWalletAPY = () => {
    let apys = data?.BeefyFinance?.vaults?.vaults?.map(vault => ({
      amountUSD: vault.currentTokens * vault.priceInUSDDepositToken,
      apy: vault.apy
    }));

    apys = [
      ...apys,
      ...data?.BeefyFinance?.LPVaults?.vaults?.map(vault => ({
        amountUSD: vault.currentTokens * vault.priceInUSDDepositToken,
        apy: vault.apy
      }))
    ];

    const totalAmount = apys.reduce((acc, cur) => acc + cur.amountUSD, 0);

    const totalApy = apys.reduce(
      (acc, cur) => acc + cur.amountUSD * cur.apy,
      0
    );
    console.log("APY; ", totalApy / totalAmount);
    return totalApy / totalAmount;
  };

  const getWalletAPR = () => {
    const periodicRate = Math.pow(1 + getWalletAPY(), 1 / 365) - 1;
    return periodicRate * 365;
  };

  const getAPRFromAPY = apy => {
    const periodicRate = Math.pow(1 + apy, 1 / 365) - 1;
    return periodicRate * 365;
  };

  const getDailyEarnings = () => {
    let apys = data?.BeefyFinance?.vaults?.vaults?.map(vault => ({
      amountUSD: vault.currentTokens * vault.priceInUSDDepositToken,
      apy: vault.apy
    }));

    apys = [
      ...apys,
      ...data?.BeefyFinance?.LPVaults?.vaults?.map(vault => ({
        amountUSD: vault.currentTokens * vault.priceInUSDDepositToken,
        apy: vault.apy
      }))
    ];

    const dailyEarnings = apys.reduce(
      (acc, cur) => acc + cur.amountUSD * (getAPRFromAPY(cur.apy) / 365),
      0
    );

    return dailyEarnings;
  };

  return {
    isLoading,
    setLoading,
    data,
    setData,
    fetchData,
    getTVL,
    getAnnualYieldAmount,
    getWalletAPY,
    getWalletAPR,
    getDailyEarnings
  };
};

export default useWallet;
