import InventoryInput from "@/components/inputs/InventoryInput";
import { ChevronRight } from "lucide-react";
import React from "react";

type Props = {};

function AddInventory({}: Props) {
  return (
    <div className="w-full min-h-screen flex flex-col gap-4">
      <div className="font-semibold text-blue-400 flex items-center">
        <ChevronRight />
        <p>Add Products to inventory</p>
      </div>
      <InventoryInput />
    </div>
  );
}

export default AddInventory;
