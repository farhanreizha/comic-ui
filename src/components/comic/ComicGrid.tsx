import { FC } from "react";
import { Comic } from "~/types/comic";
import ComicCard from "./ComicCard";
import { Card } from "~/components/ui/card";

interface ComicGridProps {
  comics: Comic[];
  title?: string;
}

const ComicGrid: FC<ComicGridProps> = ({ comics, title }) => {
  return (
    <div>
      {title && (
        <Card className="mb-2 p-4 bg-transparent border-none">
          <h2 className="text-2xl font-bold">{title}</h2>
        </Card>
      )}

      {comics.length === 0 ? (
        <Card className="text-center py-8">
          <p className="text-muted-foreground">Tidak ada komik yang ditemukan.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {comics.map((comic) => (
            <ComicCard key={comic.id} comic={comic} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ComicGrid;
