export interface FieldType {
  type: string;
  label: string;
  maxLength?: number;
  component: string;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface FieldGroup {
  name: string;
  icon: string;
  types: FieldType[];
}

export const FIELD_TYPES: FieldGroup[] = [
  {
    name: "Text",
    icon: "FileText",
    types: [
      {
        type: "short",
        label: "Short Text",
        maxLength: 100,
        component: "Input",
        validation: { maxLength: 100 },
      },
      {
        type: "long",
        label: "Long Text",
        maxLength: 300,
        component: "Textarea",
        validation: { maxLength: 300 },
      },
    ],
  },
  {
    name: "Rich Content",
    icon: "Edit",
    types: [
      {
        type: "richtext",
        label: "Rich Text",
        component: "RichTextEditor",
      },
      {
        type: "richmarkdown",
        label: "Rich Markdown",
        component: "MarkdownEditor",
      },
    ],
  },
  {
    name: "Date",
    icon: "Calendar",
    types: [
      {
        type: "date",
        label: "Date",
        component: "DatePicker",
      },
    ],
  },
  {
    name: "Image",
    icon: "Image",
    types: [
      {
        type: "single",
        label: "Single Image",
        component: "ImageUpload",
      },
      {
        type: "multiple",
        label: "Multiple Images",
        component: "MultiImageUpload",
      },
    ],
  },
  {
    name: "Boolean",
    icon: "ToggleLeft",
    types: [
      {
        type: "boolean",
        label: "True/False",
        component: "Checkbox",
      },
    ],
  },
  {
    name: "Number",
    icon: "Hash",
    types: [
      {
        type: "integer",
        label: "Integer",
        component: "NumberInput",
        validation: { pattern: "^-?\\d+$" },
      },
      {
        type: "decimal",
        label: "Decimal",
        component: "DecimalInput",
      },
    ],
  },
  {
    name: "Internet",
    icon: "Globe",
    types: [
      {
        type: "email",
        label: "Email",
        component: "EmailInput",
      },
      {
        type: "url",
        label: "URL",
        component: "UrlInput",
      },
    ],
  },
  {
    name: "Color",
    icon: "Palette",
    types: [
      {
        type: "color",
        label: "Color Picker",
        component: "ColorInput",
      },
    ],
  },
];

export const getFieldType = (type: string): FieldType | undefined => {
  for (const group of FIELD_TYPES) {
    const fieldType = group.types.find((t) => t.type === type);
    if (fieldType) return fieldType;
  }
  return undefined;
};

export const getFieldGroup = (type: string): FieldGroup | undefined => {
  return FIELD_TYPES.find((group) => group.types.some((t) => t.type === type));
};
