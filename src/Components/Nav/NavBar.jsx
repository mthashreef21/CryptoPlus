import CurrencyDropDown from "./CurrencyDropDown"
import SearchBar from "./SearchBar"


function NavBar() {
  return (
    <nav className="w-full bg-white shadow-md rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
            <CurrencyDropDown/>
            <SearchBar/>
        </div>
    </nav>
  )
}

export default NavBar