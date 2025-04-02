"use client";

import { useEffect, useRef } from "react";

interface QRCodeProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
}

export default function QRCode({
  value,
  size = 200,
  bgColor = "#ffffff",
  fgColor = "#000000",
}: QRCodeProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      if (!qrRef.current) return;

      try {
        // Dynamically import QRCode library
        const QRCodeStyling = (await import("qr-code-styling")).default;

        const qrCode = new QRCodeStyling({
          width: size,
          height: size,
          type: "svg",
          data: value,
          dotsOptions: {
            color: fgColor,
            type: "rounded",
          },
          backgroundOptions: {
            color: bgColor,
          },
          cornersSquareOptions: {
            type: "extra-rounded",
          },
          cornersDotOptions: {
            type: "dot",
          },
        });

        // Clear previous QR code if any
        if (qrRef.current.firstChild) {
          qrRef.current.removeChild(qrRef.current.firstChild);
        }

        qrCode.append(qrRef.current);
      } catch (error) {
        console.error("Failed to generate QR code:", error);

        // Fallback to text if QR code generation fails
        if (qrRef.current) {
          qrRef.current.innerHTML = `<div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;border:1px dashed #ccc;text-align:center;padding:1rem;">
            <p>Scan QR code to access form</p>
          </div>`;
        }
      }
    };

    void generateQRCode();
  }, [value, size, bgColor, fgColor]);

  return <div ref={qrRef} className="qr-code" />;
}
