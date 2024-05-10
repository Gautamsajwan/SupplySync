import Navbar from "@/components/common/ui/Navbar";
import React, { ReactNode } from "react";

type Props = {
    children: ReactNode
};

function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default Layout;
