import { useMemo } from "react";

type ErrorMessageProps = {
  error: string;
};

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  const errorText = useMemo(() => {
    if (!error) return "Something went wrong";

    if (error.toLowerCase().includes("user rejected the request")) {
      return "Please confirm the transaction to pay.";
    }

    return "Transaction rejected";
  }, [error]);

  return (
    <div className="p-3 text-white rounded text-center text-[#FBC918]">
      {errorText}
    </div>
  );
};

export default ErrorMessage;
