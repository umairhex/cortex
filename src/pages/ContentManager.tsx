import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Database, Loader2, Plus } from "lucide-react";

import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EmptyState } from "@/components/EmptyState";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useCollections } from "@/contexts/CollectionsContext";
import {
  type Item,
  useCreateItemMutation,
  useDeleteItemMutation,
  useItemsQuery,
  useUpdateItemMutation,
} from "@/hooks/tanstack/useItems";
import { useIntegrations } from "@/hooks/useIntegrations";
import DashboardLayout from "@/layouts/DashboardLayout";
import { getFieldType } from "@/types/fields";
import type { Collection } from "@/types/types";

import { ContentEditor } from "@/components/content-manager/ContentEditor";
import { ContentListView } from "@/components/content-manager/ContentListView";
import { ContentSidebar } from "@/components/content-manager/ContentSidebar";
import { ContentSingleView } from "@/components/content-manager/ContentSingleView";

export default function ContentManager() {
  const { integrations } = useIntegrations();
  const navigate = useNavigate();

  const { collections } = useCollections();
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);

  const { data: contentItems = [], isLoading: isLoadingItems } = useItemsQuery(
    selectedCollection?.id || "",
    { enabled: !!selectedCollection },
  );

  const createItemMutation = useCreateItemMutation(
    selectedCollection?.id || "",
  );
  const updateItemMutation = useUpdateItemMutation();
  const deleteItemMutation = useDeleteItemMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [formData, setFormData] = useState<
    Record<string, string | string[] | number | boolean | null | undefined>
  >({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleEditContent = (item: Item) => {
    setFormData(item.data);
    setErrors({});
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({});
    setEditingItem(null);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (selectedCollection) {
      selectedCollection.fields.forEach((field) => {
        const value = formData[field.field_name];
        const fieldDef = getFieldType(field.type);

        if (field.required) {
          if (
            value === undefined ||
            value === null ||
            (typeof value === "string" && value.trim() === "")
          ) {
            newErrors[field.field_name] = `${field.label} is required`;
          }
        }

        if (fieldDef?.validation && value) {
          if (typeof value === "string") {
            if (
              fieldDef.validation.maxLength &&
              value.length > fieldDef.validation.maxLength
            ) {
              newErrors[field.field_name] =
                `${field.label} must be ${fieldDef.validation.maxLength} characters or less`;
            }
            if (
              fieldDef.validation.minLength &&
              value.length < fieldDef.validation.minLength
            ) {
              newErrors[field.field_name] =
                `${field.label} must be at least ${fieldDef.validation.minLength} characters`;
            }
          }
        }
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveContent = async () => {
    if (!selectedCollection) return;
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editingItem) {
        await updateItemMutation.mutateAsync({
          id: editingItem._id,
          data: formData,
          collectionId: selectedCollection.id,
        });
        toast.success("Content updated successfully");
      } else {
        await createItemMutation.mutateAsync(formData);
        toast.success("Content created successfully");
      }
      setIsEditing(false);
      setFormData({});
      setEditingItem(null);
    } catch (error) {
      console.error("Failed to save content", error);
      toast.error("Failed to save content");
    }
  };

  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  if (!integrations || integrations.length === 0) {
    return (
      <DashboardLayout>
        <PageHeader
          title="Content Manager"
          description="Manage your content."
        />
        <div className="flex h-[calc(100vh-200px)] items-center justify-center p-6">
          <EmptyState
            icon={Database}
            title="No Database Connected"
            description="You must connect an external database (MongoDB) to manage content."
            className="py-12"
            action={{
              label: "Connect Database",
              onClick: () => navigate("/api-integration"),
            }}
          />
        </div>
      </DashboardLayout>
    );
  }

  const handleDeleteContent = (itemId: string) => {
    setItemToDelete(itemId);
  };

  const confirmDelete = async () => {
    if (!itemToDelete || !selectedCollection) return;
    try {
      await deleteItemMutation.mutateAsync({
        id: itemToDelete,
        collectionId: selectedCollection.id,
      });
      toast.success("Item deleted");
    } catch (error) {
      console.error("Failed to delete item", error);
      toast.error("Failed to delete item");
    } finally {
      setItemToDelete(null);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Content Manager"
        description="Create and manage your content items."
      />
      <div className="w-full flex h-screen">
        <ContentSidebar
          collections={collections}
          selectedCollection={selectedCollection}
          onSelectCollection={(c) => {
            setSelectedCollection(c);
            setIsEditing(false);
          }}
        />

        <div className="flex-1 p-6">
          {selectedCollection ? (
            <div className="w-full min-h-0">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">
                      {selectedCollection.name}
                    </h1>
                    <p className="text-muted-foreground">
                      {selectedCollection.type === "collection"
                        ? "Manage multiple content entries"
                        : "Manage single content entry"}
                    </p>
                  </div>
                  {!isEditing && (
                    <Button
                      asChild
                      disabled={
                        selectedCollection.type === "single" &&
                        contentItems.length > 0
                      }
                    >
                      <Link
                        to={`/content-manager/${selectedCollection.id}/create`}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        {selectedCollection.type === "collection"
                          ? "Add Entry"
                          : "Create Content"}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              {isEditing ? (
                <ContentEditor
                  selectedCollection={selectedCollection}
                  editingItem={editingItem}
                  formData={formData}
                  errors={errors}
                  isPending={
                    createItemMutation.isPending || updateItemMutation.isPending
                  }
                  onFormChange={(field_name, value) => {
                    setFormData((prev) => ({ ...prev, [field_name]: value }));
                  }}
                  onCancel={handleCancelEdit}
                  onSave={handleSaveContent}
                />
              ) : isLoadingItems ? (
                <div className="flex items-center justify-center p-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : selectedCollection.type === "collection" ? (
                <ContentListView
                  selectedCollection={selectedCollection}
                  contentItems={contentItems}
                  onEdit={handleEditContent}
                  onDelete={handleDeleteContent}
                />
              ) : (
                <ContentSingleView
                  selectedCollection={selectedCollection}
                  contentItems={contentItems}
                  onEdit={handleEditContent}
                />
              )}
            </div>
          ) : (
            <EmptyState
              icon={Database}
              title="No Collection Selected"
              description="Select a collection from the sidebar to manage content."
            />
          )}
        </div>
      </div>
      <ConfirmDialog
        open={!!itemToDelete}
        onOpenChange={(open) => !open && setItemToDelete(null)}
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        isLoading={deleteItemMutation.isPending}
        variant="destructive"
      />
    </DashboardLayout>
  );
}
