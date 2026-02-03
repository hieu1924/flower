import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages';
import ShopPage from './pages/ShopPage';
import './styles/globals.css';

// Get base path for GitHub Pages deployment
const basename = import.meta.env.BASE_URL;

/**
 * App Component
 * Main application entry point with routing
 * - Landing Page (/)
 * - Shop Page (/shop)
 */
function App() {
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
    </Router>
  );
}

export default App;

