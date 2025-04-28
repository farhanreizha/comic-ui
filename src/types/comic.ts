export interface Comic {
  id: string;
  title: string;
  description: string;
  author: string;
  coverImage: string;
  genres: string[];
  chapters: Chapter[];
  status: "ongoing" | "completed";
  rating: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: string;
  comicId: string;
  number: number;
  title: string;
  coverImage: string;
  pages: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ComicFilter {
  genre?: string;
  status?: "ongoing" | "completed";
  sortBy?: "latest" | "popular" | "rating";
}
