import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Comic } from "~/types/comic";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

interface ComicCardProps {
  comic: Comic;
}

const ComicCard: FC<ComicCardProps> = ({ comic }) => {
  return (
    <Card className="overflow-hidden transition-transform hover:scale-105">
      <Link href={`/comics/${comic.id}`}>
        <div className="relative h-64 w-full">
          <Image src={comic.coverImage} alt={comic.title} fill className="object-cover" />
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-1 truncate">{comic.title}</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">{comic.author}</span>
            <Badge
              variant={comic.status === "ongoing" ? "outline" : "default"}
              className={comic.status === "ongoing" ? "text-primary border-primary" : "bg-green-100 text-green-800 border-green-300"}
            >
              {comic.status === "ongoing" ? "Ongoing" : "Completed"}
            </Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground gap-4">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              {comic.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              {comic.views.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ComicCard;
