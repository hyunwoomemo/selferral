"use client";

import { useRouter } from "next/navigation";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
      {/* dim */}
      <div onClick={() => router.back()} style={{ backgroundColor: "rgba(0,0,0,0.3)", height: "100%", width: "100%" }}></div>
      {children}
    </div>
  );
};

export default Layout;
