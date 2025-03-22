/**
 * Formats a numeric amount for display
 * @param amount The amount to format (can be string or number)
 * @returns Formatted amount string
 */
export function formatDisplayAmount(
  amount: string | number | undefined
): string {
  if (amount === undefined || amount === null || amount === "") {
    return "0";
  }

  // Convert to number
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  // Check if it's a valid number
  if (isNaN(numAmount)) {
    return "0";
  }

  // Format with commas and up to 2 decimal places
  return numAmount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

// const formatDisplayAmount = useCallback((value: string) => {
//     // Remove leading zeros
//     const cleanValue = value.replace(/^0+(?=\d)/, "");

//     // If it's empty or just "0", return "$0"
//     if (!cleanValue || cleanValue === "0") return "$0";

//     // Split the number into integer and decimal parts
//     const parts = cleanValue.split(".");
//     const integerPart = parts[0];
//     const decimalPart = parts.length > 1 ? "." + parts[1] : "";

//     // Add commas to the integer part
//     const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

//     // Combine integer and decimal parts with dollar sign
//     return "$" + formattedInteger + decimalPart;
//   }, []);
