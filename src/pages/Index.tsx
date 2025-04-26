
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Layout } from "@/components/layout";

// Примеры альбомов
const albums = [
  {
    id: "1",
    title: "Природа",
    description: "Коллекция красивых природных пейзажей",
    thumbnailSrc: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    photoCount: 24,
  },
  {
    id: "2",
    title: "Городская жизнь",
    description: "Архитектура и уличные сцены городов",
    thumbnailSrc: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
    photoCount: 18,
  },
  {
    id: "3",
    title: "Животные",
    description: "Дикие и домашние животные в естественной среде",
    thumbnailSrc: "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
    photoCount: 15,
  },
  {
    id: "4",
    title: "Путешествия",
    description: "Интересные места со всего мира",
    thumbnailSrc: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
    photoCount: 32,
  },
  {
    id: "5",
    title: "Цветы и растения",
    description: "Красивые цветы и экзотические растения",
    thumbnailSrc: "https://images.unsplash.com/photo-1496309732348-3627f3f040ee",
    photoCount: 12,
  },
  {
    id: "6",
    title: "Макросъемка",
    description: "Удивительный мир в деталях",
    thumbnailSrc: "https://images.unsplash.com/photo-1429198739803-7db875882052",
    photoCount: 9,
  },
];

export default function Index() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Мои фотоальбомы</h1>
          <Button asChild>
            <Link to="/gallery">
              Все фотографии
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <Card key={album.id} className="overflow-hidden animate-fade-in hover:shadow-lg transition-shadow duration-300">
              <div className="relative overflow-hidden h-48">
                <img
                  src={album.thumbnailSrc}
                  alt={album.title}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  {album.photoCount} фото
                </div>
              </div>
              <CardContent className="pt-4">
                <h2 className="text-xl font-bold mb-2">{album.title}</h2>
                <p className="text-muted-foreground text-sm">{album.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Открыть альбом
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
