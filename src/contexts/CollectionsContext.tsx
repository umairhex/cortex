import { createContext, type ReactNode, useContext } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  useCollectionsQuery,
  useCreateCollectionMutation,
  useDeleteCollectionMutation,
  useUpdateCollectionMutation,
} from "@/hooks/tanstack/useCollections";

import type { Collection } from "@/types/types";

interface CollectionsContextType {
  collections: Collection[];
  isLoading: boolean;
  error: Error | null;
  addCollection: (
    collection: Omit<Collection, "createdAt" | "updatedAt">,
  ) => Promise<Collection>;
  updateCollection: (
    id: string,
    collection: Omit<Collection, "createdAt" | "updatedAt">,
  ) => Promise<void>;
  deleteCollection: (id: string) => Promise<void>;
}

const CollectionsContext = createContext<CollectionsContextType | undefined>(
  undefined,
);
export const useCollections = () => {
  const context = useContext(CollectionsContext);
  if (!context) {
    throw new Error("useCollections must be used within CollectionsProvider");
  }
  return context;
};

export const CollectionsProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const {
    data: collections = [],
    isLoading,
    error,
  } = useCollectionsQuery({
    enabled: isAuthenticated,
  });
  const createMutation = useCreateCollectionMutation();
  const updateMutation = useUpdateCollectionMutation();
  const deleteMutation = useDeleteCollectionMutation();

  const addCollection = async (
    collection: Omit<Collection, "createdAt" | "updatedAt">,
  ): Promise<Collection> => {
    return await createMutation.mutateAsync(collection);
  };

  const updateCollection = async (
    id: string,
    collection: Omit<Collection, "createdAt" | "updatedAt">,
  ) => {
    await updateMutation.mutateAsync({ id, collection });
  };

  const deleteCollection = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        isLoading,
        error,
        addCollection,
        updateCollection,
        deleteCollection,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};
