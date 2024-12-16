import { useQuery } from "@tanstack/react-query";
import { getTopAssets, formatPrice, formatMarketCap, formatPercent } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const AssetsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: assets, isLoading, error } = useQuery({
    queryKey: ["assets"],
    queryFn: getTopAssets,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const filteredAssets = assets?.filter((asset) =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search by name or symbol..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md font-mono border-4 border-brutal-black focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
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
            {filteredAssets?.map((asset) => (
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