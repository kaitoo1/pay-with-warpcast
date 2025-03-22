import React, {
  useState,
  useEffect,
  useRef,
  FC,
  memo,
  useCallback,
} from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import Button from "~/components/Button";
import BackButton from "~/components/BackButton";
import { useNavigation } from "~/providers/NavigationContext";

interface QRCodeScannerProps {
  onValidQRCode: (
    amount: string,
    address: string,
    merchantName: string
  ) => void;
}

const QRCodeScanner: FC<QRCodeScannerProps> = memo(({ onValidQRCode }) => {
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

  const startScanner = useCallback(async () => {
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

      const closeUpKeywords = ["ultra"];
      let cameraId = null;
      for (const keyword of closeUpKeywords) {
        const camera = cameras.find((cam) =>
          cam.label.toLowerCase().includes(keyword)
        );
        if (camera) cameraId = camera.deviceId;
      }

      if (!cameraId) {
        const environmentCamera = cameras.find(
          (camera) =>
            // Some browsers provide this label information
            camera.label.toLowerCase().includes("back") ||
            camera.label.toLowerCase().includes("environment")
        );
        if (environmentCamera) cameraId = environmentCamera.deviceId;
      }

      const cameraSetting = cameraId
        ? { deviceId: cameraId }
        : { facingMode: "environment" };

      // Set scanning state before starting
      setScanning(true);

      await scannerRef.current.start(
        cameraSetting,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
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
  }, [scannerRef, scanning, cameraPermissionDenied]);

  const handleQRCodeSuccess = useCallback((decodedText: string) => {
    try {
      console.log("QR Code detected:", decodedText);

      // Check if it's a Warpcast URL
      if (decodedText.includes("warpcast.com/~/frames/launch")) {
        // Extract the URL from the QR code
        const url = new URL(decodedText);
        const amount = url.searchParams.get("amount");
        const address = url.searchParams.get("address");
        const merchantName = url.searchParams.get("merchantName");
        if (amount && address && merchantName) {
          // Stop scanning
          if (scannerRef.current) {
            scannerRef.current.stop().catch(console.error);
            setScanning(false);
          }

          // Call the callback with the extracted parameters
          onValidQRCode(amount, address, merchantName);
          return;
        }
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
  }, []);

  const handleQRCodeError = useCallback((err: unknown) => {
    // This is just for QR scanning errors, not for handling the result
    // We don't want to show these to the user as they happen constantly during scanning
    console.debug("QR scanning error:", err);
  }, []);

  const requestCameraPermission = useCallback(async () => {
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
  }, []);

  const handleRetry = useCallback(() => {
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
  }, [scannerRef, scanning]);

  const { navigateTo } = useNavigation();

  const handleBack = useCallback(() => {
    navigateTo("Home");
  }, [navigateTo]);

  return (
    <div className="flex flex-col items-center justify-between h-full w-full bg-black text-white">
      <div className="w-full mt-8 px-4 text-center flex items-center justify-center">
        <BackButton onClick={handleBack} />
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
            <div className="relative w-[300px] h-[400px]">
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
              Scan to pay
            </p>
          </>
        )}
      </div>
    </div>
  );
});

export default QRCodeScanner;
