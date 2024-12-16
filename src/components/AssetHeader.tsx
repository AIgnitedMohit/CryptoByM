import { ExternalLink } from "lucide-react";
import { formatPrice, formatPercent } from "../services/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
      <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20 shadow-sm">
          <AvatarImage src={`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`} alt={asset.name} />
          <AvatarFallback className="text-xl font-mono bg-gray-50">{asset.symbol.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-mono tracking-tight">
              {asset.name} 
              <span className="text-gray-500 ml-2">
                {asset.symbol}
              </span>
            </h1>
            <a
              href={`https://${asset.id}.org`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-gray-400 hover:text-brutal-red transition-colors"
              title="Visit official website"
            >
              <ExternalLink size={20} />
            </a>
          </div>
          <p className="text-5xl font-mono font-light tracking-tight">
            {formatPrice(asset.priceUsd)}
          </p>
          <p
            className={`text-xl font-mono ${
              parseFloat(asset.changePercent24Hr) >= 0
                ? "text-green-600"
                : "text-brutal-red"
            }`}
          >
            {formatPercent(asset.changePercent24Hr)} (24h)
          </p>
        </div>
      </div>
    </div>
  );
};