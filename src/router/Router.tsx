import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppConfig } from "../AppConfig";
import GlobalLoading from "../components/global-loading/GlobalLoading";
import { Suspense } from "react";
import { ROUTER_BASE } from "./router.constant";
import React from 'react';
import LayoutTemplate from "../components/layout-base/LayoutTemplate";
import AuthGuard from "../guard/AuthGuard";
import { TYPE_MANAGEMENT } from "../interface/constants/type/Type.const";
import GuestGuard from "../guard/GuestGuard";

function RouterRender() {
  return (
    <>
      <BrowserRouter basename={AppConfig.routerBase}>
        <Suspense fallback={<GlobalLoading />}>
          <Routes>
            <Route
              path="*"
              element={<span>404</span>}
            />
            <Route
              path="/layout-guard-roles"
              element={<span>403</span>}
            />

            <Route
              path="/"
              element={
                <Navigate
                  replace
                  to={ROUTER_BASE.systemManagement.path}
                />
              }
            />
            {Object.entries(ROUTER_BASE).map(([key, router]) => (
              React.createElement(Route, { path: router.path, key: router.name, element: (<>
              {router.type === TYPE_MANAGEMENT.AUTH_GUARD ? <>
                <AuthGuard>
                  <LayoutTemplate key={key} title={router.title} breakcrumb={router.breakcrumb}>
                    { React.createElement(router.component) }
                  </LayoutTemplate>
                </AuthGuard>
              </> : <>
                <GuestGuard>
                  <LayoutTemplate key={key} title={router.title} breakcrumb={router.breakcrumb}>
                    { React.createElement(router.component) }
                  </LayoutTemplate>
                </GuestGuard>
              </>}
              </>)})
            ))}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default RouterRender;
