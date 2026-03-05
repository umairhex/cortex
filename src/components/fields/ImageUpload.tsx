import { Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MediaLibraryModal } from "../MediaLibraryModal";

export const ImageUpload = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [preview, setPreview] = useState(value);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleSelect = (urls: string[]) => {
    if (urls.length > 0) {
      const url = urls[0];
      setPreview(url);
      onChange(url);
    }
  };

  return (
    <div className="space-y-3">
      <MediaLibraryModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSelect={handleSelect}
        multiple={false}
      />

      {!preview ? (
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/60 transition-colors"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Click to select or upload image
            </p>
          </div>
        </button>
      ) : (
        <div className="relative group rounded-lg overflow-hidden border bg-background w-fit">
          <img
            src={preview}
            alt="Preview"
            className="max-w-full h-48 object-contain"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setModalOpen(true)}
              title="Change Image"
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setPreview("");
                onChange("");
              }}
              title="Remove Image"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
