"use client";
import MainLayout from "~/components/layout/MainLayout";
import ComicGrid from "~/components/comic/ComicGrid";
import useFavorites from "~/hooks/use-favorites";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="mb-6 text-3xl font-bold">Komik Favorit</h1>
        <ComicGrid comics={favorites} />
      </div>
    </MainLayout>
  );
}
