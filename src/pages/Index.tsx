
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Layout } from "@/components/layout";
import { Trash2, Plus, Printer } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface Album {
  id: string;
  title: string;
  description: string;
  thumbnailSrc: string;
  photoCount: number;
}

export default function Index() {
  const { toast } = useToast();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [newAlbumDescription, setNewAlbumDescription] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddAlbum = () => {
    if (!newAlbumTitle.trim()) {
      toast({
        title: "Ошибка",
        description: "Название альбома не может быть пустым",
        variant: "destructive"
      });
      return;
    }

    const newAlbum: Album = {
      id: Date.now().toString(),
      title: newAlbumTitle,
      description: newAlbumDescription,
      thumbnailSrc: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=600&auto=format&fit=crop",
      photoCount: 0
    };

    setAlbums([...albums, newAlbum]);
    setNewAlbumTitle("");
    setNewAlbumDescription("");
    setIsAddDialogOpen(false);

    toast({
      title: "Успех!",
      description: `Альбом "${newAlbumTitle}" успешно создан`,
    });
  };

  const handleDeleteAlbum = (albumId: string, albumTitle: string) => {
    setAlbums(albums.filter(album => album.id !== albumId));
    
    toast({
      title: "Альбом удален",
      description: `Альбом "${albumTitle}" был удален`,
    });
  };

  const handlePrintAlbum = (albumId: string, albumTitle: string) => {
    toast({
      title: "Печать альбома",
      description: `Подготовка к печати альбома "${albumTitle}"`,
    });
    
    // Здесь будет логика подготовки к печати
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Мои фотоальбомы</h1>
          <div className="flex gap-4">
            <Button asChild>
              <Link to="/gallery">
                Все фотографии
              </Link>
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default">
                  <Plus className="mr-2 h-4 w-4" /> Создать альбом
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Создать новый альбом</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Название
                    </Label>
                    <Input
                      id="title"
                      value={newAlbumTitle}
                      onChange={(e) => setNewAlbumTitle(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Описание
                    </Label>
                    <Input
                      id="description"
                      value={newAlbumDescription}
                      onChange={(e) => setNewAlbumDescription(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddAlbum}>Создать</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {albums.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <h2 className="text-xl font-medium text-muted-foreground mb-4">У вас пока нет альбомов</h2>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Создать первый альбом
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <Card key={album.id} className="overflow-hidden animate-fade-in hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative overflow-hidden h-48">
                  <img
                    src={album.thumbnailSrc}
                    alt={album.title}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                    {album.photoCount} фото
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="mr-2"
                      onClick={() => handleDeleteAlbum(album.id, album.title)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="icon"
                      onClick={() => handlePrintAlbum(album.id, album.title)}
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h2 className="text-xl font-bold mb-2">{album.title}</h2>
                  <p className="text-muted-foreground text-sm">{album.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/album/${album.id}`}>
                      Открыть альбом
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
