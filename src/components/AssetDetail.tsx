import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getAssetHistory, getTopAssets, formatPrice, formatMarketCap, formatPercent } from "../services/api";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const AssetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: assets } = useQuery({
    queryKey: ["assets"],
    queryFn: getTopAssets,
  });

  const { data: history } = useQuery({
    queryKey: ["assetHistory", id],
    queryFn: () => getAssetHistory(id!),
    enabled: !!id,
  });

  const asset = assets?.find((a) => a.id === id);

  if (!asset) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-brutal-red text-2xl font-mono">Asset not found</div>
      </div>
    );
  }

  const chartData = history?.map((h) => ({
    time: new Date(h.time).toLocaleDateString(),
    price: parseFloat(h.priceUsd),
  }));

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate("/")}
        className="mb-8 px-6 py-3 font-mono text-lg border-4 border-brutal-black hover:bg-brutal-black hover:text-brutal-white transition-colors"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="border-4 border-brutal-black p-6">
            <h1 className="text-4xl font-mono font-bold mb-2">
              {asset.name} ({asset.symbol})
            </h1>
            <p className="text-6xl font-mono font-bold mb-4">
              {formatPrice(asset.priceUsd)}
            </p>
            <p
              className={`text-2xl font-mono ${
                parseFloat(asset.changePercent24Hr) >= 0
                  ? "text-green-600"
                  : "text-brutal-red"
              }`}
            >
              {formatPercent(asset.changePercent24Hr)} (24h)
            </p>
          </div>

          <div className="border-4 border-brutal-black p-6">
            <h2 className="text-2xl font-mono font-bold mb-4">Market Stats</h2>
            <div className="space-y-4">
              <div>
                <p className="text-brutal-gray font-mono">Market Cap</p>
                <p className="text-2xl font-mono">
                  {formatMarketCap(asset.marketCapUsd)}
                </p>
              </div>
              <div>
                <p className="text-brutal-gray font-mono">24h Volume</p>
                <p className="text-2xl font-mono">
                  {formatMarketCap(asset.volumeUsd24Hr)}
                </p>
              </div>
              <div>
                <p className="text-brutal-gray font-mono">Supply</p>
                <p className="text-2xl font-mono">
                  {parseInt(asset.supply).toLocaleString()} {asset.symbol}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-4 border-brutal-black p-6 h-[500px]">
          <h2 className="text-2xl font-mono font-bold mb-4">Price History</h2>
          {chartData && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="time"
                  stroke="#000000"
                  fontSize={12}
                  fontFamily="Space Mono"
                />
                <YAxis
                  stroke="#000000"
                  fontSize={12}
                  fontFamily="Space Mono"
                  tickFormatter={(value) => `$${value.toFixed(2)}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#000000",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "0px",
                    fontFamily: "Space Mono",
                  }}
                  labelStyle={{ color: "#FFFFFF" }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#FF5252"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};