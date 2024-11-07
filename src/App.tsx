import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';
import IndexFarmaceutico  from './pages/farmaceutico';
import LayoutFarmaceutico from './layouts/layoutFarmaceutico';
import LayoutMedico from './layouts/layoutMedico';

const App = () =>{
  return(
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/farmaceutico' element={<LayoutFarmaceutico/>}>
          <Route index element={<IndexFarmaceutico/>}/>
        </Route>
        <Route path='/medico' element={<LayoutMedico/>}>
          <Route index element={<IndexFarmaceutico/>}/>
        </Route>
      </Routes>
    </Router>
  )
}
export default App;