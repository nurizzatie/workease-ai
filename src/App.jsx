import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import DashboardPage from "./pages/ManagerDashboard";
import ManagerInbox from "./pages/ManagerInbox";
import TaskPage from "./pages/TaskPage";
import SettingsPage from "./pages/SettingsPage";
import SignIn from "./pages/SignIn";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/manager" element={<DashboardPage />} />
            <Route path="/inbox" element={<ManagerInbox />} />
            <Route path="/task" element={<TaskPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </main>

        <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        }}
      /> 
      </div>
    </Router>
  );
}

export default App;
