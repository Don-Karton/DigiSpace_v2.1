// src/lib/adminService.ts
import { appState, MenuItem, Game } from './appState';

/**
 * Сервис для управления состоянием админ-панели.
 * В MVP он напрямую мутирует объект appState.
 * В будущем это будет заменено на API-запросы к серверу.
 */

// --- Управление меню ---

export const getMenu = (): MenuItem[] => {
  return appState.menu;
};

export const addMenuItem = (item: Omit<MenuItem, 'id'>): MenuItem => {
  const newItem: MenuItem = {
    ...item,
    id: `menu-${Date.now()}-${Math.random()}`, // Простой генератор ID
  };
  appState.menu.push(newItem);
  console.log("Menu state updated:", appState.menu);
  return newItem;
};

export const updateMenuItem = (id: string, updates: Partial<MenuItem>): MenuItem | null => {
  const itemIndex = appState.menu.findIndex(item => item.id === id);
  if (itemIndex === -1) {
    console.error(`Item with id ${id} not found.`);
    return null;
  }
  const updatedItem = { ...appState.menu[itemIndex], ...updates };
  appState.menu[itemIndex] = updatedItem;
  console.log("Menu state updated:", appState.menu);
  return updatedItem;
};

export const deleteMenuItem = (id: string): boolean => {
  const itemIndex = appState.menu.findIndex(item => item.id === id);
  if (itemIndex === -1) {
    console.error(`Item with id ${id} not found.`);
    return false;
  }
  appState.menu.splice(itemIndex, 1);
  console.log("Menu state updated:", appState.menu);
  return true;
};

// --- Управление играми ---

export const getGames = (): Game[] => {
  return appState.games;
};

export const updateGameSettings = (id: string, updates: Partial<Game>): Game | null => {
  const gameIndex = appState.games.findIndex(game => game.id === id);
  if (gameIndex === -1) {
    console.error(`Game with id ${id} not found.`);
    return null;
  }
  const updatedGame = { ...appState.games[gameIndex], ...updates };
  appState.games[gameIndex] = updatedGame;
  console.log("Games state updated:", appState.games);
  return updatedGame;
};
