
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GalleryHorizontal, Images } from "lucide-react";

const albums = [
  {
    id: "nature",
    title: "Природа",
    cover: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    count: 12
  },
  {
    id: "architecture",
    title: "Архитектура",
    cover: "https://images.unsplash.com/photo-1616578492900-ea5a8fc6c341",
    count: 8
  },
  {
    id: "travel",
    title: "Путешествия",
    cover: "https://images.unsplash.com/photo-1527631746610-bca00a040d60",
    count: 15
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary py-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary-foreground flex items-center gap-2">
              <Images className="h-8 w-8" />
              ФотоАльбом
            </h1>
            <Link to="/gallery">
              <Button variant="secondary" className="flex items-center gap-2">
                <GalleryHorizontal className="h-4 w-4" />
                Все фотографии
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Мои альбомы</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <Link to={`/album/${album.id}`} key={album.id}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img 
                      src={album.cover} 
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-medium">{album.title}</h3>
                    <p className="text-muted-foreground">{album.count} фотографий</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
