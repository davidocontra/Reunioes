import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import Agendamentos from './views/agendamento/index'
import Cadastro from './views/cadastro/index'

function App() {
  return (
    <BrowserRouter>
  
    <Routes>
     <Route path='/' element={<Cadastro/>}/>
     <Route path='/agendamentos' element={<Agendamentos/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
