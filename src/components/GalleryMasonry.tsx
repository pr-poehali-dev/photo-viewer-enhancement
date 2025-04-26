
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PhotoModal } from "@/components/PhotoModal";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Photo {
  id: string;
  title: string;
  src: string;
  alt: string;
  tags: string[];
}

interface GalleryMasonryProps {
  photos: Photo[];
  gapSize: number;
  showDeleteControls: boolean;
  onDeletePhoto: (id: string) => void;
}

export const GalleryMasonry = ({ 
  photos, 
  gapSize,
  showDeleteControls,
  onDeletePhoto 
}: GalleryMasonryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  // Функция для распределения фотографий по колонкам
  const distributePhotos = () => {
    const columns = 3; // На десктопе всегда 3 колонки
    const result: Photo[][] = Array.from({ length: columns }, () => []);
    
    photos.forEach((photo, index) => {
      const columnIndex = index % columns;
      result[columnIndex].push(photo);
    });
    
    return result;
  };
  
  const photoColumns = distributePhotos();
  
  return (
    <>
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{ gap: `${gapSize}px` }}
      >
        {photoColumns.map((column, columnIndex) => (
          <div 
            key={columnIndex} 
            className="flex flex-col"
            style={{ gap: `${gapSize}px` }}
          >
            {column.map((photo) => {
              // Вычисляем случайную высоту для фото (для эффекта мазонри)
              const randomHeight = Math.max(200, Math.floor(Math.random() * 200) + 200);
              
              return (
                <Card 
                  key={photo.id} 
                  className="overflow-hidden animate-fade-in hover:shadow-md transition-shadow duration-300 group relative"
                >
                  <div className="overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="object-cover w-full transition-transform duration-300 hover:scale-105 cursor-pointer"
                      style={{ height: `${randomHeight}px` }}
                      onClick={() => setSelectedPhoto(photo)}
                    />
                    
                    {showDeleteControls && (
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeletePhoto(photo.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <CardFooter className="p-2 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-sm truncate">{photo.title}</h3>
                    </div>
                    <div className="flex gap-1">
                      {photo.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ))}
      </div>
      
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          isOpen={!!selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onDelete={onDeletePhoto}
        />
      )}
    </>
  );
};
