import React, { useState } from 'react';
import { X, Coins, CreditCard, Smartphone, Banknote, Plus } from 'lucide-react';

interface TopUpModalProps {
  onClose: () => void;
  onTopUp: (amount: number) => void;
  currentBalance: number;
}

const TopUpModal: React.FC<TopUpModalProps> = ({ onClose, onTopUp, currentBalance }) => {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [customAmount, setCustomAmount] = useState('');

  const predefinedAmounts = [25, 50, 100, 200, 500];

  const handleTopUp = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (amount > 0) {
      onTopUp(amount);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Coins size={24} />
              Пополнить BarCoin
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-yellow-600/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {currentBalance.toFixed(1)} BarCoin
            </div>
            <p className="text-gray-600 text-sm">Текущий баланс</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Выберите сумму</h3>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`p-3 rounded-xl font-semibold transition-all ${
                    selectedAmount === amount && !customAmount
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(0);
                }}
                placeholder="Другая сумма"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Способ оплаты</h3>
            <div className="space-y-2">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-purple-100 border-2 border-purple-500 text-purple-900'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                <CreditCard size={24} />
                <div className="text-left">
                  <div className="font-semibold">Банковская карта</div>
                  <div className="text-sm opacity-75">Visa, Mastercard, МИР</div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('crypto')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                  paymentMethod === 'crypto'
                    ? 'bg-purple-100 border-2 border-purple-500 text-purple-900'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                <Coins size={24} />
                <div className="text-left">
                  <div className="font-semibold">TON Wallet</div>
                  <div className="text-sm opacity-75">Прямая конвертация</div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('mobile')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                  paymentMethod === 'mobile'
                    ? 'bg-purple-100 border-2 border-purple-500 text-purple-900'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                <Smartphone size={24} />
                <div className="text-left">
                  <div className="font-semibold">Мобильный платеж</div>
                  <div className="text-sm opacity-75">СБП, Apple Pay, Google Pay</div>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
              <Plus size={16} />
              Бонус за пополнение
            </div>
            <p className="text-green-600 text-sm">
              При пополнении от 100 BarCoin получите дополнительно +5% к балансу
            </p>
          </div>

          <button
            onClick={handleTopUp}
            disabled={(!customAmount && !selectedAmount) || (customAmount && parseFloat(customAmount) <= 0)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition-all text-lg"
          >
            Пополнить на {customAmount || selectedAmount} BarCoin
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopUpModal;