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
    <div className="border-4 border-brutal-black p-6">
      <h2 className="text-2xl font-mono font-bold mb-4">Market Stats</h2>
      <div className="space-y-4">
        <div>
          <p className="text-brutal-gray font-mono">Market Cap</p>
          <p className="text-2xl font-mono">{formatMarketCap(asset.marketCapUsd)}</p>
        </div>
        <div>
          <p className="text-brutal-gray font-mono">24h Volume</p>
          <p className="text-2xl font-mono">{formatMarketCap(asset.volumeUsd24Hr)}</p>
        </div>
        <div>
          <p className="text-brutal-gray font-mono">Supply</p>
          <p className="text-2xl font-mono">
            {parseInt(asset.supply).toLocaleString()} {asset.symbol}
          </p>
        </div>
      </div>
    </div>
  );
};