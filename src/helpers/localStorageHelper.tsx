import { errors } from "../utils/utils";
import { PortfolioState } from "../redux/slices/portfolioSlice";

export const loadFromLocalStorage = (): PortfolioState => {
  try {
    const serializedState = localStorage.getItem("portfolio");
    return serializedState ? JSON.parse(serializedState) : { items: [] };
  } catch (error) {
    console.error(errors.loadLocalStorage, error);
    return { items: [] };
  }
};

export const saveToLocalStorage = (state: PortfolioState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("portfolio", serializedState);
  } catch (error) {
    console.error(errors.saveLocalStorage, error);
  }
};
