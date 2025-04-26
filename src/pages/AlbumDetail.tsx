
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Upload, Trash2, Edit, Printer } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Photo {
  id: string;
  title: string;
  src: string;
  alt: string;
  tags: string[];
  albumId: string;
}

interface Album {
  id: string;
  title: string;
  description: string;
  thumbnailSrc: string;
}

export default function AlbumDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [gapSize, setGapSize] = useState(16);
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [orientation, setOrientation] = useState("portrait");
  const [showDeleteControls, setShowDeleteControls] = useState(false);

  // Имитация загрузки данных альбома
  useEffect(() => {
    if (id) {
      // В реальном приложении здесь был бы запрос к API
      setAlbum({
        id,
        title: "Мой альбом",
        description: "Описание альбома",
        thumbnailSrc: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=600&auto=format&fit=crop",
      });
      
      setAlbumTitle("Мой альбом");
      setAlbumDescription("Описание альбома");
    }
  }, [id]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !id) return;

    const newPhotos: Photo[] = [];

    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      const newPhoto: Photo = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        title: file.name.split('.')[0] || "Без названия",
        src: url,
        alt: file.name.split('.')[0] || "Изображение без описания",
        tags: [],
        albumId: id
      };
      
      newPhotos.push(newPhoto);
    });

    setPhotos([...photos, ...newPhotos]);
    
    toast({
      title: "Фотографии добавлены",
      description: `В альбом добавлено ${newPhotos.length} фотографий`,
    });

    // Сбросить значение input для возможности повторной загрузки тех же файлов
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleDeletePhoto = (photoId: string) => {
    setPhotos(photos.filter(photo => photo.id !== photoId));
    
    toast({
      title: "Фотография удалена",
      description: "Фотография была успешно удалена из альбома"
    });
  };

  const handleDeleteAllPhotos = () => {
    if (photos.length === 0) return;
    
    setPhotos([]);
    
    toast({
      title: "Все фотографии удалены",
      description: `Из альбома удалено ${photos.length} фотографий`
    });
  };

  const handleUpdateAlbum = () => {
    if (!albumTitle.trim()) {
      toast({
        title: "Ошибка",
        description: "Название альбома не может быть пустым",
        variant: "destructive"
      });
      return;
    }

    if (album) {
      setAlbum({
        ...album,
        title: albumTitle,
        description: albumDescription
      });
      
      setIsEditDialogOpen(false);
      
      toast({
        title: "Альбом обновлен",
        description: "Информация об альбоме была успешно обновлена"
      });
    }
  };

  const handlePrintAlbum = () => {
    if (photos.length === 0) {
      toast({
        title: "Невозможно распечатать",
        description: "В альбоме нет фотографий для печати",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Подготовка к печати",
      description: "Подготовка альбома для печати..."
    });
    
    setTimeout(() => {
      window.print();
    }, 500);
  };

  if (!album) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="text-center">Загрузка альбома...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-3xl font-bold">{album.title}</h1>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-muted-foreground">{album.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <label className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Добавить фото
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileUpload}
                  multiple
                />
              </label>
            </Button>
            <Button 
              variant="outline"
              onClick={handlePrintAlbum}
              disabled={photos.length === 0}
            >
              <Printer className="mr-2 h-4 w-4" />
              Печать альбома
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteAllPhotos}
              disabled={photos.length === 0}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Удалить все фото
            </Button>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-medium mb-4">Ориентация фотографий</h2>
                <Select value={orientation} onValueChange={setOrientation}>
                  <SelectTrigger id="orientation-select">
                    <SelectValue placeholder="Выберите ориентацию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portrait">Портретная (10x15)</SelectItem>
                    <SelectItem value="landscape">Ландшафтная (15x10)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h2 className="text-lg font-medium mb-4">Настройка отступов: {gapSize}px</h2>
                <Slider
                  value={[gapSize]}
                  onValueChange={(value) => setGapSize(value[0])}
                  min={0}
                  max={40}
                  step={4}
                  className="py-4"
                />
                
                <div className="flex items-center space-x-2 mt-4">
                  <Switch 
                    id="delete-mode" 
                    checked={showDeleteControls}
                    onCheckedChange={setShowDeleteControls}
                  />
                  <Label htmlFor="delete-mode">Режим удаления</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {photos.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <h2 className="text-xl font-medium text-muted-foreground mb-4">В альбоме пока нет фотографий</h2>
            <Button variant="outline" asChild>
              <label className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Добавить фото
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileUpload}
                  multiple
                />
              </label>
            </Button>
          </div>
        ) : (
          <div className="mb-8">
            <GalleryGrid 
              photos={photos} 
              gapSize={gapSize}
              orientation={orientation}
              showDeleteControls={showDeleteControls}
              onDeletePhoto={handleDeletePhoto}
            />
          </div>
        )}
        
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Редактировать альбом</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Название
                </Label>
                <Input
                  id="edit-title"
                  value={albumTitle}
                  onChange={(e) => setAlbumTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Описание
                </Label>
                <Input
                  id="edit-description"
                  value={albumDescription}
                  onChange={(e) => setAlbumDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUpdateAlbum}>Сохранить</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
