// src/pages/admin/AdminLoginPage.tsx
import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import { appState } from '../../lib/appState';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'admin-qr-reader',
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 10,
      },
      false
    );

    const onScanSuccess = (decodedText: string) => {
      if (decodedText === appState.adminMasterQrCode) {
        setErrorMessage(null);
        // Успешный вход!
        console.log('Admin login successful!');
        scanner.clear();
        // Перенаправляем на дашборд
        navigate('/admin/dashboard');
      } else {
        setErrorMessage('Неверный QR-код. Доступ запрещен.');
      }
    };

    // @ts-expect-error - html5-qrcode's error type is not well defined
    const onScanFailure = () => {
      // Игнорируем ошибки, которые не являются реальным сканированием
    };

    scanner.render(onScanSuccess, onScanFailure);

    return () => {
      scanner.clear().catch(error => {
        console.error("Failed to clear html5-qrcode scanner.", error);
      });
    };
  }, [navigate]);

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Вход в Панель Администратора</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4">Отсканируйте мастер-QR-код для получения доступа.</p>
        <div id="admin-qr-reader" style={{ width: '100%' }}></div>
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLoginPage;
