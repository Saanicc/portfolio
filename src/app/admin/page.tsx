"use client";

import React from "react";
import { AdminPanel } from "@/components/AdminPanel/AdminPanel";

const AdminPage = () => {
  return (
    <>
      <div className="fixed min-h-dvh inset-0 -z-10 w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,hsl(var(--accent))_100%)]"></div>

      <div className="flex flex-col items-center justify-center mt-10 mb-10">
        <AdminPanel />
      </div>
    </>
  );
};

export default AdminPage;
