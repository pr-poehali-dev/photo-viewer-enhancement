
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PhotoModal } from "@/components/PhotoModal";

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
}

export const GalleryList = ({ photos, gapSize }: GalleryListProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  return (
    <>
      <div className="flex flex-col" style={{ gap: `${gapSize}px` }}>
        {photos.map((photo) => (
          <Card 
            key={photo.id} 
            className="overflow-hidden animate-fade-in hover:shadow-md transition-shadow duration-300"
          >
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div 
                  className="w-full md:w-1/3 cursor-pointer" 
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="object-cover w-full h-48 md:h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between w-full md:w-2/3">
                  <div>
                    <h3 className="text-xl font-medium mb-2">{photo.title}</h3>
                    <p className="text-muted-foreground mb-4">{photo.alt}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {photo.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-secondary px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
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
        />
      )}
    </>
  );
};
