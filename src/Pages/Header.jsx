import { Bitcoin } from "lucide-react";

function Header() {
  return (
    <header className="bg-white shadow-md rounded-2xl px-8 py-5 mb-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="bg-blue-600 p-3 rounded-xl">
          <Bitcoin className="text-white w-8 h-8" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            CryptoPulse
          </h1>

          <p className="text-gray-500 text-sm">
            Real-Time Cryptocurrency Dashboard
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;