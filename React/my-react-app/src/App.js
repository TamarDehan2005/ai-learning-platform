import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage"; 
import DeleteUserForm from "./components/User/DeleteUserForm";
import AllPrompts from "./components/User/AllPrompts";
import UserHistory from "./components/User/UserHistory";
import UserDetails from "./components/User/UserDetails";
import SubmitPromptForm from "./components/User/SubmitPromptForm";
import AllUsers from "./components/User/AllUsers";
import RegisterForm from "./components/User/RegisterForm";
import CategoryList from "./components/Category/CategoryList";
import ManagmentCategory from "./components/Category/ManagmentCategory";
import SubCategoryManagement from "./components/subCategory/SubCategoryManagement";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* עמוד מנהל עם הכפתורים שלו */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/delete" element={<DeleteUserForm />} />
        <Route path="/admin/prompts" element={<AllPrompts />} />
        <Route path="/admin/users" element={<AllUsers />} />
        <Route path="/admin/ManageCategory" element={<ManagmentCategory />} />
        <Route path="/admin/ManageSubCategory" element={<SubCategoryManagement />} />
        {/* נתיבים של משתמש רגיל */}
        <Route path="/register" element={<UserPage />} />
        <Route path="/user/history" element={<UserHistory />} />
        <Route path="/user/details" element={<UserDetails />} />
        <Route path="/user/submit-prompt" element={<SubmitPromptForm />} />
        <Route path="/user/Register" element={<RegisterForm />} />
        <Route path="/user/CategoryList" element={<CategoryList />} />
      </Routes>
    </Router>
  );
}

export default App;
