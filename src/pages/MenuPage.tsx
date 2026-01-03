// src/pages/MenuPage.tsx
import React from 'react';
import { appState } from '../lib/appState';

const MenuPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Наше Меню</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appState.menu.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              {item.promotion && (
                <p className="text-sm font-bold text-green-600 bg-green-100 p-2 rounded-md mb-3">{item.promotion}</p>
              )}
              <div className="flex justify-between items-center text-sm">
                <span className="font-mono p-1 bg-gray-200 rounded">${item.prices.usd.toFixed(2)}</span>
                <span className="font-mono p-1 bg-gray-200 rounded">{item.prices.gel.toFixed(2)} GEL</span>
                <span className="font-mono p-1 bg-yellow-400 rounded">{item.prices.barCoin} BC</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
