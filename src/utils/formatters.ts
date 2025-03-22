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
