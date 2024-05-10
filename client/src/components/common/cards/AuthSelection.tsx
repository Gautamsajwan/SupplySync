"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import studentAnimation from "@/lottie/Animation - 1712640254392.json";
import employeeAnimation from "@/lottie/Animation - 1712641329032.json";
import Link from "next/link";
import { ScanFace } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/AuthStore";
import { useRouter } from "next/navigation";

type Props = {
  type: string;
};

function AuthSelection({ type }: Props) {
  const router = useRouter();
  const { token, setRole } = useAuthStore(state => state)
  useEffect(() => {
    if(token) {
      router.push('/')
    }
  }, [token])
  
  return (
    <div className="font-poppins relative w-full mx-auto min-h-screen">
      <AnimatePresence>
        <motion.div
          initial={{
            opacity: 0,
            scale: 1.5,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.5,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            type: "fade",
          }}
          className="w-screen h-screen fixed top-0 left-0 "
        >
          <div className="w-full h-full p-4 relative flex justify-center items-center">
            <div className="bg-gray-500 p-4 flex flex-col gap-4 items-center rounded-3xl">
              <div className="w-full p-2 border-[3px] border-dashed flex gap-2 justify-center items-center rounded-2xl bg-gray-50">
                <ScanFace className="w-7 sm:w-10" />
                <h2 className="font-bold text- sm:text-2xl z-20">
                  Choose Your <span className="text-orange-500">Role</span>
                </h2>
              </div>
              <section className="w-[270px] sm:w-[600px] h-fit sm:h-[420px] flex flex-col sm:flex-row gap-4 z-10">
                <div className="w-full sm:w-1/2 sm:pb-4 bg-black/80 flex flex-col rounded-2xl overflow-hidden items-center">
                  <div className="relative w-full h-[160px] sm:h-[300px] bg-yellow-200 ">
                    <Lottie
                      className="w-full h-full absolute -bottom-6 sm:-bottom-12"
                      animationData={studentAnimation}
                    />
                  </div>
                  <Link
                    href={`${
                      type === "login"
                        ? "/login/manufacturer"
                        : "/signup/manufacturer"
                    }`}
                    className="w-full z-10"
                  >
                    <button onClick={() => setRole('manufacturer')} className="bg-orange-500 text-sm sm:text-base text-white font-semibold p-3 w-full mt-0">
                      {type === "login" ? "Manufacturer Login" : "Manufacturer Signup"}
                    </button>
                  </Link>
                  <p className="hidden sm:block text-sm font-semibold text-white mx-5 mt-2 text-center">
                    set specifically tailored conditions for the product
                  </p>
                </div>

                <div className="w-[270px] sm:w-1/2 sm:pb-4 bg-black/80 flex flex-col rounded-2xl overflow-hidden items-center">
                  <div className="relative w-full h-[160px] sm:h-[300px] bg-blue-300 ">
                    <Lottie
                      className="w-full h-full absolute -bottom-2 sm:-bottom-8"
                      animationData={employeeAnimation}
                    />
                  </div>
                  <Link
                    href={`${
                      type === "login"
                        ? "/login/retailer"
                        : "/signup/retailer"
                    }`}
                    className="w-full z-10"
                  >
                    <button onClick={() => setRole('retailer')} className="bg-orange-500 text-sm sm:text-base text-white font-semibold p-3 w-full mt-0">
                      {type === "login" ? "Retailer Login" : "Retailer Signup"}
                    </button>
                  </Link>
                  <p className="hidden sm:block text-sm font-semibold text-white mx-5 mt-2 text-center">
                    set the product details and leave everything upto us
                  </p>
                </div>
              </section>
              <Link href={type === "login" ? "/signup" : "/login"} className="w-full">
                <Button
                  variant="ghost"
                  className="text-base w-full bg-blue-300 hover:bg-indigo-300 rounded-2xl h-12 sm:h-14"
                >
                  {type === "login" ? "New to Supply-Sync" : "Already a user"}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default AuthSelection;
