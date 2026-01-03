// src/pages/admin/GameSettingsPage.tsx
import React, { useReducer } from 'react';
import { getGames, updateGameSettings } from '../../lib/adminService';
import { Game } from '../../lib/appState';

const GameSettingsPage: React.FC = () => {
  // Используем тот же трюк для обновления UI
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const games = getGames();

  const handleToggle = (game: Game) => {
    updateGameSettings(game.id, { qrGenerationEnabled: !game.qrGenerationEnabled });
    forceUpdate(); // Перерисовываем компонент для отображения изменений
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Настройки Игр</h1>
      <p className="text-gray-600 mb-8">
        Включайте или отключайте возможность получения наградных QR-кодов для победителей в играх.
      </p>

      <div className="space-y-4">
        {games.map(game => (
          <div key={game.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <p className="font-bold text-lg">{game.name}</p>
              <p className="text-sm text-gray-500">{game.description}</p>
            </div>
            <div className="flex items-center">
              <span className={`mr-3 text-sm font-medium ${game.qrGenerationEnabled ? 'text-green-700' : 'text-gray-500'}`}>
                {game.qrGenerationEnabled ? 'Награды Включены' : 'Награды Отключены'}
              </span>
              <label htmlFor={`toggle-${game.id}`} className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={game.qrGenerationEnabled}
                  onChange={() => handleToggle(game)}
                  id={`toggle-${game.id}`}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSettingsPage;
