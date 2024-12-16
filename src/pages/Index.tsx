import { AssetsList } from "../components/AssetsList";

const Index = () => {
  return (
    <div className="min-h-screen bg-brutal-white">
      <div className="container mx-auto py-8">
        <h1 className="text-5xl font-mono font-bold mb-8 px-4">
          Crypto Assets
        </h1>
        <AssetsList />
      </div>
    </div>
  );
};

export default Index;