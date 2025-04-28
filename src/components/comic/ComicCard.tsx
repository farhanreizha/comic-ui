import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Comic } from "~/types/comic";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { EyeIcon, StarIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface ComicCardProps {
  comic: Comic;
}

const ComicCard: FC<ComicCardProps> = ({ comic }) => {
  return (
    <Card className="overflow-hidden transition-transform hover:scale-105 py-0">
      <Link href={`/comics/${comic.id}`}>
        <CardHeader className="px-0">
          <div className="relative h-64 w-full rounded overflow-hidden">
            <Image src={comic.coverImage} alt={comic.title} fill className="object-cover" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-1 truncate">{comic.title}</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">{comic.author}</span>
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
          <div className="flex items-center text-sm text-muted-foreground gap-4">
            <span className="flex items-center gap-1">
              <StarIcon className="size-4" />
              {comic.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-1">
              <EyeIcon className="size-4" />
              {comic.views.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ComicCard;
