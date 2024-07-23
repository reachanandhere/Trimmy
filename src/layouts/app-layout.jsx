import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />
        {<Outlet />}
      </main>
      <div>
        <footer className="py-4 text-center bg-gray-500 text-sm">
          <p>Made with Love by Anand Verma </p>
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;
