import { FileText, Edit, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Item } from "@/hooks/tanstack/useItems";
import type { Collection } from "@/types/types";

interface ContentListViewProps {
  selectedCollection: Collection;
  contentItems: Item[];
  onEdit: (item: Item) => void;
  onDelete: (itemId: string) => void;
}

export function ContentListView({
  selectedCollection,
  contentItems,
  onEdit,
  onDelete,
}: ContentListViewProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Content Entries</h2>
      {contentItems.length === 0 ? (
        <Card>
          <CardContent className="h-64">
            <EmptyState
              icon={FileText}
              title="No Content Yet"
              description="Create your first content entry for this collection."
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {contentItems.map((item) => (
            <Card key={item._id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {(() => {
                      const firstField = selectedCollection.fields[0];
                      const val = item.data[firstField?.field_name];
                      if (!val) return "Untitled";
                      if (typeof val === "string") return val;
                      if (typeof val === "number") return String(val);
                      return "Content Item";
                    })()}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(item._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
