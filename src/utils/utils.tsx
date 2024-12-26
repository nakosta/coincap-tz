type Errors = {
  registration: string;
  login: string;
  getCoins: string;
  loadLocalStorage: string;
  saveLocalStorage: string;
};

export const errors: Errors = {
  registration: "Ошибка при регистрации",
  login: "Ошибка входа",
  getCoins: "Ошибка при получении криптомонет",
  loadLocalStorage: "Не удалось загрузить favourites из localStorage:",
  saveLocalStorage: "Не удалось сохранить favourites в localStorage:",
};
