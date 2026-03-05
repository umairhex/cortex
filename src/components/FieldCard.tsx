import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { FieldType } from "../pages/CreateCollection";

interface FieldCardProps {
  fieldGroup: { name: string; icon: string; types: FieldType[] };
  selectedTypes: Record<string, string>;
  handleTypeSelect: (fieldName: string, type: string) => void;
  getIcon: (iconName: string) => ReactNode;
  onAdd: (fieldName: string, type: string) => void;
}

const FieldCard = ({
  fieldGroup,
  selectedTypes,
  handleTypeSelect,
  getIcon,
  onAdd,
}: FieldCardProps) => {
  return (
    <div className="mb-3">
      <Tooltip>
        <TooltipTrigger asChild>
          {fieldGroup.types.length > 1 ? (
            <Dialog>
              <DialogTrigger asChild>
                <div className="p-3 border rounded-lg hover:bg-accent hover:text-accent-foreground cursor-pointer transition flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getIcon(fieldGroup.icon)}
                    <div>
                      <div className="text-sm font-medium">
                        {fieldGroup.name}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {selectedTypes[fieldGroup.name]
                          ? fieldGroup.types.find(
                              (t) => t.type === selectedTypes[fieldGroup.name],
                            )?.label
                          : "Select type"}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-current" />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Choose {fieldGroup.name} Type</DialogTitle>
                  <DialogDescription>
                    Select the appropriate type for this field from the
                    available options.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  {fieldGroup.types.map((field) => (
                    <button
                      type="button"
                      key={field.type}
                      className={`p-3 border rounded-lg cursor-pointer transition text-left w-full ${
                        selectedTypes[fieldGroup.name] === field.type
                          ? "bg-accent border-primary text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                      onClick={() =>
                        handleTypeSelect(fieldGroup.name, field.type)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleTypeSelect(fieldGroup.name, field.type);
                        }
                      }}
                    >
                      <div className="text-sm font-medium">{field.label}</div>
                      {field.maxLength && (
                        <p className="text-xs text-muted-foreground">
                          Max Length: {field.maxLength} characters
                        </p>
                      )}
                    </button>
                  ))}
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      onClick={() =>
                        onAdd(
                          fieldGroup.name,
                          selectedTypes[fieldGroup.name] ||
                            fieldGroup.types[0].type,
                        )
                      }
                    >
                      Add
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <button
              type="button"
              className="p-3 border rounded-lg hover:bg-accent hover:text-accent-foreground cursor-pointer transition flex items-center justify-between w-full text-left"
              onClick={() => {
                handleTypeSelect(fieldGroup.name, fieldGroup.types[0].type);
                onAdd(fieldGroup.name, fieldGroup.types[0].type);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleTypeSelect(fieldGroup.name, fieldGroup.types[0].type);
                  onAdd(fieldGroup.name, fieldGroup.types[0].type);
                }
              }}
            >
              <div className="flex items-center space-x-3">
                {getIcon(fieldGroup.icon)}
                <div>
                  <div className="text-sm font-medium">{fieldGroup.name}</div>
                  <p className="text-xs text-muted-foreground">
                    {selectedTypes[fieldGroup.name]
                      ? fieldGroup.types.find(
                          (t) => t.type === selectedTypes[fieldGroup.name],
                        )?.label
                      : "Select type"}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Click to select {fieldGroup.name}
            {fieldGroup.types.length > 1
              ? ` type. ${fieldGroup.types.length} options available.`
              : "."}
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default FieldCard;
