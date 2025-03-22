import React, { FC, memo } from "react";

const ProcessingPayment: FC = memo(() => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-24 h-24 mt-12">
        <div className="absolute inset-0 w-full h-full animate-spin rounded-full border-4 border-t-white border-r-white border-b-transparent border-l-transparent opacity-75"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-3xl font-bold animate-pulse">$</span>
        </div>
      </div>
      <p className="text-white text-lg font-medium">Processing Payment...</p>
    </div>
  );
});

export default ProcessingPayment;
