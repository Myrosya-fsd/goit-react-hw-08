import css from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppBar from "../../components/AppBar/AppBar";
import Loader from "../../components/Loader/Loader";
import RestrictedRoute from "../../components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, lazy, useEffect } from "react";

const HomePage = lazy(() => import("../../pages/HomePage"));
const LoginPage = lazy(() => import("../../pages/LoginPage"));
const RegistrationPage = lazy(() => import("../../pages/RegistrationPage"));
const ContactsPage = lazy(() => import("../../pages/ContactsPage"));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader />;
  }

  const routes = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    LOGOUT: "/logout",
    CONTACTS: "/contacts",
  };

  return (
    <div className={css.wrapper}>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={routes.HOME}>
            <Route index element={<HomePage />} />
            <Route
              path={routes.LOGIN}
              element={
                <RestrictedRoute>
                  <LoginPage />
                </RestrictedRoute>
              }
            />
            <Route
              path={routes.REGISTER}
              element={
                <RestrictedRoute>
                  <RegistrationPage />
                </RestrictedRoute>
              }
            />
            <Route
              path={routes.CONTACTS}
              element={
                <PrivateRoute>
                  <ContactsPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
