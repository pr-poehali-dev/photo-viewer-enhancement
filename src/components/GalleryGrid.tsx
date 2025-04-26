
import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PhotoModal } from "@/components/PhotoModal";

interface Photo {
  id: string;
  title: string;
  src: string;
  alt: string;
  tags: string[];
}

interface GalleryGridProps {
  photos: Photo[];
  gapSize: number;
}

export const GalleryGrid = ({ photos, gapSize }: GalleryGridProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  return (
    <>
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        style={{ gap: `${gapSize}px` }}
      >
        {photos.map((photo) => (
          <Card 
            key={photo.id} 
            className="overflow-hidden animate-fade-in hover:shadow-md transition-shadow duration-300"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="overflow-hidden">
              <AspectRatio ratio={4/3}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 cursor-pointer"
                />
              </AspectRatio>
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
