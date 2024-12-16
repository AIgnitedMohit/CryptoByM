import { formatMarketCap } from "../services/api";

interface AssetStatsProps {
  asset: {
    marketCapUsd: string;
    volumeUsd24Hr: string;
    supply: string;
    symbol: string;
  };
}

export const AssetStats = ({ asset }: AssetStatsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
      <h2 className="text-xl font-mono mb-6 text-gray-700">Market Statistics</h2>
      <div className="grid gap-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 font-mono mb-1">Market Cap</p>
          <p className="text-xl font-mono">{formatMarketCap(asset.marketCapUsd)}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 font-mono mb-1">24h Volume</p>
          <p className="text-xl font-mono">{formatMarketCap(asset.volumeUsd24Hr)}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 font-mono mb-1">Supply</p>
          <p className="text-xl font-mono">
            {parseInt(asset.supply).toLocaleString()} {asset.symbol}
          </p>
        </div>
      </div>
    </div>
  );
};