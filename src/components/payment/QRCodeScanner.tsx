import React, { useState, useEffect, useRef } from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import Button from "~/components/Button";

interface QRCodeScannerProps {
  onValidQRCode: (amount: string, address: string) => void;
}

export default function QRCodeScanner({ onValidQRCode }: QRCodeScannerProps) {
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = "qr-reader";

  // Initialize scanner only once
  useEffect(() => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode(scannerContainerId);
      setIsInitialized(true);
    }

    // Cleanup on unmount
    return () => {
      if (scannerRef.current) {
        if (
          scannerRef.current.getState() === Html5QrcodeScannerState.SCANNING
        ) {
          scannerRef.current.stop().catch((err) => {
            console.error("Error stopping scanner:", err);
          });
        }
        scannerRef.current = null;
      }
    };
  }, []);

  // Start scanner after initialization
  useEffect(() => {
    if (isInitialized && !scanning && !cameraPermissionDenied) {
      startScanner();
    }
  }, [isInitialized, scanning, cameraPermissionDenied]);

  const startScanner = async () => {
    if (!scannerRef.current || scanning) return;

    // Reset error state
    setError(null);

    try {
      // First check if we have camera permission
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");

      if (cameras.length === 0) {
        setError("No camera found on this device.");
        return;
      }

      // Set scanning state before starting
      setScanning(true);

      await scannerRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        handleQRCodeSuccess,
        handleQRCodeError
      );
    } catch (err) {
      console.error("Error starting scanner:", err);

      // Check if it's a permission error
      if (
        err instanceof Error &&
        (err.name === "NotAllowedError" ||
          err.message.includes("permission") ||
          err.message.includes("Permission"))
      ) {
        setCameraPermissionDenied(true);
        setError("Camera access denied. Please grant camera permissions.");
      } else {
        setError("Could not start camera. Please try again.");
      }

      setScanning(false);
    }
  };

  const [url, setUrl] = useState<string | null>(null);

  const handleQRCodeSuccess = (decodedText: string) => {
    try {
      console.log("QR Code detected:", decodedText);

      // Check if it's a Warpcast URL
      if (decodedText.includes("warpcast.com/~/frames/launch")) {
        // Extract the URL from the QR code
        const url = new URL(decodedText);

        setUrl(url);
        // Get the domain parameter which contains our app URL with params
        // const domainParam = url.searchParams.get("domain");

        // if (domainParam) {
        // Parse the domain URL to extract our parameters
        //   const appUrl = new URL(domainParam);
        const amount = url.searchParams.get("amount");
        const address = url.searchParams.get("address");

        if (amount && address) {
          // Stop scanning
          if (scannerRef.current) {
            scannerRef.current.stop().catch(console.error);
            setScanning(false);
          }

          // Call the callback with the extracted parameters
          onValidQRCode(amount, address);
          return;
        }
        // }
      }

      // If we get here, the QR code wasn't in the expected format
      setError("Invalid QR code. Please scan a valid Warpcast payment code.");

      // Continue scanning
      setTimeout(() => {
        setError(null);
      }, 3000);
    } catch (err) {
      console.error("Error processing QR code:", err);
      setError("Error processing QR code. Please try again.");

      // Continue scanning
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const handleQRCodeError = (err: unknown) => {
    // This is just for QR scanning errors, not for handling the result
    // We don't want to show these to the user as they happen constantly during scanning
    console.debug("QR scanning error:", err);
  };

  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraPermissionDenied(false);
      // startScanner will be called by the useEffect
    } catch (err) {
      console.error("Failed to get camera permission:", err);
      setCameraPermissionDenied(true);
      setError(
        "Camera access denied. Please grant camera permissions in your browser settings."
      );
    }
  };

  const handleRetry = () => {
    if (
      scannerRef.current &&
      scannerRef.current.getState() === Html5QrcodeScannerState.SCANNING
    ) {
      scannerRef.current.stop().catch(console.error);
    }
    setScanning(false);
    setError(null);
    setCameraPermissionDenied(false);
    // The useEffect will trigger startScanner
  };

  return (
    <div className="flex flex-col items-center justify-between h-full w-full bg-black text-white">
      <div className="w-full pt-8 pb-4 text-center">
        <h1 className="text-2xl font-bold">Scan QR Code</h1>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center w-full px-6">
        {cameraPermissionDenied ? (
          <div className="text-center space-y-4">
            <p>Camera access is required to scan QR codes.</p>
            <Button
              onClick={requestCameraPermission}
              className="bg-white text-black hover:bg-gray-200"
            >
              Grant Camera Access
            </Button>
          </div>
        ) : error && error.includes("Could not start camera") ? (
          <div className="text-center space-y-4">
            <p>{error}</p>
            <Button
              onClick={handleRetry}
              className="bg-white text-black hover:bg-gray-200"
            >
              Retry
            </Button>
          </div>
        ) : (
          <>
            <div className="relative w-[300px] h-[300px]">
              <div
                id={scannerContainerId}
                className="w-full h-full overflow-hidden"
                style={{
                  position: "relative",
                  aspectRatio: "1/1",
                }}
              ></div>
              {/* Square overlay with rounded corners */}
              <div className="absolute inset-0 border-2 border-white rounded-lg pointer-events-none"></div>

              {/* Corner markers for visual guidance */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white rounded-br-lg"></div>
            </div>

            {error && (
              <div className="mt-6 p-3 bg-red-900 text-white rounded text-center max-w-xs">
                {error}
              </div>
            )}

            <p className="mt-6 text-center text-gray-400 max-w-xs">
              Align QR code within the square
              {url && <span className="text-white">{url.toString()}</span>}
            </p>
          </>
        )}
      </div>

      <div className="w-full px-6 pb-8">{/* Footer space */}</div>
    </div>
  );
}
