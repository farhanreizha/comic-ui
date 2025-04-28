"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MainLayout from "~/components/layout/MainLayout";
import ComicGrid from "~/components/comic/ComicGrid";
import { Comic, ComicFilter } from "~/types/comic";
import { getAllComics, getAvailableGenres } from "~/services/comicService";

export default function ComicsPage() {
  const searchParams = useSearchParams();
  const genreParam = searchParams.get("genre");
  const statusParam = searchParams.get("status") as "ongoing" | "completed" | null;

  const [comics, setComics] = useState<Comic[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [filter, setFilter] = useState<ComicFilter>({
    genre: genreParam || undefined,
    status: statusParam || undefined,
    sortBy: "latest",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Ambil semua komik dengan filter
        const allComics = await getAllComics(filter);
        setComics(allComics);

        // Ambil genre yang tersedia
        const availableGenres = await getAvailableGenres();
        setGenres(availableGenres);
      } catch (error) {
        console.error("Error fetching comics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  // Update filter saat parameter URL berubah
  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      genre: genreParam || undefined,
      status: statusParam || undefined,
    }));
  }, [genreParam, statusParam]);

  const handleSortChange = (sortBy: "latest" | "popular" | "rating") => {
    setFilter((prev) => ({ ...prev, sortBy }));
  };

  const handleStatusChange = (status: "ongoing" | "completed" | undefined) => {
    setFilter((prev) => ({ ...prev, status }));
  };

  const handleGenreChange = (genre: string | undefined) => {
    setFilter((prev) => ({ ...prev, genre }));
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Daftar Komik</h1>

        <div className="bg-card p-4 rounded-xl shadow-sm border mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-muted-foreground mb-1">Urutkan</label>
              <select
                className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground"
                value={filter.sortBy}
                onChange={(e) => handleSortChange(e.target.value as any)}
              >
                <option value="latest">Terbaru</option>
                <option value="popular">Populer</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-muted-foreground mb-1">Status</label>
              <select
                className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground"
                value={filter.status || ""}
                onChange={(e) => handleStatusChange(e.target.value as any)}
              >
                <option value="">Semua</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-muted-foreground mb-1">Genre</label>
              <select
                className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground"
                value={filter.genre || ""}
                onChange={(e) => handleGenreChange(e.target.value || undefined)}
              >
                <option value="">Semua</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ComicGrid comics={comics} title="Daftar Komik" />
      )}
    </MainLayout>
  );
}
