
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { PhotoModal } from "@/components/PhotoModal";

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
}

export const GalleryMasonry = ({ photos, gapSize }: GalleryMasonryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  // Распределяем фотографии на колонки для мазонри-раскладки
  const getColumnPhotos = () => {
    const columns: Photo[][] = [[], [], []];
    
    photos.forEach((photo, index) => {
      columns[index % 3].push(photo);
    });
    
    return columns;
  };
  
  const columns = getColumnPhotos();
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: `${gapSize}px` }}>
        {columns.map((columnPhotos, colIndex) => (
          <div key={colIndex} className="flex flex-col" style={{ gap: `${gapSize}px` }}>
            {columnPhotos.map((photo) => (
              <Card 
                key={photo.id} 
                className="overflow-hidden animate-fade-in hover:shadow-md transition-shadow duration-300"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative overflow-hidden cursor-pointer">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="text-white font-medium text-sm">{photo.title}</h3>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {photo.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
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
