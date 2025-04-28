import { FC } from "react";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">KomikKu</h3>
            <p className="text-gray-400">Platform pembaca komik online terbaik dengan koleksi komik terlengkap.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Tautan</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/comics" className="text-gray-400 hover:text-white transition-colors">
                  Daftar Komik
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-gray-400 hover:text-white transition-colors">
                  Favorit
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Kontak</h3>
            <p className="text-gray-400 mb-2">Email: info@komikku.com</p>
            <p className="text-gray-400">Telepon: (021) 123-4567</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} KomikKu. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
