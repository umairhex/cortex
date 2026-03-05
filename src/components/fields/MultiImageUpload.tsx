import { Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MediaLibraryModal } from "../MediaLibraryModal";

export const MultiImageUpload = ({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) => {
  const [images, setImages] = useState<string[]>(value || []);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setImages(value || []);
  }, [value]);

  const handleSelect = (urls: string[]) => {
    const newImages = [...images, ...urls];
    setImages(newImages);
    onChange(newImages);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <MediaLibraryModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSelect={handleSelect}
        multiple={true}
      />

      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/60 transition-colors"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Click to select multiple images
          </p>
        </div>
      </button>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image}
              className="relative group aspect-square rounded-lg overflow-hidden border bg-background"
            >
              <img
                src={image}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
