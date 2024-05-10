"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { useQRDataStore } from "@/store/QrStore";
import { motion } from "framer-motion";

type qrData = {
  source: string;
  destination: string;
  departureDate: Date;
  temperature: number;
  humidity: number;
  shock: number;
  pressure: number;
  extraInfo: string;
};

type Props = {};

function QRcode({}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const qrData = useQRDataStore((state) => state.qrData);
  const isGenerated = useQRDataStore((state) => state.generated);

  useEffect(() => {
    const generateQr = async (data: qrData) => {
      try {
        const qrData = JSON.stringify(data); // Convert form data to JSON
        await QRCode.toCanvas(canvasRef.current, qrData);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };
    generateQr(qrData);
  }, [qrData]);

  return (
    <div className="w-full h-full font-poppins flex justify-center items-center">
      {isGenerated && (
        <motion.div
          initial={{
            opacity: 0,
            x: 200,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            type: "fade",
          }}
          className="flex flex-col items-center gap-4"
        >
          <div className="overflow-hidden w-fit rounded-2xl">
            <canvas ref={canvasRef} />
          </div>
          <p className="font-semibold text-white text-center">Scan this QR to get the product details</p>
        </motion.div>
      )}
    </div>
  );
}

export default QRcode;
