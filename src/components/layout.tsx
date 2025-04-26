
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">ФотоГалерея</Link>
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Альбомы
            </Link>
            <Link to="/gallery" className="text-muted-foreground hover:text-foreground transition-colors">
              Все фото
            </Link>
            <Button variant="outline" size="sm">
              Войти
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t py-6 mt-10">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          &copy; 2025 ФотоГалерея. Все права защищены.
        </div>
      </footer>
    </div>
  );
}
