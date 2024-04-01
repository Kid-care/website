import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register1 from "./pages/Register1";
import Register2 from "./pages/Register2";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import { Provider } from "react-redux";
import { store } from "./store/store";
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Register1" element={<Register1 />} />
            <Route exact path="/Register2" element={<Register2 />} />
            <Route exact path="/ForgetPassword" element={<ForgetPassword />} />
            <Route
              exact
              path="/reset_password/:user_id/:token"
              element={<ResetPassword />}
            />
            <Route exact path="/Profile" element={<Profile />} />

            <Route exact path="*" element={<h1>page not found </h1>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
