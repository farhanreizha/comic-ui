"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import MainLayout from "~/components/layout/MainLayout";
import ComicReader from "~/components/comic/ComicReader";
import { Comic, Chapter } from "~/types/comic";
import { getComicById, getChapter } from "~/services/comicService";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";

export default function ComicReaderPage() {
  const router = useRouter();
  const { id, chapterNumber } = useParams();
  const [comic, setComic] = useState<Comic | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Ambil data komik
        const comicData = await getComicById(id as string);
        setComic(comicData);

        // Ambil data chapter
        const chapterData = await getChapter(id as string, Number(chapterNumber));
        setChapter(chapterData);

        // Reset halaman ke awal saat ganti chapter
        setCurrentPage(0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id && chapterNumber) {
      fetchData();
    }
  }, [id, chapterNumber]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (chapter && currentPage < chapter.pages.length - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevChapter = () => {
    if (comic && chapter) {
      const chapterIndex = comic.chapters.findIndex((c) => c.number === chapter.number);
      if (chapterIndex > 0) {
        const prevChapter = comic.chapters[chapterIndex - 1];
        router.push(`/comics/${comic.id}/chapters/${prevChapter.number}`);
      }
    }
  };

  const handleNextChapter = () => {
    if (comic && chapter) {
      const chapterIndex = comic.chapters.findIndex((c) => c.number === chapter.number);
      if (chapterIndex < comic.chapters.length - 1) {
        const nextChapter = comic.chapters[chapterIndex + 1];
        router.push(`/comics/${comic.id}/chapters/${nextChapter.number}`);
      }
    }
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

  if (!comic || !chapter) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Chapter Tidak Ditemukan</h2>
          <p className="mb-6">Maaf, chapter yang Anda cari tidak tersedia.</p>
          <Link href={`/comics/${id}`} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Kembali ke Detail Komik
          </Link>
        </div>
      </MainLayout>
    );
  }

  const hasPrevPage = currentPage > 0;
  const hasNextPage = currentPage < chapter.pages.length - 1;
  const hasPrevChapter = comic.chapters.findIndex((c) => c.number === chapter.number) > 0;
  const hasNextChapter = comic.chapters.findIndex((c) => c.number === chapter.number) < comic.chapters.length - 1;

  return (
    <MainLayout>
      <div className="mb-6">
        <Card className="mb-4">
          <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-2xl font-bold">{comic.title}</h1>
              <h2 className="text-lg text-muted-foreground">
                Chapter {chapter.number}
                {chapter.title ? `: ${chapter.title}` : ""}
              </h2>
            </div>
            <Link href={`/comics/${comic.id}`}>
              <Button variant="outline" className="mt-2 sm:mt-0">
                Kembali ke Detail Komik
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="flex flex-wrap gap-2">
              <Button onClick={handlePrevChapter} disabled={!hasPrevChapter} variant="secondary">
                Chapter Sebelumnya
              </Button>
              <Button onClick={handlePrevPage} disabled={!hasPrevPage} variant="secondary">
                Halaman Sebelumnya
              </Button>
            </div>
            <div className="text-center">
              <span className="text-muted-foreground">
                Halaman {currentPage + 1} dari {chapter.pages.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleNextPage} disabled={!hasNextPage} variant="secondary">
                Halaman Berikutnya
              </Button>
              <Button onClick={handleNextChapter} disabled={!hasNextChapter} variant="secondary">
                Chapter Berikutnya
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <ComicReader
        chapter={chapter}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        currentPage={currentPage}
        totalPages={chapter.pages.length}
      />

      <Card className="mb-4">
        <CardContent className="flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap gap-2">
            <Button onClick={handlePrevChapter} disabled={!hasPrevChapter} variant="secondary">
              Chapter Sebelumnya
            </Button>
            <Button onClick={handlePrevPage} disabled={!hasPrevPage} variant="secondary">
              Halaman Sebelumnya
            </Button>
          </div>
          <div className="text-center">
            <span className="text-muted-foreground">
              Halaman {currentPage + 1} dari {chapter.pages.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleNextPage} disabled={!hasNextPage} variant="secondary">
              Halaman Berikutnya
            </Button>
            <Button onClick={handleNextChapter} disabled={!hasNextChapter} variant="secondary">
              Chapter Berikutnya
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold mb-3">Navigasi Chapter</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {comic.chapters
            .slice()
            .sort((a, b) => a.number - b.number)
            .map((c) => (
              <Button
                key={c.id}
                variant="outline"
                className={cn("text-center p-2", {
                  "bg-blue-500 hover:border-blue-500 hover:text-blue-500": c.number === chapter.number,
                  "border-gray-200": c.number !== chapter.number,
                })}
                asChild
              >
                <Link href={`/comics/${comic.id}/chapters/${c.number}`}>Ch. {c.number}</Link>
              </Button>
            ))}
        </div>
      </Card>
    </MainLayout>
  );
}
