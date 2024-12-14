import './App.css';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen">
      {/* Global ToastContainer */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <AppRoutes />
    </div>
  );
}

export default App;
