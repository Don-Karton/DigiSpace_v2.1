// src/pages/admin/AdminDashboardPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Панель Администратора</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Карточка для управления меню */}
        <Link to="/admin/menu-editor" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Редактор Меню</h2>
          <p className="text-gray-600">Добавляйте, изменяйте и удаляйте позиции в меню бара.</p>
        </Link>

        {/* Карточка для управления играми */}
        <Link to="/admin/game-settings" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Настройки Игр</h2>
          <p className="text-gray-600">Включайте и отключайте генерацию QR-кодов для победителей.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
