import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppConfig } from "../AppConfig";
import GlobalLoading from "../components/global-loading/GlobalLoading";
import { Suspense } from "react";
import AuthGuard from "../guard/AuthGuard";
import LayoutTemplate from "../components/layout-base/LayoutTemplate";
import SystemManagementIndex from "../pages/systemManagement";
import { ROUTER_BASE } from "./router.constant";

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

            <Route
              path={ROUTER_BASE.systemManagement.path}
              element={
                <AuthGuard>
                  <LayoutTemplate>
                    <SystemManagementIndex />
                  </LayoutTemplate>
                </AuthGuard>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default RouterRender;
