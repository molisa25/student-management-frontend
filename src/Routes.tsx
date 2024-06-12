import React from "react";
import {Navigate, Outlet, Route, Routes as AppRoutes} from "react-router-dom";
import {PageRoutePaths} from "./types/routes";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import DepartmentPage from "./pages/DepartmentPage";
import Layout from "./Layout";
import CoursePage from "./pages/CoursePage";
import ModulePage from "./pages/ModulePage";
import {useIsAuthenticated} from "./util/authentication";

const ProtectedRoutes = ({isAuthenticated}: { isAuthenticated: boolean }): JSX.Element => {
    if (!isAuthenticated) {
        return <Navigate to={PageRoutePaths.LANDING} replace/>;
    }

    return <Outlet/>;
};

export const Routes = (): JSX.Element => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <Layout>
            <AppRoutes>
                <Route path={PageRoutePaths.LANDING} element={<LandingPage/>}/>
                <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated}/>}>
                    <Route path={PageRoutePaths.HOME} element={<HomePage/>}/>
                    <Route path={PageRoutePaths.DEPARTMENT} element={<DepartmentPage/>}/>
                    <Route path={PageRoutePaths.COURSE} element={<CoursePage/>}/>
                    <Route path={PageRoutePaths.MODULE} element={<ModulePage/>}/>
                </Route>
            </AppRoutes>
        </Layout>
    );
};
