import { useState } from "react";

interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt, className }) => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={"cursor-pointer " + (className || "")}
        onClick={() => setOpen(true)}
      />
      {open && (
        <div
          className="fixed inset-0 bg-background/80 flex items-center justify-center z-50"
          onClick={close}
        >
          <img src={src} alt={alt} className="max-w-full max-h-full" />
        </div>
      )}
    </>
  );
};

export default ImagePreview;
