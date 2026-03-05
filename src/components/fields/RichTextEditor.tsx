import { Textarea } from "@/components/ui/textarea";

export const RichTextEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter rich text content..."
      rows={6}
      className="font-serif max-h-[40vh] overflow-auto resize-y"
    />
  );
};
