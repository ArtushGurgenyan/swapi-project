import { create } from "zustand";

interface FavouriteItem {
  name: string;
  mass: string;
  height: string;
}

interface FavouriteState {
  favourites: FavouriteItem[];
  addFavourite: (item: FavouriteItem) => void;
  removeFavourite: (name: string) => void;
}

export const useFavouriteStore = create<FavouriteState>((set) => ({
  favourites: (() => {
    try {
      const savedFavourites = localStorage.getItem("favourites");
      return savedFavourites ? JSON.parse(savedFavourites) : [];
    } catch (e) {
      console.error("Error parsing favourites from localStorage:", e);
      return [];
    }
  })(),
  addFavourite: (character) =>
    set((state) => {
      const updatedFavourites = [...state.favourites, character];
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      return { favourites: updatedFavourites };
    }),
  removeFavourite: (name) =>
    set((state) => {
      const updatedFavourites = state.favourites.filter(
        (fav) => fav.name !== name
      );
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      return { favourites: updatedFavourites };
    }),
}));
