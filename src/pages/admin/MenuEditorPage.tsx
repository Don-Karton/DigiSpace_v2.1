// src/pages/admin/MenuEditorPage.tsx
import { useReducer, useState } from 'react';
import { getMenu, addMenuItem, updateMenuItem, deleteMenuItem } from '../../lib/adminService';
import type { MenuItem } from '../../lib/appState';

// Пустой шаблон для новой позиции меню
const emptyMenuItem: Omit<MenuItem, 'id'> = {
  name: '',
  description: '',
  image: 'https://via.placeholder.com/150',
  prices: { usd: 0, gel: 0, barCoin: 0 },
  tags: [],
};

const MenuEditorPage: React.FC = () => {
  // Простой способ заставить компонент перерисоваться при изменении данных
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [editingItem, setEditingItem] = useState<MenuItem | Omit<MenuItem, 'id'>>(emptyMenuItem);
  const [isEditing, setIsEditing] = useState(false);

  const menuItems = getMenu();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'prices.usd' || name === 'prices.gel' || name === 'prices.barCoin') {
      const currency = name.split('.')[1] as 'usd' | 'gel' | 'barCoin';
      setEditingItem(prev => ({
        ...prev,
        prices: {
          ...prev.prices,
          [currency]: parseFloat(value) || 0,
        }
      }));
    } else {
      setEditingItem(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    if (isEditing && 'id' in editingItem) {
      updateMenuItem(editingItem.id, editingItem);
    } else {
      addMenuItem(editingItem as Omit<MenuItem, 'id'>);
    }
    setEditingItem(emptyMenuItem);
    setIsEditing(false);
    forceUpdate(); // Перерисовываем компонент
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту позицию?')) {
      deleteMenuItem(id);
      forceUpdate(); // Перерисовываем компонент
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Редактор Меню</h1>

      {/* Форма для добавления/редактирования */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Редактировать позицию' : 'Добавить новую позицию'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={editingItem.name} onChange={handleInputChange} placeholder="Название" className="p-2 border rounded"/>
          <input name="image" value={editingItem.image} onChange={handleInputChange} placeholder="URL изображения" className="p-2 border rounded"/>
          <textarea name="description" value={editingItem.description} onChange={handleInputChange} placeholder="Описание" className="p-2 border rounded md:col-span-2"/>
          <input name="prices.usd" value={editingItem.prices.usd} onChange={handleInputChange} type="number" placeholder="Цена USD" className="p-2 border rounded"/>
          <input name="prices.gel" value={editingItem.prices.gel} onChange={handleInputChange} type="number" placeholder="Цена GEL" className="p-2 border rounded"/>
          <input name="prices.barCoin" value={editingItem.prices.barCoin} onChange={handleInputChange} type="number" placeholder="Цена BarCoin" className="p-2 border rounded"/>
        </div>
        <div className="mt-4">
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{isEditing ? 'Сохранить' : 'Добавить'}</button>
          {isEditing && <button onClick={() => { setEditingItem(emptyMenuItem); setIsEditing(false); }} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Отмена</button>}
        </div>
      </div>

      {/* Список существующих позиций */}
      <div className="space-y-4">
        {menuItems.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm text-gray-600">${item.prices.usd} / {item.prices.gel} GEL / {item.prices.barCoin} BC</p>
            </div>
            <div>
              <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600">Редактировать</button>
              <button onClick={() => handleDelete(item.id)} className="ml-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuEditorPage;
