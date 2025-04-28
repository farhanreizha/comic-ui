import { useEffect, useState } from "react";
import { Comic } from "~/types/comic";

export default function useFavorites() {
  const [favorites, setFavorites] = useState<Comic[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const addFavorite = (comic: Comic) => {
    const updated = [...favorites, comic];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
  };
}
