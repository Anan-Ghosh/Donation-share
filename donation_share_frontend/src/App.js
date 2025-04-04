import logo from "./logo.svg";
import "./App.css";
import { ToastContainer } from "react-toastify";
import AuthPage from "./pages/Auth";
import { Route, Routes } from "react-router";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                {/* <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="book/:id" element={<BookDetail />} />
                </Route> */}
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;
