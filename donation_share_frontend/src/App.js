import "./App.css";
import { ToastContainer } from "react-toastify";
import AuthPage from "./pages/Auth";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import "leaflet/dist/leaflet.css";
import DonationDetail from "./pages/DonationDetail";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/donation/:id" element={<DonationDetail />} />
                </Route>
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;
