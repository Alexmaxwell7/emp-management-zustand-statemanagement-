import "./App.css";
import LoginForm from "./components/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormDetails from "./components/FormDetails";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
export interface TableData {
  status: string;
  totalTasks: number;
  value: number;
}
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/form"
            element={
              <ProtectedRoute>
                <FormDetails />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
