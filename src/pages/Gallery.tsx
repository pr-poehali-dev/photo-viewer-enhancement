
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { HomeIcon, Grid, Rows, Images, ChevronLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { GalleryGrid } from "@/components/GalleryGrid";
import { GalleryList } from "@/components/GalleryList";
import { GalleryMasonry } from "@/components/GalleryMasonry";

// Пример данных фотографий
const photos = [
  {
    id: "1",
    title: "Горный пейзаж",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    alt: "Горы на закате",
    tags: ["природа", "горы"]
  },
  {
    id: "2",
    title: "Побережье океана",
    src: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e",
    alt: "Морской берег с волнами",
    tags: ["природа", "море"]
  },
  {
    id: "3",
    title: "Городской пейзаж",
    src: "https://images.unsplash.com/photo-1514565131-fce0801e5785",
    alt: "Ночной город",
    tags: ["город", "архитектура"]
  },
  {
    id: "4",
    title: "Цветочная поляна",
    src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    alt: "Поле цветов",
    tags: ["природа", "цветы"]
  },
  {
    id: "5",
    title: "Лесная тропинка",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    alt: "Тропинка в лесу",
    tags: ["природа", "лес"]
  },
  {
    id: "6",
    title: "Мост над рекой",
    src: "https://images.unsplash.com/photo-1596825205280-4436ec8b9f9e",
    alt: "Современный мост",
    tags: ["архитектура", "город"]
  }
];

type ViewMode = "grid" | "list" | "masonry";

const Gallery = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gapSize, setGapSize] = useState([16]);
  
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary py-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon" className="text-primary-foreground">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-primary-foreground flex items-center gap-2">
                <Images className="h-8 w-8" />
                Все фотографии
              </h1>
            </div>
            <Link to="/">
              <Button variant="secondary" className="flex items-center gap-2">
                <HomeIcon className="h-4 w-4" />
                На главную
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-6">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant={viewMode === "grid" ? "default" : "outline"} 
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-5 w-5" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "outline"} 
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <Rows className="h-5 w-5" />
            </Button>
            <Button 
              variant={viewMode === "masonry" ? "default" : "outline"} 
              size="icon"
              onClick={() => setViewMode("masonry")}
            >
              <Images className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm">Отступ:</span>
            <Slider
              value={gapSize}
              onValueChange={setGapSize}
              max={48}
              min={0}
              step={4}
              className="w-32"
            />
            <span className="text-sm w-10">{gapSize[0]}px</span>
          </div>
          
          <Select defaultValue="date-desc">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Сначала новые</SelectItem>
              <SelectItem value="date-asc">Сначала старые</SelectItem>
              <SelectItem value="name-asc">По названию (А-Я)</SelectItem>
              <SelectItem value="name-desc">По названию (Я-А)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Separator className="mb-6" />
        
        {viewMode === "grid" && (
          <GalleryGrid photos={photos} gapSize={gapSize[0]} />
        )}
        
        {viewMode === "list" && (
          <GalleryList photos={photos} gapSize={gapSize[0]} />
        )}
        
        {viewMode === "masonry" && (
          <GalleryMasonry photos={photos} gapSize={gapSize[0]} />
        )}
      </div>
    </div>
  );
};

export default Gallery;
