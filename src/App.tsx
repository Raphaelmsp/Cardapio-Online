import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import AdminPanel from './components/AdminPanel';
import UserPanel from './components/UserPanel';
import logo from './assets/Logo-cinbal.png'; // Caminho da imagem

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center h-16 justify-between">
              {/* Logo à esquerda */}
              <Link to="/" className="flex items-center gap-2 text-xl font-bold text-black-600">
                <img src={logo} alt="Logo" className="w-20 h-8" />
              </Link>

              {/* Nome centralizado */}
              <div className="flex-1 flex justify-center">
                <Link to="/" className="text-4xl md:text-6xl font-bold text-black-600" style={{ fontFamily: 'Palace Script MT, cursive' }}>
                  Restaurante Benito Gomes
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<UserPanel />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>

        <footer className="bg-white shadow-md p-2 mt-auto text-right">
          <Link to="/admin" className="text-gray-100 text-xs hover:text-blue-600 flex items-center justify-end gap-1">
            <Settings className="w-3 h-3" />
            {/* Admin */}
          </Link>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
