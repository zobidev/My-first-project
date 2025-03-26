import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import HomePage from "./page";
import Form from "./pages/Form";
import UpdatedForm from "./pages/updatedForm";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
import Edit from "./pages/edit";
import PrivateRoutes from "./privateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* PrivateRoutes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<Form />} />
          <Route path="/update/:id" element={<UpdatedForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit" element={<Edit />} />
        </Route>
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            border: "1px solid #eee",
            width: "320px",
            height: "70px",
            fontWeight: "600",
            paddingLeft: "24px",
          },
        }}
      />
    </>
  );
}

export default App;
