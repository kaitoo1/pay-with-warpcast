import { FC, memo, useMemo } from "react";

type ErrorMessageProps = {
  error: string;
};

const ErrorMessage: FC<ErrorMessageProps> = memo(({ error }) => {
  const errorText = useMemo(() => {
    if (!error) return "Something went wrong";

    if (error.toLowerCase().includes("user rejected the request")) {
      return "Please confirm the transaction to pay.";
    }

    return "Transaction rejected";
  }, [error]);

  return (
    <div className="p-3 text-[#FBC918] rounded text-center text-[#FBC918]">
      {errorText}
    </div>
  );
});

export default ErrorMessage;
