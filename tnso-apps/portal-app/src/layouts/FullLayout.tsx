/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import Header from "./header/Header";
import Sidebar from "./sidebars/vertical/Sidebar";

import { Outlet, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Logo } from "./logo/Logo";

import { store } from "../store/StoreMobx";
import { observer } from "mobx-react";

export const FullLayout: React.FC = () => {
  const toggleMiniSidebar = store.customizer.isMiniSidebar;
  const showMobileSidebar = store.customizer.isMobileSidebar;
  const topbarFixed = store.customizer.isTopbarFixed;

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [token, navigate]);

  return (
    <main>
      <div className={`pageWrapper d-md-block d-lg-flex ${toggleMiniSidebar ? "isMiniSidebar" : ""}`}>
        <aside className={`sidebarArea ${showMobileSidebar ? "sidebarArea-open" : ""}`}>
          <div className="logo-tns-mobile">
            <Logo />
          </div>
          <Sidebar />
        </aside>
        <div className={`contentArea ${topbarFixed ? "fixedTopbar" : ""}`}>
          <Header />
          <Container fluid className={`p-2 ${toggleMiniSidebar ? "boxContainerMini" : "boxContainer"}`}>
            <div>
              <Outlet />
            </div>
            {showMobileSidebar ? <div className="sidebarOverlay" /> : ""}
          </Container>
        </div>
      </div>
    </main>
  );
};

export default observer(FullLayout);
