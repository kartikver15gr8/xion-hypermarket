export const NEUTRON_CHAIN_ID = "pion-1";
// export const NEUTRON_CHAIN_ID_MAINNET = "neutron-1";

export const neutronChainConfig = {
  chainId: NEUTRON_CHAIN_ID,
  chainName: "Neutron",
  rpc: "https://rpc-falcron.pion-1.ntrn.tech",
  rest: "https://rest-falcron.pion-1.ntrn.tech",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "neutron",
    bech32PrefixAccPub: "neutronpub",
    bech32PrefixValAddr: "neutronvaloper",
    bech32PrefixValPub: "neutronvaloperpub",
    bech32PrefixConsAddr: "neutronvalcons",
    bech32PrefixConsPub: "neutronvalconspub",
  },
  currencies: [
    {
      coinDenom: "NTRN",
      coinMinimalDenom: "untrn",
      coinDecimals: 6,
      coinGeckoId: "neutron",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "NTRN",
      coinMinimalDenom: "untrn",
      coinDecimals: 6,
      coinGeckoId: "neutron",
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "NTRN",
    coinMinimalDenom: "untrn",
    coinDecimals: 6,
    coinGeckoId: "neutron",
  },
  features: ["ibc-transfer", "ibc-go"],
};
