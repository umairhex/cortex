import { Loader2 } from "lucide-react";
import { FieldRenderer } from "@/components/fields/FieldRenderer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Item } from "@/hooks/tanstack/useItems";
import type { Collection } from "@/types/types";

interface ContentEditorProps {
  selectedCollection: Collection;
  editingItem: Item | null;
  formData: Record<
    string,
    string | string[] | number | boolean | null | undefined
  >;
  errors: Record<string, string>;
  isPending: boolean;
  onFormChange: (field_name: string, value: any) => void;
  onCancel: () => void;
  onSave: () => void;
}

export function ContentEditor({
  selectedCollection,
  editingItem,
  formData,
  errors,
  isPending,
  onFormChange,
  onCancel,
  onSave,
}: ContentEditorProps) {
  return (
    <Card>
      <ScrollArea className="h-[calc(100vh-200px)] min-h-0">
        <CardContent>
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              {editingItem ? "Edit" : "Create"} Content
            </h2>
            <p className="text-sm text-muted-foreground">
              Fill in the fields below to {editingItem ? "update" : "create"}{" "}
              your content.
            </p>
          </div>
          <div className="space-y-6">
            {selectedCollection.fields.map((field) => (
              <FieldRenderer
                key={field.field_name}
                field={field}
                value={formData[field.field_name]}
                onChange={(value) => onFormChange(field.field_name, value)}
                error={errors[field.field_name]}
              />
            ))}
          </div>
          <div className="flex gap-3 py-3 justify-end">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onSave} disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingItem ? "Update" : "Create"} Content
            </Button>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
