import { useQuery } from "@tanstack/react-query";
import { getTopAssets, formatPrice, formatMarketCap, formatPercent } from "../services/api";
import { useNavigate } from "react-router-dom";

export const AssetsList = () => {
  const navigate = useNavigate();
  const { data: assets, isLoading, error } = useQuery({
    queryKey: ["assets"],
    queryFn: getTopAssets,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl font-mono font-bold animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-brutal-red text-2xl font-mono">
          Error loading assets
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b-4 border-brutal-black">
              <th className="p-4 font-mono text-lg">#</th>
              <th className="p-4 font-mono text-lg">Name</th>
              <th className="p-4 font-mono text-lg">Price</th>
              <th className="p-4 font-mono text-lg">24h %</th>
              <th className="p-4 font-mono text-lg">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {assets?.map((asset) => (
              <tr
                key={asset.id}
                onClick={() => navigate(`/asset/${asset.id}`)}
                className="border-b-2 border-brutal-gray/20 hover:bg-brutal-black hover:text-brutal-white transition-colors cursor-pointer"
              >
                <td className="p-4 font-mono">{asset.rank}</td>
                <td className="p-4">
                  <div className="flex items-center">
                    <span className="font-mono font-bold">{asset.name}</span>
                    <span className="ml-2 text-brutal-gray font-mono">
                      {asset.symbol}
                    </span>
                  </div>
                </td>
                <td className="p-4 font-mono">{formatPrice(asset.priceUsd)}</td>
                <td className="p-4 font-mono">
                  <span
                    className={
                      parseFloat(asset.changePercent24Hr) >= 0
                        ? "text-green-600"
                        : "text-brutal-red"
                    }
                  >
                    {formatPercent(asset.changePercent24Hr)}
                  </span>
                </td>
                <td className="p-4 font-mono">
                  {formatMarketCap(asset.marketCapUsd)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};