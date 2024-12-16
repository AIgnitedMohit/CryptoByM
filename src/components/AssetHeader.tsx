import { ExternalLink } from "lucide-react";
import { formatPrice, formatPercent } from "../services/api";

interface AssetHeaderProps {
  asset: {
    name: string;
    symbol: string;
    id: string;
    priceUsd: string;
    changePercent24Hr: string;
  };
}

export const AssetHeader = ({ asset }: AssetHeaderProps) => {
  return (
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
  );
};