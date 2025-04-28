"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import MainLayout from "~/components/layout/MainLayout";
import { Comic } from "~/types/comic";
import { getComicById } from "~/services/comicService";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import useFavorites from "~/hooks/use-favorites";
import { BookmarkIcon, StarIcon } from "lucide-react";
import { cn } from "~/lib/utils";

export default function ComicDetailPage() {
  const { id } = useParams();
  const [comic, setComic] = useState<Comic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addFavorite, favorites, removeFavorite } = useFavorites();
  const isFavorite = favorites.some((f) => f.id === comic?.id);

  useEffect(() => {
    const fetchComic = async () => {
      try {
        setIsLoading(true);
        const comicData = await getComicById(id as string);
        setComic(comicData);
      } catch (error) {
        console.error("Error fetching comic:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchComic();
    }
  }, [id]);

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    isFavorite ? removeFavorite(comic?.id as string) : addFavorite(comic as Comic);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  }

  if (!comic) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Komik Tidak Ditemukan</h2>
          <p className="mb-6">Maaf, komik yang Anda cari tidak tersedia.</p>
          <Link href="/comics" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Kembali ke Daftar Komik
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Card className="rounded-lg shadow-md overflow-hidden mb-8 text-foreground">
        <div className="md:flex">
          <div className="md:w-1/3 lg:w-1/4 p-6">
            <div className="relative h-96 w-full">
              <Image src={comic.coverImage} alt={comic.title} fill className="object-cover rounded-lg" />
            </div>
          </div>
          <div className="md:w-2/3 lg:w-3/4 p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{comic.title}</h1>
              <Badge
                variant={comic.status === "ongoing" ? "outline" : "default"}
                className={cn("font-medium uppercase", {
                  "text-primary border-primary bg-blue-300": comic.status === "ongoing",
                  "bg-green-100 text-green-800 border-green-300": comic.status === "completed",
                })}
              >
                {comic.status === "ongoing" ? "Ongoing" : "Completed"}
              </Badge>
            </div>

            <div className="mb-4">
              <p className="text-muted-foreground mb-2">
                <span className="font-semibold">Penulis:</span> {comic.author}
              </p>
              <div className="flex items-center mb-2 text-muted-foreground">
                <span className="font-semibold mr-2">Rating:</span>
                <div className="flex items-center">
                  <StarIcon className="h-4 w-4 text-yellow-500" fill="currentColor" />
                  <span className="ml-1">{comic.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-2">
                <span className="font-semibold">Views:</span> {comic.views.toLocaleString()}
              </p>
              <p className="text-muted-foreground mb-2">
                <span className="font-semibold">Terakhir Update:</span> {new Date(comic.updatedAt).toLocaleDateString("id-ID")}
              </p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Genre</h2>
              <div className="flex flex-wrap gap-2">
                {comic.genres.map((genre) => (
                  <Link key={genre} href={`/comics?genre=${genre}`}>
                    <Badge className="rounded-xl text-sm transition-colors hover:bg-transparent hover:border hover:border-primary hover:text-primary px-3 py-1 text-center">
                      {genre}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Sinopsis</h2>
              <p className="text-muted-foreground">{comic.description}</p>
            </div>
            <Button size="icon" variant="ghost" onClick={handleFavorite}>
              <BookmarkIcon
                className={cn("size-7", {
                  "text-yellow-400": isFavorite,
                })}
                fill="currentColor"
              />
            </Button>
          </div>
        </div>
      </Card>

      <Card className="text-foreground rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Daftar Chapter</h2>
        {comic.chapters.length === 0 ? (
          <p className="text-muted-foreground">Belum ada chapter yang tersedia.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comic.chapters
              .slice()
              .sort((a, b) => b.number - a.number)
              .map((chapter) => (
                <Button variant="outline" key={chapter.id} asChild>
                  <Link
                    href={`/comics/${comic.id}/chapters/${chapter.number}`}
                    className="h-20 flex flex-col justify-center items-start overflow-hidden"
                  >
                    <div className="flex gap-3 items-center w-full">
                      <div className="relative rounded overflow-hidden size-14">
                        <Image src={comic.coverImage} alt={comic.title} fill className="object-cover rounded-lg" />
                      </div>
                      <div className="w-full">
                        <div className="w-full flex justify-between items-center">
                          <span className="font-medium">Chapter {chapter.number}</span>
                          <span className="text-sm text-gray-500">{new Date(chapter.createdAt).toLocaleDateString("id-ID")}</span>
                        </div>
                        {chapter.title && <p className="text-muted-foreground mt-1">{chapter.title}</p>}
                      </div>
                    </div>
                  </Link>
                </Button>
              ))}
          </div>
        )}
      </Card>
    </MainLayout>
  );
}
