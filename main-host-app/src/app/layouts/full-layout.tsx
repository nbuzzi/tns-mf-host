/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Header from './header/header';
import Sidebar from './sidebars/sidebar-component';

import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Logo } from '../../assets/logo/Logo';

import { observer } from 'mobx-react';

function FullLayout(): JSX.Element {
  const toggleMiniSidebar = false;
  const showMobileSidebar = false;

  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/auth/login');
    }
  }, [token, navigate]);

  return (
    <main>
      <div
        className={`pageWrapper d-md-block d-lg-flex ${
          toggleMiniSidebar ? 'isMiniSidebar' : ''
        }`}
      >
        <aside className="sidebarArea position-fixed m-0">
          <div className="logo-tns-mobile">
            <Logo />
          </div>
          <Sidebar />
        </aside>
        <div className="contentArea fixedTopbar ">
          <Header />
          <Container
            fluid
            className={`p-2 ${
              toggleMiniSidebar ? 'boxContainerMini' : 'boxContainer'
            }`}
          >
            <div>
              <Outlet />
            </div>
            {showMobileSidebar ? <div className="sidebarOverlay" /> : ''}
          </Container>
        </div>
      </div>
    </main>
  );
}

export default observer(FullLayout);
