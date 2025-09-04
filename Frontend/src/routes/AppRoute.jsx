import { Routes, Route } from "react-router-dom";
import Form from "../mycomponents/Form.jsx";
import App from "../mycomponents/Home.jsx";

function AppRoute() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/addform" element={<Form />} />
            <Route path="/addform/:id" element={<Form />} />
        </Routes>
    );
}

export default AppRoute;