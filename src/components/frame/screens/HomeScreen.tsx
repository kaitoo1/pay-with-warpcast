import React, { FC, useCallback, useEffect, useMemo } from "react";
import { useNavigation } from "~/providers/NavigationContext";
import Button from "~/components/Button";

const HomeScreen: FC = () => {
  const { navigateTo } = useNavigation();

  // Check URL parameters on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const amount = searchParams.get("amount");
    const address = searchParams.get("address");
    const merchantName = searchParams.get("merchantName");

    // If all required parameters are present, navigate to SendPayment
    if (amount && address && merchantName) {
      navigateTo("SendPayment");
    }
  }, [navigateTo]);

  const handleRequestPayment = useCallback(() => {
    navigateTo("RequestPayment");
  }, [navigateTo]);

  const handleSendPayment = useCallback(() => {
    navigateTo("SendPayment");
  }, [navigateTo]);

  const handleAbout = useCallback(() => {
    navigateTo("About");
  }, [navigateTo]);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="flex flex-col items-center justify-between h-screen w-full bg-black text-white p-6">
      <div className="w-full pt-8 text-center">
        <h1 className="text-3xl font-bold">Pay With Warpcast</h1>
      </div>

      <div className="w-full max-w-md space-y-6">
        <Button
          onClick={handleRequestPayment}
          className="w-full bg-transparent border border-white text-white py-4 rounded-xl font-medium hover:bg-gray-900"
        >
          Request
        </Button>

        <Button
          onClick={handleSendPayment}
          className="w-full bg-transparent border border-white text-white py-4 rounded-xl font-medium hover:bg-gray-900"
        >
          Pay
        </Button>

        <Button
          onClick={handleAbout}
          className="w-full bg-transparent text-gray-400 py-4 rounded-xl font-medium hover:text-white"
        >
          <div className="flex items-center justify-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            <span>About</span>
          </div>
        </Button>
      </div>

      <div className="flex flex-col w-full pb-8 text-center text-gray-500 text-sm space-y-2">
        <p className="text-xs text-gray-500 text-center mt-4 px-4">
          This app is a demo. Please use at your own risk. The open source code
          is viewable{" "}
          <a
            href="https://github.com/kaitodot/pay-with-warpcast"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            here
          </a>
          .
        </p>
        <p>© {year} Pay With Warpcast</p>
      </div>
    </div>
  );
};

export default HomeScreen;
