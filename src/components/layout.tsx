
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Image as ImageIcon, 
  Home, 
  User, 
  Settings, 
  LogOut 
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background sticky top-0 z-10 border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <ImageIcon className="h-6 w-6" />
              <span>ФотоГалерея</span>
            </Link>
            
            <nav className="hidden md:flex ml-10">
              <ul className="flex gap-6">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Альбомы
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="text-muted-foreground hover:text-foreground transition-colors">
                    Все фото
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="border-t py-6 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground text-sm">
                &copy; {new Date().getFullYear()} ФотоГалерея. Все права защищены.
              </p>
            </div>
            <div className="flex gap-6">
              <Link to="/" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                Политика конфиденциальности
              </Link>
              <Link to="/" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
