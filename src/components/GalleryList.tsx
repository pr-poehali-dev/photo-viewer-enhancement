
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PhotoModal } from "@/components/PhotoModal";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Photo {
  id: string;
  title: string;
  src: string;
  alt: string;
  tags: string[];
}

interface GalleryListProps {
  photos: Photo[];
  gapSize: number;
  showDeleteControls: boolean;
  onDeletePhoto: (id: string) => void;
}

export const GalleryList = ({ 
  photos, 
  gapSize, 
  showDeleteControls,
  onDeletePhoto 
}: GalleryListProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  return (
    <>
      <div 
        className="flex flex-col"
        style={{ gap: `${gapSize}px` }}
      >
        {photos.map((photo) => (
          <Card 
            key={photo.id} 
            className="animate-fade-in hover:shadow-md transition-shadow duration-300 group"
          >
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-full md:w-48 h-32 overflow-hidden rounded-md">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 cursor-pointer"
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
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 cursor-pointer hover:text-primary transition-colors duration-200" onClick={() => setSelectedPhoto(photo)}>
                    {photo.title}
                  </h3>
                  <p className="text-muted-foreground mb-3">{photo.alt}</p>
                  <div className="flex flex-wrap gap-2">
                    {photo.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-secondary px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex md:flex-col gap-2 mt-4 md:mt-0 justify-end">
                  {showDeleteControls && (
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="md:hidden"
                      onClick={() => onDeletePhoto(photo.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Удалить
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    Просмотр
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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
