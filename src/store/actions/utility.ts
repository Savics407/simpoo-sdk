export function formatToCurrency(
  value: number,
  currency = "NGN",
  locale = "en-NG"
) {
  if (isNaN(value)) {
    value = 0; // Set NaN values to 0
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });

  return formatter.format(value);
}

export function addCommasToNumber(number: number | null = 0) {
  if (number === null || number === undefined) return "0";

  if (!isNaN(number)) {
    const [integerPart, decimalPart] = number.toString().split(".");
    const withCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimalPart ? `${withCommas}.${decimalPart}` : withCommas;
  } else {
    return "0";
  }
}
