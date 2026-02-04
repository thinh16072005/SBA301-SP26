import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import StaffLayout from "./components/StaffLayout.jsx";
import AccountManagement from "./pages/admin/AccountManagement.jsx";
import Categories from "./pages/staff/Categories.jsx";
import NewsArticles from "./pages/staff/NewsArticles.jsx";
import Profile from "./pages/staff/Profile.jsx";
import Home from "./pages/Home.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Forbidden from "./pages/errors/Forbidden.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forbidden" element={<Forbidden />} />
                <Route path="/admin" element={<RequireAuth allowedRoles={[1]}><AdminLayout /></RequireAuth>}>
                    <Route index element={<AccountManagement />} />
                </Route>
                <Route path="/staff" element={<RequireAuth allowedRoles={[2]}><StaffLayout /></RequireAuth>}>
                    <Route index element={<NewsArticles />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="articles" element={<NewsArticles />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Routes>
        </Router>

    )
}

export default App
