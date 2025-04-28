"use client";

import { useEffect, useState } from "react";
import MainLayout from "~/components/layout/MainLayout";
import ComicGrid from "~/components/comic/ComicGrid";
import { Comic } from "~/types/comic";
import { getAllComics, getAvailableGenres, getComicByGenre } from "~/services/comicService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { Card } from "~/components/ui/card";
import { HeroPattern } from "~/assets/hero-pattern";

export default function Home() {
  const [latestComics, setLatestComics] = useState<Comic[]>([]);
  const [popularComics, setPopularComics] = useState<Comic[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>(""); // State untuk menyimpan genre yang dipilih
  const [comicsByGenre, setComicsByGenre] = useState<Comic[]>([]); // State untuk menyimpan komik berdasarkan genre
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Ambil komik terbaru
        const latest = await getAllComics({ sortBy: "latest" });
        setLatestComics(latest.slice(0, 5));

        // Ambil komik populer
        const popular = await getAllComics({ sortBy: "popular" });
        setPopularComics(popular.slice(0, 5));

        // Ambil genre yang tersedia
        const availableGenres = await getAvailableGenres();
        setSelectedGenre(availableGenres[0]); // Set genre default ke Action
        setGenres(availableGenres);

        // Ambil komik berdasarkan genre
        const comicByGenre = await getComicByGenre(availableGenres[0]);
        setComicsByGenre(comicByGenre);
      } catch (error) {
        console.error("Error fetching comics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <section className="mb-12">
            <Card className="relative overflow-hidden rounded-2xl p-12 text-muted-foreground mb-8 shadow-2xl">
              <div className="relative z-10">
                <h1 className="text-5xl font-bold mb-6 bg-clip-text animate-fade-in">Selamat Datang di KomikKu</h1>
                <p className="text-xl mb-8 max-w-2xl leading-relaxed opacity-90">
                  Platform pembaca komik online terbaik dengan koleksi komik terlengkap. Temukan berbagai genre komik favoritmu disini.
                </p>
                <Button size="lg" variant="secondary" className="font-semibold hover:scale-105 transition-transform cursor-pointer">
                  Jelajahi Komik
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className={`absolute inset-0 opacity-40`}>
                <HeroPattern />
              </div>
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -left-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            </Card>
          </section>

          <section className="mb-12">
            <ComicGrid comics={latestComics} title="Komik Terbaru" />
          </section>

          <section className="mb-12">
            <ComicGrid comics={popularComics} title="Komik Populer" />
          </section>

          <section className="mb-12 w-full">
            <h2 className="text-2xl font-bold mb-6">Genre</h2>
            <div className="flex flex-wrap gap-3">
              <Tabs
                defaultValue={selectedGenre}
                value={selectedGenre}
                onValueChange={async (value) => {
                  setSelectedGenre(value);
                  const comicByGenre = await getComicByGenre(value);
                  setComicsByGenre(comicByGenre);
                }}
                className="w-full"
              >
                <TabsList className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <TabsTrigger key={genre} value={genre} className="cursor-pointer">
                      {genre}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value={selectedGenre} className="w-full">
                  <ComicGrid comics={comicsByGenre} title={`Komik ${selectedGenre}`} />
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </>
      )}
    </MainLayout>
  );
}
