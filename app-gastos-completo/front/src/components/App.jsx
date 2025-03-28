import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdicionarGasto from "./AdicionarGasto";
import ListaGastos from "./ListaGastos";
import GraficoGastos from "./GraficoGastos";
import "./styles.css"; // 🔥 Importação do CSS
import Login from "./Login";
import Cadastro from "./Cadastro";
import Compartlihado from "./Compartilhado";
import CriarCompartilhado from "./CriarCompartilhado";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/adicionarGasto">Adicionar Gasto</Link>
        <Link to="/lista">Lista de Gastos</Link>
        <Link to="/relatorios">Relatórios</Link>
        <Link to='/compartilhado'>Amigos</Link>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/adicionarGasto" element={<AdicionarGasto />} /> 
          <Route path="/lista" element={<ListaGastos />} />
          <Route path="/relatorios" element={<GraficoGastos />} />
          <Route path="/cadastro" element={<Cadastro/>}/>
          <Route path="/compartilhado" element ={<Compartlihado/>}/>
          <Route path="/criarcompartilhado" element = {<CriarCompartilhado/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
