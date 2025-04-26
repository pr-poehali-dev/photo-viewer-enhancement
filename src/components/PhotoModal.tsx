
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw]">
        <DialogHeader>
          <DialogTitle className="text-xl">{photo.title}</DialogTitle>
          <DialogDescription>{photo.alt}</DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 overflow-hidden">
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full object-contain max-h-[70vh]"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {photo.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
