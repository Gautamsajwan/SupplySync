"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../../ui/button";
import useAuthStore from "@/store/AuthStore";
import { Bell, UserCircle, LogOut, Home, ChevronDownIcon, LineChart } from "lucide-react";
import { useRouter } from "next/navigation";
type Props = {};

function Navbar({}: Props) {
  const router = useRouter();
  const [modal, setModal] = useState<boolean>(false);
  const { token, setToken, setUserData } = useAuthStore((state) => state);

  const toggleModel = () => {
    setModal((prev) => !prev);
  };

  const handleLogout = () => {
    setToken(null);
    setUserData(null);
    setModal(false);

    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    router.push('/login')
  };

  const notificationRef = useRef<HTMLButtonElement>(null);

  return (
    <nav className="font-poppins max-w-7xl mx-auto relative">
      <div className="h-[60px] px-5 py-10 flex justify-between items-center z-20">
        <Link href="/">
          <h1 className="font-bold text-3xl text-white">Supply Sync.</h1>
        </Link>

        {token ? (
          <section className="flex gap-4 items-center">
            <button
              onClick={() => notificationRef?.current?.click()}
              className="bg-yellow-200 w-10 h-10 flex justify-center items-center rounded-full"
            >
              <Bell className="text-orange-500" />
            </button>
            <div onClick={toggleModel} className="flex gap-1 items-center">
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <button>
                {" "}
                <ChevronDownIcon
                  className={`w-5 h-5 text-white ${
                    modal && "rotate-180"
                  } transition-transform duration-300`}
                />{" "}
              </button>
            </div>
          </section>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button className="py-[22px] px-5 text-base rounded-full bg-blue-400 hover:bg-blue-500 hover:shadow-lg transition-shadow duration-300">
                Log in
              </Button>
            </Link>

            <Link href="/signup">
              <Button
                variant="outline"
                className="py-[22px] px-5 text-base rounded-full hover:bg-gray-50 hover:shadow-lg transition-shadow duration-300"
              >
                Join Free
              </Button>
            </Link>
          </div>
        )}

        {modal && (
          <motion.div
            initial={{
              y: 7,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0,
              type: "spring",
            }}
            className="absolute flex flex-col top-full right-1 p-2 rounded-xl shadow-lg bg-gray-50 border gap-1.5 sm:gap-2 z-20 transition-all duration-500 ease-in-out"
          >
            <Link href="/">
              <button className="navButton rounded-lg">
                <Home className="text-indigo-500" /> Home
              </button>
            </Link>
            <Link href="/manufacturer/dashboard">
              <button className="navButton rounded-lg">
                <LineChart className="text-green-500" />
                Dashboard
              </button>
            </Link>
            <Link href="/user/account">
              <button className="navButton rounded-lg">
                <UserCircle className="text-blue-500" /> My Profile
              </button>
            </Link>
            <button onClick={handleLogout} className="navButton rounded-lg">
              <LogOut className="text-red-500" />
              Logout
            </button>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
