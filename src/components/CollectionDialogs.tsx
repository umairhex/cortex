import type React from "react";
import type { CollectionNameValidationResult } from "@/utils/collectionNameValidator";

import { CreateCollectionDialog } from "./collection-dialogs/CreateCollectionDialog";
import { DeleteConfirmDialog } from "./collection-dialogs/DeleteConfirmDialog";
import { FieldNameDialog } from "./collection-dialogs/FieldNameDialog";

type FieldBeingAdded = {
  fieldName: string;
  type: string;
  field_name: string;
} | null;

interface CollectionDialogsProps {
  showCreateCollectionDialog: boolean;
  setShowCreateCollectionDialog: (show: boolean) => void;
  isCollectionCreated: boolean;
  collectionDraftName: string;
  setCollectionDraftName: (value: string) => void;
  prevCollectionName: string;
  setPrevCollectionName: (value: string) => void;
  setCollectionNameInput: (value: string) => void;
  collectionNameValidation: CollectionNameValidationResult | null;
  setCollectionNameValidation: (
    validation: CollectionNameValidationResult | null,
  ) => void;
  customPlural: string;
  setCustomPlural: (value: string) => void;
  setSelectedFields: (fields: string[]) => void;
  setSelectedTypes: (types: Record<string, string>) => void;

  showDeleteConfirmDialog: boolean;
  setShowDeleteConfirmDialog: (show: boolean) => void;
  setIsCollectionCreated: (created: boolean) => void;

  showFieldNameDialog: boolean;
  setShowFieldNameDialog: (show: boolean) => void;
  fieldBeingAdded: FieldBeingAdded;
  setFieldBeingAdded: React.Dispatch<React.SetStateAction<FieldBeingAdded>>;
  fieldNameError: string;
  setFieldNameError: (error: string) => void;
  addSelectedField: (type: string, field_name: string) => void;
}

export const CollectionDialogs = ({
  showCreateCollectionDialog,
  setShowCreateCollectionDialog,
  isCollectionCreated,
  collectionDraftName,
  setCollectionDraftName,
  prevCollectionName,
  setPrevCollectionName,
  setCollectionNameInput,
  collectionNameValidation,
  setCollectionNameValidation,
  customPlural,
  setCustomPlural,
  setSelectedFields,
  setSelectedTypes,
  showDeleteConfirmDialog,
  setShowDeleteConfirmDialog,
  setIsCollectionCreated,
  showFieldNameDialog,
  setShowFieldNameDialog,
  fieldBeingAdded,
  setFieldBeingAdded,
  fieldNameError,
  setFieldNameError,
  addSelectedField,
}: CollectionDialogsProps) => {
  return (
    <>
      <CreateCollectionDialog
        open={showCreateCollectionDialog}
        onOpenChange={setShowCreateCollectionDialog}
        isCreated={isCollectionCreated}
        draftName={collectionDraftName}
        setDraftName={setCollectionDraftName}
        prevName={prevCollectionName}
        setPrevName={setPrevCollectionName}
        setNameInput={setCollectionNameInput}
        validation={collectionNameValidation}
        setValidation={setCollectionNameValidation}
        customPlural={customPlural}
        setCustomPlural={setCustomPlural}
        setSelectedFields={setSelectedFields}
        setSelectedTypes={setSelectedTypes}
      />

      <DeleteConfirmDialog
        open={showDeleteConfirmDialog}
        onOpenChange={setShowDeleteConfirmDialog}
        validation={collectionNameValidation}
        onConfirmDelete={() => {
          setCollectionNameInput("");
          setCollectionNameValidation(null);
          setCustomPlural("");
          setPrevCollectionName("");
          setCollectionDraftName("");
          setSelectedFields([]);
          setSelectedTypes({});
          setIsCollectionCreated(false);
          setShowDeleteConfirmDialog(false);
        }}
      />

      <FieldNameDialog
        open={showFieldNameDialog}
        onOpenChange={setShowFieldNameDialog}
        fieldBeingAdded={fieldBeingAdded}
        setFieldBeingAdded={setFieldBeingAdded}
        fieldNameError={fieldNameError}
        setFieldNameError={setFieldNameError}
        onAddField={addSelectedField}
      />
    </>
  );
};
