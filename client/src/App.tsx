import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RouteProtector from "./Components/ProtectedRoute/RouteProtector";
import PageNotFound from "./Components/Shared/PagerNotFound";
import Loaders from "./Components/Shared/Loaders";
import AdminLogin from "../src/pages/Admin/AdminLogin";
import AdminDashboard from "../src/pages/Admin/AdminDashboard";
import Users from "../src/Components/Admin/Users";
import Groups from "../src/Components/Admin/Groups";
import Messages from "../src/Components/Admin/Messages";
import Settings from "../src/Components/Admin/Settings";
import SetUserNameModal from "../src/Components/Specific/SetUSerNameModal";
import { SocketProvider } from "../src/Socket";

const Home = lazy(() => import("./pages/Home"));
const Chat = lazy(() => import("./pages/Chat"));
const Login = lazy(() => import("./pages/Login"));
const Group = lazy(() => import("./pages/Groups"));
const AdminLayout = lazy(() => import("./Components/Layout/AdminLayout"));

function App() {
  return (
    <Suspense fallback={<Loaders />}>
      <Routes>
        <Route path="/username" element={<SetUserNameModal />} />
        <Route path="/login" element={<Login />} />

        
          <Route
            path="/"
            element={
              <RouteProtector redirect="/login" role="user">
                <SocketProvider>
                <Home />
                </SocketProvider>
              </RouteProtector>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <RouteProtector redirect="/login" role="user">
                <SocketProvider>
                <Chat />
                </SocketProvider>
              </RouteProtector>
            }
          />
          <Route
            path="/group"
            element={
              <RouteProtector redirect="/login" role="user">
                <SocketProvider>
                <Group />
                </SocketProvider>
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
          
        >
          <Route index path="/admin/dashboard" element={<AdminDashboard />} />
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
