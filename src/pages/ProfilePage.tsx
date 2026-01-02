// src/pages/ProfilePage.tsx
import React, { useState } from 'react';
import { appState } from '../lib/appState';
import QRCode from 'react-qr-code';

// Простая функция для генерации случайного кода
const generateRandomCode = () => {
  return 'WIN-' + Math.random().toString(36).substring(2, 9).toUpperCase();
};

const ProfilePage: React.FC = () => {
  const [generatedQrCode, setGeneratedQrCode] = useState<string | null>(null);

  const handleWinGame = () => {
    const newCode = generateRandomCode();
    const newQrRecord = {
      code: newCode,
      reward: 10, // Награда в 10 BarCoin за победу
      isUsed: false,
    };

    // Добавляем новый QR-код в наше "состояние"
    // В реальном приложении здесь был бы запрос к серверу
    appState.activeQrCodes.push(newQrRecord);

    setGeneratedQrCode(newCode);
    console.log('Generated QR Codes:', appState.activeQrCodes); // Для отладки
  };

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Ваш Профиль</h1>
      <div className="bg-white p-6 rounded-lg shadow-md inline-block">
        <p className="text-lg">Ваш баланс:</p>
        <p className="text-4xl font-bold text-yellow-500 mb-6">{appState.user.balance} BC</p>

        {!generatedQrCode ? (
          <button
            onClick={handleWinGame}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Симулировать победу в игре
          </button>
        ) : (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Ваш QR-код для награды!</h2>
            <p className="mb-4">Покажите этот код сотруднику бара, чтобы получить 10 BC.</p>
            <div className="p-4 bg-white inline-block rounded-lg">
              <QRCode value={generatedQrCode} size={200} />
            </div>
            <p className="mt-2 text-sm text-gray-500 font-mono">{generatedQrCode}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
