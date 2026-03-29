import React, { useEffect } from "react";
import { SDG_Provider } from "./context/sdg-context";
import { TemplateGenerator_Provider } from "./context/template-context";
import Navigation from "./components/MAIN/Navigation";
import { CSR_Provider } from "./context/csr-context";
import { Category_Provider } from "./context/categorie-context";
import Breadcrumbs from "./components/MAIN/Breadcumbs";
import { Breadcrumb_Provider } from "./context/breadcrumb-context";
import CSROverview from "./pages/csr/CSROverview";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import CategoryIndex from "./pages/category/CategoryIndex";
import CategoryDetails from "./pages/category/CategoryDetails";
import CSRDetails from "./pages/csr/CSRDetails";
import CreateTemplate from "./pages/template/CreateTemplate";
import PrivateRoute from "./router/PrivateRoute";
import { rollen } from "./router/rollen";
import Footer from "./components/MAIN/Footer";
import TemplateBeheren from "./pages/template/TemplateBeheren";
import { Role_Provider } from "./context/roles-context";
import { Access_Template_Provider } from "./context/access-template-context";

function App() {
  return (
    <>
      <Category_Provider>
        <Role_Provider>
          <Access_Template_Provider>
            <TemplateGenerator_Provider>
              <SDG_Provider>
                <CSR_Provider>
                  <Breadcrumb_Provider>
                    <Router>
                      <Navigation />
                      <main>
                        <div className="main-content">
                          <Breadcrumbs />
                          <Routes>
                            <Route
                              path="*"
                              element={<Navigate to="/login" replace />}
                            />
                            <Route path="/login" extact element={<Login />} />
                            <Route
                              path="/categories"
                              extact
                              element={
                                <PrivateRoute
                                  roles={[
                                    rollen.DIRECTIE,
                                    rollen.MANAGEMENT,
                                    rollen.MVO_COORDINATOR,
                                    rollen.STAKEHOLDER,
                                  ]}
                                >
                                  <CategoryIndex />
                                </PrivateRoute>
                              }
                              // element={<CategoryIndex />}
                            />
                            <Route
                              path="/category/:id"
                              extact
                              element={
                                <PrivateRoute
                                  roles={[
                                    rollen.DIRECTIE,
                                    rollen.MANAGEMENT,
                                    rollen.MVO_COORDINATOR,
                                    rollen.STAKEHOLDER,
                                  ]}
                                >
                                  <CategoryDetails />
                                </PrivateRoute>
                              }
                            />
                            <Route
                              path="/roles"
                              extact
                              element={
                                <PrivateRoute
                                  roles={[
                                    rollen.DIRECTIE,
                                    rollen.MANAGEMENT,
                                    rollen.MVO_COORDINATOR,
                                    rollen.STAKEHOLDER,
                                  ]}
                                >
                                  <TemplateBeheren />
                                </PrivateRoute>
                              }
                            />
                            <Route
                              path="/category/:catid/csr/:csrid"
                              extact
                              element={
                                <PrivateRoute
                                  roles={[
                                    rollen.DIRECTIE,
                                    rollen.MANAGEMENT,
                                    rollen.MVO_COORDINATOR,
                                    rollen.STAKEHOLDER,
                                  ]}
                                >
                                  <CSRDetails />
                                </PrivateRoute>
                              }
                            />
                            <Route
                              path="/csr/all"
                              extact
                              element={
                                <PrivateRoute
                                  roles={[
                                    rollen.DIRECTIE,
                                    rollen.MANAGEMENT,
                                    rollen.MVO_COORDINATOR,
                                    rollen.STAKEHOLDER,
                                  ]}
                                >
                                  <CSROverview />
                                </PrivateRoute>
                              }
                            />
                            <Route
                              path="/template/create"
                              extact
                              element={
                                <PrivateRoute roles={[rollen.MVO_COORDINATOR]}>
                                  <CreateTemplate />
                                </PrivateRoute>
                              }
                            />

                            {/* <Login /> */}
                            {/* <Redirect to="house" /> */}
                            {/* </Route> */}
                          </Routes>
                        </div>
                      </main>
                      <Footer />
                    </Router>
                  </Breadcrumb_Provider>
                  {/* </FluviusRouter> */}
                </CSR_Provider>
              </SDG_Provider>
            </TemplateGenerator_Provider>
          </Access_Template_Provider>
        </Role_Provider>
      </Category_Provider>
      {/* </User_Provider> */}
    </>
  );
}

export default App;
