const COINCAP_API_BASE = 'https://api.coincap.io/v2';

export interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

export interface AssetHistory {
  priceUsd: string;
  time: number;
}

export const getTopAssets = async (): Promise<Asset[]> => {
  const response = await fetch(`${COINCAP_API_BASE}/assets?limit=50`);
  const data = await response.json();
  return data.data;
};

export const getAssetHistory = async (id: string): Promise<AssetHistory[]> => {
  const response = await fetch(`${COINCAP_API_BASE}/assets/${id}/history?interval=h1`);
  const data = await response.json();
  return data.data;
};

export const formatPrice = (price: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(price));
};

export const formatMarketCap = (marketCap: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(parseFloat(marketCap));
};

export const formatPercent = (percent: string) => {
  return `${parseFloat(percent).toFixed(2)}%`;
};