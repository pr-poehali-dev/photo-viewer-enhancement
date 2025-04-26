
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Layout } from "@/components/layout";
import { Upload, Trash2, Printer, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface Photo {
  id: string;
  title: string;
  src: string;
  alt: string;
  tags: string[];
  albumId?: string;
}

interface Album {
  id: string;
  title: string;
  description: string;
  thumbnailSrc: string;
  photoCount: number;
}

export default function AlbumDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [gapSize, setGapSize] = useState(16);
  const [orientation, setOrientation] = useState("portrait");
  const [showDeleteControls, setShowDeleteControls] = useState(false);

  // В реальности тут был бы API запрос
  useEffect(() => {
    // Имитация загрузки данных
    const albumData: Album = {
      id: id || "",
      title: "Мой альбом",
      description: "Описание альбома",
      thumbnailSrc: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=600&auto=format&fit=crop",
      photoCount: 0
    };
    
    setAlbum(albumData);
    setEditTitle(albumData.title);
    setEditDescription(albumData.description);
  }, [id]);

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
        albumId: id
      };
      
      newPhotos.push(newPhoto);
    });

    setPhotos([...photos, ...newPhotos]);
    
    if (album) {
      setAlbum({
        ...album,
        photoCount: photos.length + newPhotos.length,
        thumbnailSrc: newPhotos[0].src // Первое фото становится обложкой, если ее нет
      });
    }
    
    toast({
      title: "Фотографии загружены",
      description: `Добавлено ${newPhotos.length} фотографий в альбом`,
    });

    // Сбросить значение input для возможности повторной загрузки тех же файлов
    event.target.value = '';
  };

  const handleDeletePhoto = (photoId: string) => {
    setPhotos(photos.filter(photo => photo.id !== photoId));
    
    if (album) {
      setAlbum({
        ...album,
        photoCount: photos.length - 1
      });
    }
    
    toast({
      title: "Фотография удалена",
      description: "Фотография была успешно удалена из альбома"
    });
  };

  const handleDeleteAllPhotos = () => {
    if (photos.length === 0) return;
    
    setPhotos([]);
    
    if (album) {
      setAlbum({
        ...album,
        photoCount: 0
      });
    }
    
    toast({
      title: "Все фотографии удалены",
      description: `Удалено ${photos.length} фотографий из альбома`
    });
  };

  const handleSaveAlbumDetails = () => {
    if (!album) return;
    
    setAlbum({
      ...album,
      title: editTitle,
      description: editDescription
    });
    
    setIsEditing(false);
    
    toast({
      title: "Данные сохранены",
      description: "Информация об альбоме обновлена"
    });
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
      description: "Подготовка фотографий альбома для печати..."
    });
    
    // Создаем окно для печати
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Печать альбома - ${album?.title}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
              }
              h1 {
                text-align: center;
                margin-bottom: 20px;
              }
              .photos-container {
                display: grid;
                grid-template-columns: ${orientation === 'portrait' ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'};
                gap: 20px;
              }
              .photo-item {
                break-inside: avoid;
                margin-bottom: 20px;
              }
              .photo-item img {
                width: 100%;
                height: auto;
                aspect-ratio: ${orientation === 'portrait' ? '2/3' : '3/2'};
                object-fit: cover;
                border: 1px solid #ddd;
              }
              .photo-caption {
                text-align: center;
                margin-top: 5px;
                font-size: 14px;
              }
              @media print {
                .photo-item {
                  page-break-inside: avoid;
                }
                @page {
                  size: A4;
                  margin: 1cm;
                }
              }
            </style>
          </head>
          <body>
            <h1>${album?.title}</h1>
            <p>${album?.description}</p>
            <div class="photos-container">
              ${photos.map(photo => `
                <div class="photo-item">
                  <img src="${photo.src}" alt="${photo.alt}" />
                  <div class="photo-caption">${photo.title}</div>
                </div>
              `).join('')}
            </div>
            <script>
              window.onload = function() {
                setTimeout(function() {
                  window.print();
                }, 500);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  if (!album) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8">Загрузка альбома...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <Button 
          variant="outline" 
          className="mb-6" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад к альбомам
        </Button>

        <div className="flex justify-between items-center mb-8">
          {!isEditing ? (
            <>
              <div>
                <h1 className="text-3xl font-bold">{album.title}</h1>
                <p className="text-muted-foreground">{album.description}</p>
              </div>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Редактировать
              </Button>
            </>
          ) : (
            <div className="w-full">
              <div className="grid gap-4 mb-4">
                <div>
                  <Label htmlFor="title">Название альбома</Label>
                  <Input 
                    id="title" 
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Textarea 
                    id="description" 
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Отмена
                </Button>
                <Button onClick={handleSaveAlbumDetails}>
                  Сохранить
                </Button>
              </div>
            </div>
          )}
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-4">
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
                
                <div className="mt-4">
                  <Label>Настройка отступов: {gapSize}px</Label>
                  <Slider
                    value={[gapSize]}
                    onValueChange={(value) => setGapSize(value[0])}
                    min={0}
                    max={40}
                    step={4}
                    className="py-4"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Switch 
                    id="delete-mode" 
                    checked={showDeleteControls}
                    onCheckedChange={setShowDeleteControls}
                  />
                  <Label htmlFor="delete-mode">Режим удаления</Label>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" asChild>
                    <label>
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
            </div>
          </CardContent>
        </Card>

        {photos.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <h2 className="text-xl font-medium text-muted-foreground mb-4">В альбоме нет фотографий</h2>
            <Button variant="outline" asChild>
              <label>
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
            <GalleryGrid 
              photos={photos} 
              gapSize={gapSize} 
              orientation={orientation}
              showDeleteControls={showDeleteControls}
              onDeletePhoto={handleDeletePhoto}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
