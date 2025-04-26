
import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
  orientation?: "portrait" | "landscape";
  albumId?: string;
}

interface GalleryGridProps {
  photos: Photo[];
  gapSize: number;
  onDeletePhoto: (id: string) => void;
}

export const GalleryGrid = ({ 
  photos, 
  gapSize, 
  onDeletePhoto 
}: GalleryGridProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  return (
    <>
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        style={{ 
          gap: `${gapSize}px`
        }}
      >
        {photos.map((photo) => {
          // Определение соотношения для каждого фото индивидуально
          const aspectRatio = photo.orientation === 'landscape' ? 3/2 : 2/3; // 15x10 или 10x15
          
          return (
            <Card 
              key={photo.id} 
              className="overflow-hidden animate-fade-in hover:shadow-md transition-shadow duration-300 group relative"
            >
              <div className="overflow-hidden">
                <AspectRatio ratio={aspectRatio}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                  />
                </AspectRatio>
                
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
