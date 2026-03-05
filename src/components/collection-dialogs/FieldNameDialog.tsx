import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { reservedWords } from "@/utils/reservedWords";

const fieldNameSchema = z
  .string()
  .refine((value) => /^[a-z][a-zA-Z0-9]*$/.test(value), {
    message:
      "Field name must be camelCase, start with a lowercase letter, and contain only letters and numbers.",
  })
  .refine((value) => !/^[0-9]/.test(value), {
    message: "Field name cannot start with a number.",
  })
  .refine((value) => !reservedWords.includes(value), {
    message: "Field name cannot be a reserved word.",
  })
  .refine(
    (value) => {
      if (
        value.startsWith("is") ||
        value.startsWith("has") ||
        value.startsWith("can") ||
        value.startsWith("should")
      ) {
        return true;
      }
      if (value.endsWith("At") || value.endsWith("Id")) {
        return true;
      }
      if (value.endsWith("s")) {
        return true;
      }
      return !value.match(/^(is|has|can|should|.*At|.*Id|.*s)$/);
    },
    {
      message:
        "Boolean fields must start with is, has, can, or should. Date/time fields must end with At. Relation fields must end with Id. Arrays must use plural nouns.",
    },
  );

type FieldBeingAdded = {
  fieldName: string;
  type: string;
  field_name: string;
} | null;

interface FieldNameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fieldBeingAdded: FieldBeingAdded;
  setFieldBeingAdded: (value: any) => void;
  fieldNameError: string;
  setFieldNameError: (error: string) => void;
  onAddField: (type: string, field_name: string) => void;
}

export const FieldNameDialog = ({
  open,
  onOpenChange,
  fieldBeingAdded,
  setFieldBeingAdded,
  fieldNameError,
  setFieldNameError,
  onAddField,
}: FieldNameDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Field Name</DialogTitle>
          <DialogDescription>
            Provide a unique name for this field. The name should be descriptive
            and follow naming conventions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="fieldName">Field Name</Label>
          <Input
            id="fieldName"
            value={fieldBeingAdded?.field_name || ""}
            onChange={(e) => {
              const value = e.target.value;
              const normalizedValue = value
                .replace(/[^a-zA-Z0-9]/g, "")
                .replace(/^[0-9]+/, "")
                .replace(/^[A-Z]/, (char) => char.toLowerCase());
              setFieldBeingAdded((prev: FieldBeingAdded) =>
                prev ? { ...prev, field_name: normalizedValue } : prev,
              );

              const result = fieldNameSchema.safeParse(normalizedValue);
              if (result.success) {
                setFieldNameError("");
              } else {
                setFieldNameError(result.error.issues[0].message);
              }
            }}
          />
          {fieldNameError && (
            <div className="text-sm text-destructive">{fieldNameError}</div>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                if (fieldBeingAdded?.field_name?.trim() && !fieldNameError) {
                  onAddField(
                    fieldBeingAdded.type,
                    fieldBeingAdded.field_name.trim(),
                  );
                }
              }}
              disabled={
                !fieldBeingAdded?.field_name?.trim() || !!fieldNameError
              }
            >
              Add Field
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
