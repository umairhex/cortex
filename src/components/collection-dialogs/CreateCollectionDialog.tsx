import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type CollectionNameValidationResult,
  validateAndNormalizeCollectionName,
} from "@/utils/collectionNameValidator";

interface CreateCollectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isCreated: boolean;
  draftName: string;
  setDraftName: (value: string) => void;
  prevName: string;
  setPrevName: (value: string) => void;
  setNameInput: (value: string) => void;
  validation: CollectionNameValidationResult | null;
  setValidation: (validation: CollectionNameValidationResult | null) => void;
  customPlural: string;
  setCustomPlural: (value: string) => void;
  setSelectedFields: (fields: string[]) => void;
  setSelectedTypes: (types: Record<string, string>) => void;
}

export const CreateCollectionDialog = ({
  open,
  onOpenChange,
  isCreated,
  draftName,
  setDraftName,
  prevName,
  setPrevName,
  setNameInput,
  validation,
  setValidation,
  customPlural,
  setCustomPlural,
  setSelectedFields,
  setSelectedTypes,
}: CreateCollectionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isCreated
              ? "Collection Details (Read-Only)"
              : "Create New Collection"}
          </DialogTitle>
          <DialogDescription>
            {isCreated
              ? "View the details of the created collection."
              : "Enter a name for your new collection. The name should be unique and descriptive."}
          </DialogDescription>
        </DialogHeader>
        {!isCreated ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="collectionDraftName">
                Collection Name (Display Name)
              </Label>
              <Input
                id="collectionDraftName"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="e.g., Blog Posts"
              />
            </div>
            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => {
                  setDraftName(prevName);
                  onOpenChange(false);
                  if (!isCreated) {
                    setNameInput("");
                    setValidation(null);
                    setCustomPlural("");
                    setSelectedFields([]);
                    setSelectedTypes({});
                  }
                }}
              >
                Discard
              </Button>
              <Button
                disabled={!draftName.trim()}
                onClick={() => {
                  if (draftName.trim()) {
                    setNameInput(draftName.trim());
                    const v = validateAndNormalizeCollectionName(
                      draftName.trim(),
                    );
                    setValidation(v);
                    setPrevName(draftName.trim());
                    onOpenChange(false);
                  }
                }}
              >
                Create
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Display Name</Label>
                <div className="p-3 bg-muted rounded border text-sm">
                  {validation?.displayName}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Singular (Internal/API)</Label>
                <div className="p-3 bg-muted rounded border text-sm font-mono">
                  {validation?.singular}
                </div>
                <p className="text-xs text-muted-foreground">
                  Used for individual resource routes: /{validation?.singular}
                  /:id
                </p>
              </div>
              <div className="space-y-2">
                <Label>Plural (Collection)</Label>
                <div className="p-3 bg-muted rounded border text-sm font-mono">
                  {customPlural || validation?.plural}
                </div>
                <p className="text-xs text-muted-foreground">
                  Used for collection routes: /
                  {customPlural || validation?.plural}
                </p>
              </div>
              <div className="p-3 bg-info/10 border border-info/40 rounded text-xs text-info">
                <p className="font-medium mb-1">Note:</p>
                <p>
                  Collection identifiers are immutable once created to ensure
                  API route stability and database consistency.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
