import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AllProjectsPage from "./pages/AllProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import UserProfile from "./pages/UserProfile";
import AboutPage from "./pages/AboutPage";
import SignupPage from "./pages/SignupPage";
import ProjectIntro from "./pages/ProjectIntro";
import { UserProvider } from "./components/context/userContext";
import { Toaster } from "./components/ui/toaster";
import { ProjectProvider } from "./components/context/projectContext";
import FiltersBar from "./components/FiltersBar";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <Toaster />
      <UserProvider>
        <ProjectProvider>
          <Router>
            <Navbar /> {/* תפריט ניווט קבוע */}
            <FiltersBar />
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
              {/* דף הרשמה */}
              <Route path="/signup" element={<SignupPage />} />
              {/* דף הסבר פרוייקט */}
              <Route path="/projectInfo" element={<ProjectIntro />} />
              {/* דף שינוי הגדרות */}
              <Route path="/settings" element={<Settings/>} ></Route>
            </Routes>
          </Router>
        </ProjectProvider>
      </UserProvider>
    </>
  );
}

export default App;
