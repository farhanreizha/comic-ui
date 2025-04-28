import { Comic, Chapter, ComicFilter } from "~/types/comic";

// Data contoh untuk komik
const sampleComics: Comic[] = [
  {
    id: "1",
    title: "One Piece",
    description: "Petualangan Monkey D. Luffy dan kru bajak lautnya dalam mencari harta karun legendaris One Piece.",
    author: "Eiichiro Oda",
    coverImage: "https://picsum.photos/400/600",
    genres: ["Petualangan", "Aksi", "Komedi", "Fantasi"],
    chapters: [
      {
        id: "1-1",
        comicId: "1",
        number: 1,
        title: "Romance Dawn",
        pages: Array.from({ length: 45 }, (_, i) => `https://picsum.photos/800/1200?random=${i + 1}`),
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-01T00:00:00Z",
      },
      {
        id: "1-2",
        comicId: "1",
        number: 2,
        title: 'Mereka Menyebutnya "Topi Jerami"',
        pages: Array.from({ length: 40 }, (_, i) => `https://picsum.photos/800/1200?random=${i + 46}`),
        createdAt: "2023-01-08T00:00:00Z",
        updatedAt: "2023-01-08T00:00:00Z",
      },
    ],
    status: "ongoing",
    rating: 4.9,
    views: 1000000,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-08T00:00:00Z",
  },
  {
    id: "2",
    title: "Naruto",
    description:
      "Kisah Naruto Uzumaki, seorang ninja muda yang berusaha mendapatkan pengakuan dari penduduk desanya dan bercita-cita menjadi Hokage.",
    author: "Masashi Kishimoto",
    coverImage: "https://picsum.photos/400/600",
    genres: ["Aksi", "Petualangan", "Fantasi"],
    chapters: [
      {
        id: "2-1",
        comicId: "2",
        number: 1,
        title: "Uzumaki Naruto",
        pages: Array.from({ length: 50 }, (_, i) => `https://picsum.photos/800/1200?random=${i + 86}`),
        createdAt: "2023-01-02T00:00:00Z",
        updatedAt: "2023-01-02T00:00:00Z",
      },
    ],
    status: "completed",
    rating: 4.7,
    views: 950000,
    createdAt: "2023-01-02T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
  },
  {
    id: "3",
    title: "Demon Slayer",
    description:
      "Tanjiro Kamado berusaha menjadi pemburu iblis untuk membalas dendam keluarganya dan menyembuhkan adiknya yang berubah menjadi iblis.",
    author: "Koyoharu Gotouge",
    coverImage: "https://picsum.photos/400/600",
    genres: ["Aksi", "Fantasi", "Horor"],
    chapters: [
      {
        id: "3-1",
        comicId: "3",
        number: 1,
        title: "Takdir Kejam",
        pages: Array.from({ length: 48 }, (_, i) => `https://picsum.photos/800/1200?random=${i + 136}`),
        createdAt: "2023-01-03T00:00:00Z",
        updatedAt: "2023-01-03T00:00:00Z",
      },
    ],
    status: "completed",
    rating: 4.8,
    views: 850000,
    createdAt: "2023-01-03T00:00:00Z",
    updatedAt: "2023-01-03T00:00:00Z",
  },
  {
    id: "4",
    title: "My Hero Academia",
    description:
      "Dalam dunia di mana sebagian besar populasi memiliki kekuatan super, Izuku Midoriya yang tidak memiliki kekuatan berjuang untuk menjadi pahlawan terhebat.",
    author: "Kohei Horikoshi",
    coverImage: "https://picsum.photos/400/600",
    genres: ["Aksi", "Komedi", "Sekolah", "Superhero"],
    chapters: [
      {
        id: "4-1",
        comicId: "4",
        number: 1,
        title: "Izuku Midoriya: Asal Usul",
        pages: Array.from({ length: 52 }, (_, i) => `https://picsum.photos/800/1200?random=${i + 184}`),
        createdAt: "2023-01-04T00:00:00Z",
        updatedAt: "2023-01-04T00:00:00Z",
      },
    ],
    status: "ongoing",
    rating: 4.6,
    views: 750000,
    createdAt: "2023-01-04T00:00:00Z",
    updatedAt: "2023-01-04T00:00:00Z",
  },
];

// Fungsi untuk mendapatkan semua komik
export const getAllComics = async (filter?: ComicFilter): Promise<Comic[]> => {
  // Simulasi delay seperti API call asli
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredComics = [...sampleComics];

  // Terapkan filter jika ada
  if (filter) {
    if (filter.genre) {
      filteredComics = filteredComics.filter((comic) => comic.genres.some((genre) => genre.toLowerCase() === filter.genre?.toLowerCase()));
    }

    if (filter.status) {
      filteredComics = filteredComics.filter((comic) => comic.status === filter.status);
    }

    // Urutkan hasil
    if (filter.sortBy) {
      switch (filter.sortBy) {
        case "latest":
          filteredComics.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
          break;
        case "popular":
          filteredComics.sort((a, b) => b.views - a.views);
          break;
        case "rating":
          filteredComics.sort((a, b) => b.rating - a.rating);
          break;
      }
    }
  }

  return filteredComics;
};

// Fungsi untuk mendapatkan komik berdasarkan ID
export const getComicById = async (id: string): Promise<Comic | null> => {
  // Simulasi delay seperti API call asli
  await new Promise((resolve) => setTimeout(resolve, 300));

  const comic = sampleComics.find((comic) => comic.id === id);
  return comic || null;
};

// Fungsi untuk mendapatkan chapter berdasarkan ID komik dan nomor chapter
export const getChapter = async (comicId: string, chapterNumber: number): Promise<Chapter | null> => {
  // Simulasi delay seperti API call asli
  await new Promise((resolve) => setTimeout(resolve, 300));

  const comic = await getComicById(comicId);
  if (!comic) return null;

  const chapter = comic.chapters.find((chapter) => chapter.number === chapterNumber);
  return chapter || null;
};

// Fungsi untuk mendapatkan genre yang tersedia
export const getAvailableGenres = async (): Promise<string[]> => {
  // Simulasi delay seperti API call asli
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Kumpulkan semua genre dari semua komik dan hilangkan duplikat
  const genres = new Set<string>();
  sampleComics.forEach((comic) => {
    comic.genres.forEach((genre) => genres.add(genre));
  });

  return Array.from(genres).sort();
};

export const getComicByGenre = async (genre: string): Promise<Comic[]> => {
  // Simulasi delay seperti API call asli
  await new Promise((resolve) => setTimeout(resolve, 200));

  return sampleComics.filter((comic) => comic.genres.includes(genre));
};
