import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import IndexFarmaceutico from "./pages/farmaceutico";
import LayoutFarmaceutico from "./layouts/layoutFarmaceutico";
import LayoutMedico from "./layouts/layoutMedico";
import ReceitaForm from "./pages/medico/createReceita";
import IndexMedico from "./pages/medico";
import ProtectedRoute from "./components/ProtectedRoute";
import Receitas from "./pages/farmaceutico/receitas";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute allowedRoles={["FARMACEUTICO"]} />}>
          <Route path="/farmaceutico" element={<LayoutFarmaceutico />}>
            <Route index element={<IndexFarmaceutico />} />
            <Route path="receitas" element={<Receitas />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["MEDICO"]} />}>
          <Route path="/medico" element={<LayoutMedico />}>
            <Route index element={<IndexMedico />} />
            <Route path="receita/create" element={<ReceitaForm />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
