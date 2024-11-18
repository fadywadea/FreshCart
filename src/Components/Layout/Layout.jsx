import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
// import { Offline } from "react-detect-offline";

const Navbar = React.memo(lazy(() => import("../Navbar/Navbar")));
const Footer = React.memo(lazy(() => import("../Footer/Footer")));

export default function Layout() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <main className="container">
          <Outlet />
        </main>
        <div>
          {/* <Offline>
            <div className="network">
              <i className="fas fa-wifi" aria-hidden="true"></i> You are offline (surprise!)
            </div>
          </Offline> */}
        </div>
        <Footer />
      </Suspense>
    </>
  );
}
