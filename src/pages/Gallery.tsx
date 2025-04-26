
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { GalleryGrid } from "@/components/GalleryGrid";
import { GalleryList } from "@/components/GalleryList";
import { GalleryMasonry } from "@/components/GalleryMasonry";
import { Layout } from "@/components/layout";
import { Upload, Trash2, Printer } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Photo {
  id: string;
  title: string;
  src: string;
  alt: string;
  tags: string[];
  albumId?: string;
}

export default function Gallery() {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [viewType, setViewType] = useState("grid");
  const [gapSize, setGapSize] = useState(16);
  const [orientation, setOrientation] = useState("portrait"); // portrait (10x15) или landscape (15x10)
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [showDeleteControls, setShowDeleteControls] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newPhotos: Photo[] = [];

    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      const newPhoto: Photo = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        title: file.name.split('.')[0] || "Без названия",
        src: url,
        alt: file.name.split('.')[0] || "Изображение без описания",
        tags: [],
        albumId: selectedAlbum || undefined
      };
      
      newPhotos.push(newPhoto);
    });

    setPhotos([...photos, ...newPhotos]);
    
    toast({
      title: "Фотографии загружены",
      description: `Добавлено ${newPhotos.length} фотографий`,
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
      description: "Фотография была успешно удалена"
    });
  };

  const handleDeleteAllPhotos = () => {
    if (photos.length === 0) return;
    
    setPhotos([]);
    
    toast({
      title: "Все фотографии удалены",
      description: `Удалено ${photos.length} фотографий`
    });
  };

  const handlePrintGallery = () => {
    if (photos.length === 0) {
      toast({
        title: "Невозможно распечатать",
        description: "В галерее нет фотографий для печати",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Подготовка к печати",
      description: "Подготовка фотографий для печати..."
    });
    
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Фотогалерея</h1>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-medium mb-4">Вид отображения</h2>
                <Tabs value={viewType} onValueChange={setViewType}>
                  <TabsList className="w-full">
                    <TabsTrigger value="grid" className="flex-1">Сетка</TabsTrigger>
                    <TabsTrigger value="list" className="flex-1">Список</TabsTrigger>
                    <TabsTrigger value="masonry" className="flex-1">Мазонри</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="mt-4">
                  <Label htmlFor="orientation-select">Ориентация фотографий</Label>
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
            
            <div className="flex justify-between mt-6 pt-4 border-t">
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <label className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    Загрузить фото
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
                  onClick={handlePrintGallery}
                  disabled={photos.length === 0}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Печать
                </Button>
              </div>
              
              <Button 
                variant="destructive" 
                onClick={handleDeleteAllPhotos}
                disabled={photos.length === 0}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Удалить все фото
              </Button>
            </div>
          </CardContent>
        </Card>

        {photos.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <h2 className="text-xl font-medium text-muted-foreground mb-4">Нет загруженных фотографий</h2>
            <Button variant="outline" asChild>
              <label className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Загрузить фото
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
            {viewType === "grid" && (
              <GalleryGrid 
                photos={photos} 
                gapSize={gapSize} 
                orientation={orientation}
                showDeleteControls={showDeleteControls}
                onDeletePhoto={handleDeletePhoto}
              />
            )}
            {viewType === "list" && (
              <GalleryList 
                photos={photos} 
                gapSize={gapSize} 
                showDeleteControls={showDeleteControls}
                onDeletePhoto={handleDeletePhoto}
              />
            )}
            {viewType === "masonry" && (
              <GalleryMasonry 
                photos={photos} 
                gapSize={gapSize}
                showDeleteControls={showDeleteControls}
                onDeletePhoto={handleDeletePhoto}
              />
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
