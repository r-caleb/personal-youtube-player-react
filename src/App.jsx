import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/header/Header";
import { useState, useEffect } from "react";
import SideBar from "./components/sidebar/SideBar";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import WatchScreen from "./screens/watchscreen/WatchScreen";
import SearchScreen from "./screens/SearchScreen";
import SubscriptionsScreen from "./screens/subscriptions/SubscriptionsScreen";
import ChannelScreen from "./screens/channelScreen/ChannelScreen";
import LikeScreen from "./screens/likeScreen/LikeScreen";
import Notification from "./screens/notifications/Notification";
import ProfileScreen from "./screens/profile/ProfileScreen";
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:5000");

const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar = () => toggleSidebar((value) => !value);

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app_container">
        <SideBar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app__main ">
          {children}
        </Container>
      </div>
    </>
  );
};

export default function App() {
  const { accessToken, loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate("/auth");
    }
  }, [accessToken, loading, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomeScreen />
          </Layout>
        }
      />
      <Route path="/auth" element={<LoginScreen />} />
      <Route
        path="/search/:query"
        element={
          <Layout>
            <SearchScreen />
          </Layout>
        }
      />
      <Route
        path="/watch/:id"
        element={
          <Layout>
            <WatchScreen socket={socket} />
          </Layout>
        }
      />
      <Route
        path="/feed/subscriptions"
        element={
          <Layout>
            <SubscriptionsScreen />
          </Layout>
        }
      />
      <Route
        path="/feed/like"
        element={
          <Layout>
            <LikeScreen />
          </Layout>
        }
      />
      <Route
        path="/notifications"
        element={
          <Layout>
            <Notification />
          </Layout>
        }
      />
      <Route
        path="/profile/edit/:id"
        element={
          <Layout>
            <ProfileScreen />
          </Layout>
        }
      />
      <Route
        path="/channel/:channelId"
        element={
          <Layout>
            <ChannelScreen />
          </Layout>
        }
      ></Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
