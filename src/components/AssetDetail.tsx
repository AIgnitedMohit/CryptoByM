import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getAssetHistory, getTopAssets } from "../services/api";
import { useState } from "react";
import { AssetHeader } from "./AssetHeader";
import { AssetStats } from "./AssetStats";
import { PriceChart } from "./PriceChart";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/")}
          className="mb-8 px-6 py-2 text-sm font-mono text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
        >
          ← Back to list
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <AssetHeader asset={asset} />
            <AssetStats asset={asset} />
          </div>
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
            <PriceChart
              chartType={chartType}
              setChartType={setChartType}
              chartData={chartData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};