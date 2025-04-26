
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

// Данные с фотографиями (обычно загружались бы через API)
const photos = [
  {
    id: "1",
    title: "Горный пейзаж",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    alt: "Величественный горный пейзаж на рассвете",
    tags: ["природа", "горы", "рассвет"],
  },
  {
    id: "2",
    title: "Морской берег",
    src: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0",
    alt: "Спокойный морской берег с золотым песком",
    tags: ["море", "пляж", "волны"],
  },
  {
    id: "3",
    title: "Городская архитектура",
    src: "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43",
    alt: "Современные небоскребы в центре города",
    tags: ["город", "архитектура", "здания"],
  },
  {
    id: "4",
    title: "Осенний лес",
    src: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8",
    alt: "Красочный осенний лес с желтыми и красными листьями",
    tags: ["осень", "лес", "деревья"],
  },
  {
    id: "5",
    title: "Дикие животные",
    src: "https://images.unsplash.com/photo-1546182990-dffeafbe841d",
    alt: "Дикий лев отдыхает в саванне",
    tags: ["животные", "лев", "дикая природа"],
  },
  {
    id: "6",
    title: "Цветочная композиция",
    src: "https://images.unsplash.com/photo-1464982326199-86f32f81b211",
    alt: "Яркая композиция из полевых цветов",
    tags: ["цветы", "растения", "природа"],
  },
  {
    id: "7",
    title: "Водопад",
    src: "https://images.unsplash.com/photo-1494472155656-f34e81b17ddc",
    alt: "Мощный водопад среди скал и зелени",
    tags: ["вода", "природа", "водопад"],
  },
  {
    id: "8",
    title: "Закат на пляже",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    alt: "Потрясающий закат с отражением в океане",
    tags: ["закат", "море", "пляж"],
  },
  {
    id: "9",
    title: "Горное озеро",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    alt: "Кристально чистое горное озеро в окружении гор",
    tags: ["озеро", "горы", "природа"],
  },
];

export default function Gallery() {
  const [viewType, setViewType] = useState("grid");
  const [gapSize, setGapSize] = useState(16);

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
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          {viewType === "grid" && <GalleryGrid photos={photos} gapSize={gapSize} />}
          {viewType === "list" && <GalleryList photos={photos} gapSize={gapSize} />}
          {viewType === "masonry" && <GalleryMasonry photos={photos} gapSize={gapSize} />}
        </div>
      </div>
    </Layout>
  );
}
