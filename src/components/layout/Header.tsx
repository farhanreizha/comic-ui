import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-blue-400 transition-colors">
            KomikKu
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/comics" className="hover:text-blue-400 transition-colors">
                  Daftar Komik
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-blue-400 transition-colors">
                  Favorit
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
