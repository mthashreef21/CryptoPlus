import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../Features/CryptoSlice";

function SearchBar() {
  const dispatch = useDispatch();

  const searchTerm = useSelector(
    (state) => state.crypto.searchTerm
  );

  return (
    <div className="relative w-full">
      <FaSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search Cryptocurrency..."
        value={searchTerm}
        onChange={(e) =>
          dispatch(setSearchTerm(e.target.value))
        }
        className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;