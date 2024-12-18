import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AllProjectsPage from "./pages/AllProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import UserProfile from "./pages/UserProfile";
import AboutPage from "./pages/AboutPage";
import SignupPage from "./pages/SignupPage";

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
        {/* דף אודות  */}
        <Route path="/about" element={<AboutPage />} />

        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
