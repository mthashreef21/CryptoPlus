export const getCurrencySymbol = (currency) => {
  switch (currency) {
    case "usd":
      return "$";
    case "inr":
      return "₹";
    case "eur":
      return "€";
    default:
      return "$";
  }
};