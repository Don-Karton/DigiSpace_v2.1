// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Импортируем все наши страницы
import MenuPage from './pages/MenuPage';
import GamesPage from './pages/GamesPage';
import ProfilePage from './pages/ProfilePage';
import StaffScannerPage from './pages/StaffScannerPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import MenuEditorPage from './pages/admin/MenuEditorPage';
import GameSettingsPage from './pages/admin/GameSettingsPage';

function App() {
  return (
    <Router>
      <div className="p-4">
        {/* Навигационная панель для удобства */}
        <nav className="bg-gray-800 p-4 rounded-lg mb-4">
          <ul className="flex space-x-4 text-white">
            <li>
              <Link to="/" className="hover:text-gray-300">Меню</Link>
            </li>
            <li>
              <Link to="/games" className="hover:text-gray-300">Игры</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-gray-300">Профиль</Link>
            </li>
            <li className="ml-auto">
              <Link to="/staff" className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded">Для персонала</Link>
            </li>
            <li>
              <Link to="/admin" className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">Админ</Link>
            </li>
          </ul>
        </nav>

        {/* Определение роутов */}
        <main>
          <Routes>
            {/* Клиентские роуты */}
            <Route path="/" element={<MenuPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/staff" element={<StaffScannerPage />} />

            {/* Роуты админ-панели */}
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/menu-editor" element={<MenuEditorPage />} />
            <Route path="/admin/game-settings" element={<GameSettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
