"use client";
import { create } from "zustand";

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

type QRDataStore = {
  qrData: qrData;
  setQRData: (data: qrData) => void;
  generated: boolean;
};

const initialState = {
  qrData: {
    source: "dehradun",
    destination: "delhi",
    departureDate: new Date(),
    temperature: 25,
    humidity: 24,
    shock: 32,
    pressure: 50,
    extraInfo: "handle with care",
  },
  generated: true,
};

export const useQRDataStore = create<QRDataStore>((set) => ({
  ...initialState,
  setQRData: (data: qrData) => {
    set((state) => ({
      qrData: data,
      generated: true,
    }));
  },
}));
