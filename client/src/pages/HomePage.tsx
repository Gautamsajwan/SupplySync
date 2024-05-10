"use client";
import InventoryInput from "@/components/inputs/InventoryInput";
import PlaceOrder from "@/components/inputs/PlaceOrder";
import ProductInput from "@/components/inputs/ProductInput";
import QRcode from "@/components/inputs/QRcode";
import useAuthStore from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AddInventory from "./AddInventory";

type Props = {};

function HomePage({}: Props) {
  const { userData, token } = useAuthStore(state => state);
  const router = useRouter();

  useEffect(() => {
    if(token === null || token === undefined)
      router.push('/login')
  }, [token])

  return (
    <main className="p-4 pb-7 flex max-w-7xl gap-7 mx-auto">
      {userData && userData.role === "manufacturer" ? (
        <>
          <AddInventory />
        </>
      ) : (
        <>
          <PlaceOrder />
        </>
      )}
    </main>
  );
}

export default HomePage;
