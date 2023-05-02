import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import RegisterPage from "./Pages/RegisterPage";
import CreateBlog from "./Pages/CreateBlog";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import NavBar from "./Components/NavBar";
import AccountPage from "./Pages/AccountPage";
import BlogPage from "./Pages/BlogPage";
import Layout from "./Components/Layout";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/blog/new" element={<CreateBlog />} />
        <Route path="/blog/:id/" element={<BlogPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
