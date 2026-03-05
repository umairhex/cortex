import {
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import { toast } from "sonner";

export interface FieldType {
  type: string;
  label: string;
  maxLength?: number;
}

interface UseFieldManagementProps {
  initialFields?: string[];

  initialTypes?: Record<string, string>;

  collectionType?: "collection" | "single";

  onFieldsChange?: (fields: string[], types: Record<string, string>) => void;
}

export const useFieldManagement = ({
  initialFields = [],
  initialTypes = {},
  collectionType = "collection",
  onFieldsChange,
}: UseFieldManagementProps = {}) => {
  const [selectedFields, setSelectedFields] = useState<string[]>(initialFields);
  const [selectedTypes, setSelectedTypes] =
    useState<Record<string, string>>(initialTypes);
  const [fieldBeingAdded, setFieldBeingAdded] = useState<{
    fieldName: string;
    type: string;
    field_name: string;
  } | null>(null);
  const [showFieldNameDialog, setShowFieldNameDialog] = useState(false);
  const [fieldNameError, setFieldNameError] = useState<string>("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const updateState = (
    newFields: string[],
    newTypes: Record<string, string>,
  ) => {
    setSelectedFields(newFields);
    setSelectedTypes(newTypes);
    onFieldsChange?.(newFields, newTypes);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = selectedFields.indexOf(active.id as string);
      const newIndex = selectedFields.indexOf(over.id as string);
      const newFields = arrayMove(selectedFields, oldIndex, newIndex);
      updateState(newFields, selectedTypes);
    }
  };

  const moveSelectedField = (from: number, to: number) => {
    const newFields = arrayMove(selectedFields, from, to);
    updateState(newFields, selectedTypes);
  };

  const handleTypeSelect = (fieldName: string, type: string) => {
    const newTypes = { ...selectedTypes, [fieldName]: type };
    setSelectedTypes(newTypes);
    onFieldsChange?.(selectedFields, newTypes);
  };

  const addSelectedFieldRequest = (fieldName: string, type: string) => {
    if (collectionType === "single" && selectedFields.length >= 1) {
      toast.error("Single types can only have one field.");
      return;
    }
    setSelectedTypes((prev) => ({ ...prev, [fieldName]: type }));
    setFieldBeingAdded({ fieldName, type, field_name: "" });
    setFieldNameError("");
    setShowFieldNameDialog(true);
  };

  const addSelectedField = (type: string, field_name: string) => {
    if (selectedFields.includes(field_name)) {
      toast.error("Field name already exists.");
      return;
    }

    if (collectionType === "single" && selectedFields.length >= 1) {
      toast.error("Single types can have only one field.");
      return;
    }

    const newTypes = { ...selectedTypes, [field_name]: type };
    const newFields = [...selectedFields, field_name];

    setFieldBeingAdded(null);
    setShowFieldNameDialog(false);
    updateState(newFields, newTypes);
  };

  const removeSelectedField = (field_name: string) => {
    const newFields = selectedFields.filter((f) => f !== field_name);
    const newTypes = { ...selectedTypes };
    delete newTypes[field_name];

    updateState(newFields, newTypes);
  };

  return {
    selectedFields,
    setSelectedFields,
    selectedTypes,
    setSelectedTypes,
    fieldBeingAdded,
    setFieldBeingAdded,
    showFieldNameDialog,
    setShowFieldNameDialog,
    fieldNameError,
    setFieldNameError,
    sensors,
    handleDragEnd,
    moveSelectedField,
    handleTypeSelect,
    addSelectedFieldRequest,
    addSelectedField,
    removeSelectedField,
  };
};
