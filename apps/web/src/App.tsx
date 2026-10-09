import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Splash } from './pages/Splash';
import { Home } from './pages/Home';
import { HealthCheck } from './pages/HealthCheck';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/health-check" element={<HealthCheck />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
