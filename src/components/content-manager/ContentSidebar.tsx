import { Briefcase, Database, Newspaper, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { EmptyState } from "@/components/EmptyState";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Collection } from "@/types/types";

interface ContentSidebarProps {
  collections: Collection[];
  selectedCollection: Collection | null;
  onSelectCollection: (collection: Collection) => void;
}

export function ContentSidebar({
  collections,
  selectedCollection,
  onSelectCollection,
}: ContentSidebarProps) {
  const collectionTypes = collections.filter((c) => c.type === "collection");
  const singleTypes = collections.filter((c) => c.type === "single");

  const contentSidebar = [
    {
      title: "Collection Types",
      icon: <Database className="size-4" />,
      items: collectionTypes.map((c) => ({
        name: c.name,
        id: c.id,
        icon: <Newspaper className="size-4" />,
        collection: c,
      })),
    },
    {
      title: "Single Types",
      icon: <Database className="size-4" />,
      items: singleTypes.map((c) => ({
        name: c.name,
        id: c.id,
        icon: <Briefcase className="size-4" />,
        collection: c,
      })),
    },
  ];

  return (
    <ScrollArea className="bg-sidebar py-4 pr-2 w-80 overflow-y-auto border-r">
      <div className="px-2 mb-6 sticky top-0 bg-sidebar pt-4 pb-2 z-10">
        <Link
          to="/collection-types-builder"
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-primary hover:bg-primary/90 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-primary/50 "
        >
          <Plus className="size-5 text-background" />
          <span className="font-medium text-sm text-background">
            New Collection
          </span>
        </Link>
      </div>

      {collections.length === 0 ? (
        <EmptyState
          icon={Database}
          title="No Types Exist"
          description="Create your first collection type to get started."
          className="py-8"
        />
      ) : (
        contentSidebar
          .filter((section) => section.items.length > 0)
          .map((section) => (
            <div key={section.title} className="mb-8">
              <div className="flex items-center gap-2 border-b pb-3 mb-1 px-5 ">
                {section.icon}
                <h2 className="text-sm font-semibold">{section.title}</h2>
              </div>
              <ul className="space-y-1 ml-6">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <button
                      type="button"
                      onClick={() => onSelectCollection(item.collection)}
                      className={
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-left cursor-pointer" +
                        (selectedCollection?.id === item.id
                          ? " bg-accent text-accent-foreground"
                          : "")
                      }
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span className="text-sm">{item.name}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
      )}
    </ScrollArea>
  );
}
