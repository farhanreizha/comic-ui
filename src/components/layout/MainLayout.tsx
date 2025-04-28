import { FC, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Card } from "~/components/ui/card";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="p-0 bg-transparent shadow-none border-none">{children}</Card>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
