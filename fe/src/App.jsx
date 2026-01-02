// App.jsx
// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MainContent from './components/MainContent';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Daftar from './pages/Daftar';
import Formulir from './pages/Formulir';
import Detail from './pages/Detail';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                    <main>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/daftar" element={<Daftar />} />
                            <Route path="/formulir" element={<Formulir />} />
                            <Route path="/detail/:id" element={<Detail />} />
                        </Routes>
                    </main>
            </div>
        </Router>
    );
}

export default App;
