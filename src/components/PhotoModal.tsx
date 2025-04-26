
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Photo {
  id: string;
  title: string;
  src: string;
  alt: string;
  tags: string[];
}

interface PhotoModalProps {
  photo: Photo;
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoModal = ({ photo, isOpen, onClose }: PhotoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{photo.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full object-contain max-h-[70vh]"
          />
          <div className="mt-4">
            <p className="text-muted-foreground">{photo.alt}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {photo.tags.map((tag) => (
                <span key={tag} className="text-xs bg-secondary px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
