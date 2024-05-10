"use client";
import ManufacturerDashboard from "@/components/dashboard/Dashboard";
import useAuthStore from "@/store/AuthStore";
import React from "react";

type Props = {};

function Page({}: Props) {
  const { userData } = useAuthStore((state) => state);
  return (
    <div>
      <ManufacturerDashboard />
    </div>
  );
}

export default Page;
