import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getAssetHistory, getTopAssets, formatPrice, formatMarketCap, formatPercent } from "../services/api";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

export const AssetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chartType, setChartType] = useState("line");

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

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 20, bottom: 5, left: 0 },
    };

    const commonAxisProps = {
      stroke: "#000000",
      fontSize: 12,
      fontFamily: "Space Mono",
    };

    switch (chartType) {
      case "area":
        return (
          <AreaChart {...commonProps}>
            <XAxis dataKey="time" {...commonAxisProps} />
            <YAxis {...commonAxisProps} tickFormatter={(value) => `$${value.toFixed(2)}`} />
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
            <Area type="monotone" dataKey="price" stroke="#FF5252" fill="#FF5252" fillOpacity={0.2} />
          </AreaChart>
        );
      case "bar":
        return (
          <BarChart {...commonProps}>
            <XAxis dataKey="time" {...commonAxisProps} />
            <YAxis {...commonAxisProps} tickFormatter={(value) => `$${value.toFixed(2)}`} />
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
            <Bar dataKey="price" fill="#FF5252" />
          </BarChart>
        );
      default:
        return (
          <LineChart {...commonProps}>
            <XAxis dataKey="time" {...commonAxisProps} />
            <YAxis {...commonAxisProps} tickFormatter={(value) => `$${value.toFixed(2)}`} />
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
            <Line type="monotone" dataKey="price" stroke="#FF5252" strokeWidth={2} dot={false} />
          </LineChart>
        );
    }
  };

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
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-mono font-bold mb-2">
                {asset.name} ({asset.symbol})
              </h1>
              <a
                href={`https://${asset.id}.org`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:text-brutal-red transition-colors"
                title="Visit official website"
              >
                <ExternalLink size={24} />
              </a>
            </div>
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

        <div className="border-4 border-brutal-black p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-mono font-bold">Price History</h2>
            <RadioGroup
              value={chartType}
              onValueChange={setChartType}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="line" id="line" />
                <Label htmlFor="line" className="font-mono">Line</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="area" id="area" />
                <Label htmlFor="area" className="font-mono">Area</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bar" id="bar" />
                <Label htmlFor="bar" className="font-mono">Bar</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="h-[450px]">
            {chartData && (
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};