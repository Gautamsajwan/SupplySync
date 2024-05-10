"use client";
import React from "react";
import AuthSelection from "@/components/common/cards/AuthSelection";

type Props = {};

function page({}: Props) {
  return (
    <AuthSelection type='signup' />
  );
}

export default page;
