import React, { FC, memo } from "react";
import Link from "next/link";

const LandingPage: FC = memo(() => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-24 md:py-32">
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Pay With Warpcast
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-2xl mx-auto">
            A simple way to receive payments using Warpcast Frames.
          </p>

          <Link
            href="/request"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-10 rounded-full text-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Request Payment
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-800 p-8 rounded-xl">
              <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-4">Enter Amount</h3>
              <p className="text-gray-300">
                Specify how much you want to receive and add your details.
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl">
              <div className="bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-4">Generate QR Code</h3>
              <p className="text-gray-300">
                Create a unique QR code that your customer can scan.
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl">
              <div className="bg-pink-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-4">Get Paid</h3>
              <p className="text-gray-300">
                Receive payment directly to your wallet address.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default LandingPage;
