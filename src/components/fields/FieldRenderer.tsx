import MarkdownEditor from "@/components/MarkdownEditor";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getFieldType } from "@/types/fields";
import { ImageUpload } from "./ImageUpload";
import { MultiImageUpload } from "./MultiImageUpload";
import { RichTextEditor } from "./RichTextEditor";

interface FieldRendererProps {
  field: {
    field_name: string;
    type: string;
    label: string;
  };
  value: string | string[] | number | boolean | null | undefined;
  onChange: (
    value: string | string[] | number | boolean | null | undefined,
  ) => void;
  error?: string;
}

export const FieldRenderer = ({
  field,
  value,
  onChange,
  error,
}: FieldRendererProps) => {
  const fieldType = getFieldType(field.type);

  if (!fieldType) {
    return <div>Unknown field type: {field.type}</div>;
  }

  const renderField = () => {
    switch (fieldType.component) {
      case "Input":
        return (
          <Input
            value={String(value || "")}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            maxLength={fieldType.maxLength}
            className="bg-background border-input"
          />
        );

      case "Textarea":
        return (
          <Textarea
            value={String(value || "")}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            maxLength={fieldType.maxLength}
            rows={4}
            className="min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-h-[40vh] overflow-auto resize-y"
          />
        );

      case "DatePicker":
        return (
          <Input
            type="date"
            value={String(value || "")}
            onChange={(e) => onChange(e.target.value)}
            className="bg-background border-input"
          />
        );

      case "ImageUpload":
        return (
          <ImageUpload
            value={value as string}
            onChange={onChange as (value: string) => void}
          />
        );

      case "MultiImageUpload":
        return (
          <MultiImageUpload
            value={value as string[]}
            onChange={onChange as (value: string[]) => void}
          />
        );

      case "RichTextEditor":
        return (
          <RichTextEditor
            value={value as string}
            onChange={onChange as (value: string) => void}
          />
        );

      case "MarkdownEditor":
        return (
          <MarkdownEditor
            value={value as string}
            onChange={(val) => onChange(val || "")}
          />
        );

      case "Checkbox":
        return (
          <div className="flex items-center space-x-2 py-2">
            <Checkbox
              id={`field-${field.field_name}`}
              checked={Boolean(value)}
              onCheckedChange={(checked: boolean | "indeterminate") =>
                onChange(checked === true)
              }
            />
            <label
              htmlFor={`field-${field.field_name}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {value ? "True" : "False"}
            </label>
          </div>
        );

      case "NumberInput":
      case "DecimalInput":
        return (
          <Input
            type="number"
            value={String(value || "")}
            onChange={(e) => {
              const val = e.target.value;
              if (fieldType.component === "NumberInput") {
                onChange(val === "" ? null : parseInt(val, 10));
              } else {
                onChange(val === "" ? null : parseFloat(val));
              }
            }}
            placeholder={`Enter ${field.label.toLowerCase()}...`}
            step={fieldType.component === "DecimalInput" ? "any" : "1"}
          />
        );

      case "EmailInput":
        return (
          <Input
            type="email"
            value={String(value || "")}
            onChange={(e) => onChange(e.target.value)}
            placeholder="user@example.com"
          />
        );

      case "UrlInput":
        return (
          <Input
            type="url"
            value={String(value || "")}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com"
          />
        );

      case "ColorInput": {
        const colorValue = String(value || "");
        const isValidHex = /^#[0-9A-F]{6}$/i.test(colorValue);
        const pickerValue = isValidHex ? colorValue : "#000000";

        return (
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input
                type="color"
                value={pickerValue}
                onChange={(e) => onChange(e.target.value)}
                className="w-12 h-10 p-1 cursor-pointer overflow-hidden [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none"
              />
            </div>
            <Input
              type="text"
              value={colorValue}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#000000"
              maxLength={7}
              className="font-mono flex-1 uppercase"
            />
          </div>
        );
      }

      default:
        return <div>Unsupported field type: {fieldType.component}</div>;
    }
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={`field-${field.field_name}`}
        className="text-sm font-medium"
      >
        {field.label}
        <span className="text-xs text-muted-foreground ml-2">
          ({field.field_name})
        </span>
      </label>
      {renderField()}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
