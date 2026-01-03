// src/pages/StaffScannerPage.tsx
import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { appState } from '../lib/appState';

const StaffScannerPage: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-reader', // ID div элемента для сканера
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 10,
      },
      false // verbose
    );

    const onScanSuccess = (decodedText: string) => {
      setErrorMessage(null); // Сбрасываем старые ошибки
      setSuccessMessage(null);

      console.log(`Scanned QR Code: ${decodedText}`);

      const foundCode = appState.activeQrCodes.find(qr => qr.code === decodedText);

      if (!foundCode) {
        setErrorMessage('Ошибка: QR-код не найден в системе.');
        return;
      }

      if (foundCode.isUsed) {
        setErrorMessage('Ошибка: Этот QR-код уже был использован.');
        return;
      }

      // Начисляем награду и помечаем код как использованный
      appState.user.balance += foundCode.reward;
      foundCode.isUsed = true;

      setSuccessMessage(`Успех! ${foundCode.reward} BarCoin зачислено. Новый баланс: ${appState.user.balance} BC.`);
      setScanResult(decodedText);

      // Можно было бы и остановить сканер после успеха, но для демо оставим активным
      // scanner.clear();
    };

    // @ts-expect-error - html5-qrcode's error type is not well defined
    const onScanFailure = () => {
      // Ошибки сканирования можно игнорировать, т.к. они происходят постоянно
    };

    scanner.render(onScanSuccess, onScanFailure);

    // Очистка при размонтировании компонента
    return () => {
      scanner.clear().catch(error => {
        console.error("Failed to clear html5-qrcode scanner.", error);
      });
    };
  }, []);

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Сканер для Персонала</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <div id="qr-reader" style={{ width: '100%' }}></div>

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {errorMessage}
          </div>
        )}

        {successMessage && (
           <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        {scanResult && !errorMessage && !successMessage && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="font-semibold">Последний отсканированный код:</p>
            <p className="font-mono">{scanResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffScannerPage;
