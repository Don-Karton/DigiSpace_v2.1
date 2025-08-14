import React, { useState } from 'react';
import { ShoppingCart, Coins, Plus, Users, Gamepad2, Home, Building, Coffee, Wine, Utensils, Car, MapPin, Gift, Zap, Clock, Star } from 'lucide-react';
import CartModal from './CartModal';
import TopUpModal from './TopUpModal';

const DiSpacePrototype = () => {
  const [activeTab, setActiveTab] = useState('digitalbar');
  const [selectedVenue, setSelectedVenue] = useState('bar');
  const [selectedCategory, setSelectedCategory] = useState('beer');
  const [cartCount, setCartCount] = useState(3);
  const [barCoinBalance, setBarCoinBalance] = useState(156.8);
  const [currentGame, setCurrentGame] = useState(null);
  const [gameParticipants, setGameParticipants] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Данные меню для разных заведений
  const venueData = {
    bar: {
      name: "Digital Bar Tbilisi",
      categories: [
        { id: 'beer', name: 'Пиво', icon: '🍺', color: 'bg-amber-100' },
        { id: 'wine', name: 'Вино', icon: '🍷', color: 'bg-purple-100' },
        { id: 'cocktails', name: 'Коктейли', icon: '🍸', color: 'bg-pink-100' },
        { id: 'shots', name: 'Шоты', icon: '🥃', color: 'bg-orange-100' },
        { id: 'snacks', name: 'Закуски', icon: '🥨', color: 'bg-yellow-100' },
        { id: 'kitchen', name: 'Кухня', icon: '🍝', color: 'bg-red-100' },
        { id: 'special', name: 'Акции', icon: '🎉', color: 'bg-green-100' },
      ],
      items: {
        beer: [
          { id: 1, name: 'Natakhtari Lager', price: 7, coinPrice: 5.5, image: '🍺', rating: 4.2, description: 'Легкое грузинское пиво' },
          { id: 2, name: 'Guinness', price: 12, coinPrice: 9, image: '🍺', rating: 4.8, description: 'Ирландское стаут' },
          { id: 3, name: 'Corona Extra', price: 10, coinPrice: 7.5, image: '🍺', rating: 4.0, description: 'Мексиканское светлое пиво' },
        ],
        wine: [
          { id: 4, name: 'Саперави 2021', price: 25, coinPrice: 18, image: '🍷', rating: 4.6, description: 'Грузинское красное вино' },
          { id: 5, name: 'Ркацители', price: 22, coinPrice: 16, image: '🍷', rating: 4.3, description: 'Белое сухое вино' },
        ],
        cocktails: [
          { id: 6, name: 'Мохито', price: 15, coinPrice: 12, image: '🍸', rating: 4.5, description: 'Освежающий коктейль с мятой' },
          { id: 7, name: 'Маргарита', price: 18, coinPrice: 14, image: '🍸', rating: 4.4, description: 'Классический коктейль с текилой' },
        ],
        snacks: [
          { id: 8, name: 'Хачапури по-аджарски', price: 8, coinPrice: 6, image: '🧀', rating: 4.9, description: 'Традиционная грузинская выпечка' },
          { id: 9, name: 'Сулугуни жареный', price: 6, coinPrice: 4.5, image: '🧄', rating: 4.7, description: 'Жареный грузинский сыр' },
        ]
      }
    },
    hotel: {
      name: "DiSpace Hotel",
      categories: [
        { id: 'rooms', name: 'Номера', icon: '🛏️', color: 'bg-blue-100' },
        { id: 'breakfast', name: 'Завтрак', icon: '🥐', color: 'bg-orange-100' },
        { id: 'spa', name: 'SPA', icon: '🧘‍♀️', color: 'bg-green-100' },
        { id: 'services', name: 'Услуги', icon: '🛎️', color: 'bg-purple-100' },
      ],
      items: {
        rooms: [
          { id: 10, name: 'Стандарт', price: 120, coinPrice: 90, image: '🛏️', rating: 4.1, description: 'Уютный номер с видом на город' },
          { id: 11, name: 'Делюкс', price: 180, coinPrice: 135, image: '🏨', rating: 4.7, description: 'Просторный номер с балконом' },
        ],
        breakfast: [
          { id: 12, name: 'Континентальный завтрак', price: 15, coinPrice: 11, image: '🥐', rating: 4.5, description: 'Шведский стол' },
        ]
      }
    },
    tours: {
      name: "Georgia Tours",
      categories: [
        { id: 'wine', name: 'Винные', icon: '🍇', color: 'bg-purple-100' },
        { id: 'offroad', name: 'Оффроуд', icon: '🚙', color: 'bg-green-100' },
        { id: 'historical', name: 'История', icon: '🏛️', color: 'bg-amber-100' },
        { id: 'hiking', name: 'Хайкинг', icon: '🥾', color: 'bg-blue-100' },
      ],
      items: {
        wine: [
          { id: 13, name: 'Кахетия винный тур', price: 85, coinPrice: 65, image: '🍇', rating: 4.8, description: 'Посещение 3 винодельнен' },
          { id: 14, name: 'Сигнахи романтик', price: 75, coinPrice: 58, image: '💑', rating: 4.6, description: 'Город любви с дегустацией' },
        ],
        offroad: [
          { id: 15, name: 'Дашбаши каньон', price: 95, coinPrice: 72, image: '🚙', rating: 4.9, description: 'Экстремальное приключение' },
        ]
      }
    }
  };

  const games = [
    { id: 'zhMyak', name: 'ЖМЯК', icon: '👆', reward: 5, players: '2-8', description: 'Игра на реакцию' },
    { id: 'quiz', name: 'Викторина', icon: '🧠', reward: 10, players: '2-6', description: 'Проверь эрудицию' },
    { id: 'alias', name: 'Alias', icon: '💬', reward: 8, players: '4-12', description: 'Объясни слово' },
    { id: 'spy', name: 'Шпион', icon: '🕵️', reward: 6, players: '3-8', description: 'Найди шпиона' },
    { id: 'never', name: 'Я никогда не...', icon: '🙈', reward: 4, players: '3-10', description: 'Откровенные вопросы' },
  ];

  const addToCart = (item) => {
    const cartItem = {
      ...item,
      venue: selectedVenue,
      venueName: venueData[selectedVenue].name,
      quantity: 1,
      cartId: Date.now()
    };
    
    setCartItems(prev => {
      const existing = prev.find(ci => ci.id === item.id && ci.venue === selectedVenue);
      if (existing) {
        return prev.map(ci => 
          ci.id === item.id && ci.venue === selectedVenue 
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      return [...prev, cartItem];
    });
    
    setCartCount(prev => prev + 1);
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => {
      const item = prev.find(ci => ci.cartId === cartId);
      if (item) {
        setCartCount(c => c - item.quantity);
        return prev.filter(ci => ci.cartId !== cartId);
      }
      return prev;
    });
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    
    setCartItems(prev => {
      return prev.map(item => {
        if (item.cartId === cartId) {
          const oldQuantity = item.quantity;
          const quantityDiff = newQuantity - oldQuantity;
          setCartCount(c => c + quantityDiff);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + (item.coinPrice * item.quantity), 0);
  };

  const getTotalCashPrice = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const startGame = (game) => {
    setCurrentGame(game);
    setGameParticipants([{ name: 'Вы', id: 'user1' }]);
  };

  const joinGame = () => {
    const names = ['Анна', 'Георгий', 'Мария', 'Давид', 'Нино', 'Лука', 'София', 'Николоз'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    setGameParticipants(prev => [...prev, { name: randomName, id: `user${prev.length + 1}` }]);
  };

  const handleTopUp = (amount) => {
    setBarCoinBalance(prev => prev + amount);
    setShowTopUp(false);
  };

  const handleCheckout = () => {
    const total = getTotalPrice();
    if (barCoinBalance >= total) {
      setBarCoinBalance(prev => prev - total);
      setCartItems([]);
      setCartCount(0);
      setShowCart(false);
      alert('🎉 Заказ оформлен! Ожидайте в течение 10-15 минут.');
    } else {
      alert('💸 Недостаточно BarCoin для оплаты заказа');
    }
  };

  const renderContent = () => {
    if (activeTab === 'home') {
      return (
        <div className="h-full bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
              DS
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              DiSpace
            </h1>
            <p className="text-gray-600 text-lg">Интерактивная цифровая экосистема</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Building className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">DigitalBar</h3>
                  <p className="text-gray-600">Интерактивное меню и заказы</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Бары, отели, рестораны, кафе
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Туры по Грузии (винные, оффроуд, хайкинг)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Заказ без подхода к стойке
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Скидки за BarCoin до 30%
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Gamepad2 className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">GameBar</h3>
                  <p className="text-gray-600">Игры и развлечения</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  ЖМЯК, Alias, Шпион, Викторины
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  Командные игры в барах
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  Награды в BarCoin за победы
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  QR-коды для получения призов
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-yellow-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Coins className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">BarCoin</h3>
                  <p className="text-gray-600">Криптовалюта на TON</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Единая валюта для всех сервисов
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Заработок в играх и покупках
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Конвертация в доллары и другие валюты
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Интеграция с Telegram Wallet
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-3">🎯 Преимущества</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Gift size={16} />
                  <span>Кэшбэк программы</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>Реферальные бонусы</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} />
                  <span>Мгновенные платежи</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={16} />
                  <span>Эксклюзивные акции</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'gamebar') {
      if (currentGame) {
        return (
          <div className="h-full bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white p-6 flex flex-col">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{currentGame.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{currentGame.name}</h2>
              <p className="text-purple-300 mb-4">{currentGame.description}</p>
              <div className="flex justify-center items-center gap-4 text-sm opacity-90">
                <span className="flex items-center gap-1">
                  <Users size={16} />
                  {currentGame.players}
                </span>
                <span className="flex items-center gap-1">
                  <Coins size={16} />
                  {currentGame.reward} BarCoin
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Участники ({gameParticipants.length})</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {gameParticipants.map((player, idx) => (
                  <div key={player.id} className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">👤</div>
                    <div className="text-sm font-medium">{player.name}</div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={joinGame}
                className="w-full bg-green-500 hover:bg-green-600 rounded-lg p-3 font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Добавить игрока
              </button>
            </div>

            {currentGame.id === 'zhMyak' && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <button 
                  className="w-48 h-48 bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200 text-white font-bold text-xl"
                  onClick={() => {
                    const winner = gameParticipants[Math.floor(Math.random() * gameParticipants.length)];
                    setBarCoinBalance(prev => prev + currentGame.reward);
                    alert(`🎉 Победитель: ${winner.name}! +${currentGame.reward} BarCoin`);
                  }}
                >
                  ЖМЯК!
                </button>
                <p className="text-center mt-4 opacity-75">Нажми быстрее всех!</p>
              </div>
            )}

            <button 
              onClick={() => setCurrentGame(null)}
              className="mt-4 bg-gray-600 hover:bg-gray-700 rounded-lg p-3 font-semibold transition-colors"
            >
              Назад к играм
            </button>
          </div>
        );
      }

      return (
        <div className="h-full bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white p-6">
          <div className="text-center mb-8">
            <Gamepad2 size={48} className="mx-auto mb-4 text-purple-300" />
            <h2 className="text-2xl font-bold mb-2">GameBar</h2>
            <p className="text-purple-300">Играй и зарабатывай BarCoin!</p>
          </div>

          <div className="grid gap-4">
            {games.map(game => (
              <div key={game.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{game.icon}</span>
                    <div>
                      <h3 className="font-bold text-lg">{game.name}</h3>
                      <p className="text-sm text-purple-300">{game.players} игроков</p>
                      <p className="text-xs text-purple-400">{game.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-400 font-bold">
                      <Coins size={16} />
                      {game.reward}
                    </div>
                    <div className="text-xs text-purple-300">за победу</div>
                  </div>
                </div>
                
                <button 
                  onClick={() => startGame(game)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg p-3 font-semibold transition-all transform hover:scale-105"
                >
                  Играть
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const venue = venueData[selectedVenue];
    const items = venue.items[selectedCategory] || [];

    return (
      <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
            <h2 className="text-xl font-bold">{venue.name}</h2>
            <div className="flex items-center gap-2 mt-1 text-purple-200">
              <MapPin size={16} />
              <span className="text-sm">Тбилиси, Старый город</span>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex gap-2 mb-4">
              <button className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                ⭐ 4.8 • 245 отзывов
              </button>
              <button className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                🕐 Открыто до 02:00
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="flex">
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-3xl">
                  {item.image}
                </div>
                
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <div className="text-gray-500 text-sm line-through">{item.price} ₾</div>
                      <div className="flex items-center gap-1 text-purple-600 font-bold">
                        <Coins size={16} />
                        {item.coinPrice} BarCoin
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                    >
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">🔍</div>
              <p>Выберите категорию из барной стойки</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col relative">
      {/* Плавающая шапка */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex space-x-1">
            <button 
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-xl font-medium transition-all ${activeTab === 'home' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Home size={16} />
            </button>
            <button 
              onClick={() => setActiveTab('digitalbar')}
              className={`px-3 py-2 rounded-xl font-medium transition-all ${activeTab === 'digitalbar' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Building size={16} />
            </button>
            <button 
              onClick={() => setActiveTab('gamebar')}
              className={`px-3 py-2 rounded-xl font-medium transition-all ${activeTab === 'gamebar' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Gamepad2 size={16} />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-3 py-1 rounded-full font-bold">
              <Coins size={16} />
              {barCoinBalance.toFixed(1)}
            </div>
            <button 
              onClick={() => setShowTopUp(true)}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors">
              <Plus size={16} />
            </button>
            <button 
              onClick={() => setShowCart(true)}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingCart size={16} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Центральная витрина */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>

      {/* Барная стойка (нижняя навигация) */}
      {activeTab === 'digitalbar' && (
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white p-4">
          <div className="flex items-center justify-between mb-3">
            <select 
              value={selectedVenue} 
              onChange={(e) => {
                setSelectedVenue(e.target.value);
                setSelectedCategory(venueData[e.target.value].categories[0].id);
              }}
              className="bg-white/20 backdrop-blur-sm border-0 rounded-lg px-3 py-2 text-white text-sm font-medium"
            >
              <option value="bar">🍺 Бар</option>
              <option value="hotel">🏨 Отель</option>
              <option value="tours">🚌 Туры</option>
            </select>
            
            <div className="flex items-center gap-2 text-sm">
              <Zap size={16} className="text-yellow-400" />
              <span>Скидка 30% за BarCoin!</span>
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {venueData[selectedVenue].categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 flex flex-col items-center p-3 rounded-2xl transition-all min-w-[80px] ${
                  selectedCategory === category.id 
                    ? 'bg-white text-purple-900 shadow-lg transform scale-105' 
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                <span className="text-2xl mb-1">{category.icon}</span>
                <span className="text-xs font-medium text-center">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Модальные окна */}
      {showCart && (
        <CartModal
          cartItems={cartItems}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
          totalPrice={getTotalPrice()}
          totalCashPrice={getTotalCashPrice()}
          barCoinBalance={barCoinBalance}
        />
      )}

      {showTopUp && (
        <TopUpModal
          onClose={() => setShowTopUp(false)}
          onTopUp={handleTopUp}
          currentBalance={barCoinBalance}
        />
      )}
    </div>
  );
};

export default DiSpacePrototype;