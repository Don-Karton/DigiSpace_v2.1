// src/lib/appState.ts

// Типы данных для нашего приложения
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  image: string; // URL к изображению
  prices: {
    usd: number;
    gel: number;
    barCoin: number;
  };
  tags: string[];
  promotion?: string; // Например, "Скидка 20%"
}

export interface Game {
  id: string;
  name: string;
  description: string;
  qrGenerationEnabled: boolean;
}

export interface ActiveQrCode {
  code: string;
  reward: number; // Количество BarCoin
  isUsed: boolean;
}

// Состояние приложения (наша временная база данных)
interface AppState {
  menu: MenuItem[];
  games: Game[];
  user: {
    balance: number; // BarCoin balance
  };
  activeQrCodes: ActiveQrCode[];
  adminMasterQrCode: string; // Секретный QR-код для входа в админку
}

// Начальные данные
export const appState: AppState = {
  menu: [
    {
      id: "1",
      name: "Коктейль 'Тропический Бриз'",
      description: "Освежающий коктейль на основе рома, ананасового сока и кокосового молока.",
      image: "https://via.placeholder.com/150",
      prices: {
        usd: 8,
        gel: 22,
        barCoin: 160,
      },
      tags: ["Алкогольный", "Лонг-дринк"],
    },
    {
      id: "2",
      name: "Классический Бургер",
      description: "Сочная говяжья котлета, свежие овощи, фирменный соус и хрустящая булочка.",
      image: "https://via.placeholder.com/150",
      prices: {
        usd: 10,
        gel: 27,
        barCoin: 200,
      },
      tags: ["Еда", "Горячее"],
      promotion: "Картошка фри в подарок!"
    },
  ],
  games: [
    {
      id: "alias",
      name: "Alias",
      description: "Объясни как можно больше слов своей команде за ограниченное время.",
      qrGenerationEnabled: true,
    },
    {
      id: "crocodile",
      name: "Крокодил",
      description: "Покажи слово или фразу жестами, не произнося ни звука.",
      qrGenerationEnabled: false,
    },
  ],
  user: {
    balance: 50, // Начальный баланс пользователя
  },
  activeQrCodes: [],
  adminMasterQrCode: "ADMIN_LOGIN_SECRET_CODE_12345", // Этот код будет открывать админ-панель
};

// Функции для взаимодействия с состоянием (пока не добавляем, сделаем позже)
