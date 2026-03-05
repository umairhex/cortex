import { FileText, Edit } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Item } from "@/hooks/tanstack/useItems";
import type { Collection } from "@/types/types";

interface ContentSingleViewProps {
  selectedCollection: Collection;
  contentItems: Item[];
  onEdit: (item: Item) => void;
}

export function ContentSingleView({
  selectedCollection,
  contentItems,
  onEdit,
}: ContentSingleViewProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Content Entry</h2>
      {contentItems.length === 0 ? (
        <Card>
          <CardContent className="h-64">
            <EmptyState
              icon={FileText}
              title="No Content Yet"
              description="Create content for this single type."
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Current Content</h3>
              <Button variant="outline" onClick={() => onEdit(contentItems[0])}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
            <div className="space-y-2">
              {selectedCollection.fields.map((field) => (
                <div key={field.field_name}>
                  <label
                    htmlFor={`field-display-${field.field_name}`}
                    className="text-sm font-medium text-muted-foreground"
                  >
                    {field.label}
                  </label>
                  <p
                    id={`field-display-${field.field_name}`}
                    className="text-sm"
                  >
                    {(() => {
                      const val = contentItems[0].data[field.field_name];
                      if (val === undefined || val === null) return "Not set";
                      if (typeof val === "string") return val;
                      if (typeof val === "number") return String(val);
                      if (Array.isArray(val)) return `[${val.length} items]`;
                      return JSON.stringify(val);
                    })()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
