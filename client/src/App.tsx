import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AllProjectsPage from "./pages/AllProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <Navbar /> {/* תפריט ניווט קבוע */}
      <Routes>
        {/* דף הבית */}
        <Route path="/" element={<HomePage />} />

        {/* דף הצגת כל הפרויקטים */}
        <Route path="/projects" element={<AllProjectsPage />} />

        {/* דף יצירת פרויקט */}
        <Route path="/create" element={<CreateProjectPage />} />

        {/* דף פרטי פרויקט */}
        <Route path="/projects/:id" element={<ProjectPage />} />

        {/* דף פרופיל משתמש */}
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
