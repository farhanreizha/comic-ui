import { FC, useState } from "react";
import Image from "next/image";
import { Chapter } from "~/types/comic";
import { Card } from "../ui/card";

interface ComicReaderProps {
  chapter: Chapter;
  onPrevPage: () => void;
  onNextPage: () => void;
  currentPage: number;
  totalPages: number;
}

const ComicReader: FC<ComicReaderProps> = ({ chapter, onPrevPage, onNextPage, currentPage, totalPages }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      onPrevPage();
    } else if (e.key === "ArrowRight") {
      onNextPage();
    }
  };

  return (
    <Card className="rounded-lg shadow-md p-4 mb-6 focus:outline-none bg-transparent border-none" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="relative w-full max-w-3xl mx-auto">
        <div className={`cursor-pointer transition-transform ${isZoomed ? "scale-125" : ""}`} onClick={toggleZoom}>
          <Image
            src={chapter.pages[currentPage]}
            alt={`Chapter ${chapter.number} - Halaman ${currentPage + 1}`}
            width={800}
            height={1200}
            className="w-full h-auto"
            priority
          />
        </div>

        <div className="absolute inset-0 flex justify-between items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevPage();
            }}
            className="h-full w-1/3 bg-transparent focus:outline-none"
            aria-label="Halaman sebelumnya"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNextPage();
            }}
            className="h-full w-1/3 bg-transparent focus:outline-none"
            aria-label="Halaman berikutnya"
          />
        </div>
      </div>

      <div className="mt-4 text-center text-gray-200">
        <p>
          Halaman {currentPage + 1} dari {totalPages}
        </p>
        <p className="text-sm mt-1 text-muted-foreground">Klik gambar untuk memperbesar. Gunakan tombol panah kiri/kanan untuk navigasi.</p>
      </div>
    </Card>
  );
};

export default ComicReader;
