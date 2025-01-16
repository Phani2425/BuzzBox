import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import RouteProtector from "./Components/ProtectedRoute/RouteProtector";
import PageNotFound from "./Components/Shared/PagerNotFound";
import Loaders from "./Components/Shared/Loaders";
import AdminLogin from "../src/pages/Admin/AdminLogin";
import AdminDashboard from "../src/pages/Admin/AdminDashboard";
import Users from "../src/Components/Admin/Users";
import Groups from "../src/Components/Admin/Groups";
import Messages from "../src/Components/Admin/Messages";
import Settings from "../src/Components/Admin/Settings";

const Home = lazy(() => import("./pages/Home"));
const Chat = lazy(() => import("./pages/Chat"));
const Login = lazy(() => import("./pages/Login"));
const Group = lazy(() => import("./pages/Groups"));
const AdminLayout = lazy(() => import("./Components/Layout/AdminLayout"));

function App() {
  return (
    <Suspense fallback={<Loaders />}>
      <Routes>
        <Route
          path="/"
          element={
            <RouteProtector redirect="/login" role="user">
              <Home />
            </RouteProtector>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat/:id"
          element={
            <RouteProtector redirect="/login" role="user">
              <Chat />
            </RouteProtector>
          }
        />
        <Route
          path="/group"
          element={
            <RouteProtector redirect="/login" role="user">
              <Group />
            </RouteProtector>
          }
        />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/admin" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <RouteProtector redirect="/admin" role="admin">
              <AdminLayout />
            </RouteProtector>
          }
          outlet
        >
          <Route default path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard/users" element={<Users />} />
          <Route path="/admin/dashboard/groups" element={<Groups />} />
          <Route path="/admin/dashboard/messages" element={<Messages />} />
          <Route path="/admin/dashboard/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
