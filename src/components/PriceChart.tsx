import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PriceChartProps {
  chartType: string;
  setChartType: (type: string) => void;
  chartData: any[];
}

export const PriceChart = ({ chartType, setChartType, chartData }: PriceChartProps) => {
  const commonProps = {
    data: chartData,
    margin: { top: 5, right: 20, bottom: 5, left: 0 },
  };

  const commonAxisProps = {
    stroke: "#000000",
    fontSize: 12,
    fontFamily: "Space Mono",
  };

  const commonTooltipStyle = {
    contentStyle: {
      backgroundColor: "#000000",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "0px",
      fontFamily: "Space Mono",
    },
    labelStyle: { color: "#FFFFFF" },
  };

  const renderChart = () => {
    switch (chartType) {
      case "area":
        return (
          <AreaChart {...commonProps}>
            <XAxis dataKey="time" {...commonAxisProps} />
            <YAxis {...commonAxisProps} tickFormatter={(value) => `$${value.toFixed(2)}`} />
            <Tooltip {...commonTooltipStyle} />
            <Area type="monotone" dataKey="price" stroke="#FF5252" fill="#FF5252" fillOpacity={0.2} />
          </AreaChart>
        );
      case "bar":
        return (
          <BarChart {...commonProps}>
            <XAxis dataKey="time" {...commonAxisProps} />
            <YAxis {...commonAxisProps} tickFormatter={(value) => `$${value.toFixed(2)}`} />
            <Tooltip {...commonTooltipStyle} />
            <Bar dataKey="price" fill="#FF5252" />
          </BarChart>
        );
      default:
        return (
          <LineChart {...commonProps}>
            <XAxis dataKey="time" {...commonAxisProps} />
            <YAxis {...commonAxisProps} tickFormatter={(value) => `$${value.toFixed(2)}`} />
            <Tooltip {...commonTooltipStyle} />
            <Line type="monotone" dataKey="price" stroke="#FF5252" strokeWidth={2} dot={false} />
          </LineChart>
        );
    }
  };

  return (
    <div className="border-4 border-brutal-black p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-mono font-bold">Price History</h2>
        <RadioGroup value={chartType} onValueChange={setChartType} className="flex space-x-4">
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
  );
};