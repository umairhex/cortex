import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Collection } from "@/types/types";

export const collectionKeys = {
  all: ["collections"] as const,
  detail: (id: string) => ["collections", id] as const,
};

export const useCollectionsQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: collectionKeys.all,
    queryFn: async (): Promise<Collection[]> => {
      const response = await api.get("/collections");
      return response.data;
    },
    ...options,
  });
};

export const useCollectionQuery = (id: string) => {
  return useQuery({
    queryKey: collectionKeys.detail(id),
    queryFn: async (): Promise<Collection> => {
      const response = await api.get(`/collections/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateCollectionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      collection: Omit<Collection, "createdAt" | "updatedAt">,
    ): Promise<Collection> => {
      const response = await api.post("/collections", collection);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        collectionKeys.all,
        (oldData: Collection[] | undefined) => {
          return oldData ? [...oldData, data] : [data];
        },
      );

      queryClient.setQueryData(collectionKeys.detail(data.id), data);
    },
  });
};

export const useUpdateCollectionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      collection,
    }: {
      id: string;
      collection: Omit<Collection, "id" | "createdAt" | "updatedAt">;
    }): Promise<Collection> => {
      const response = await api.put(`/collections/${id}`, collection);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(collectionKeys.detail(data.id), data);

      queryClient.setQueryData(
        collectionKeys.all,
        (oldData: Collection[] | undefined) => {
          return oldData
            ? oldData.map((c) => (c.id === data.id ? data : c))
            : [data];
        },
      );

      queryClient.invalidateQueries({ queryKey: collectionKeys.all });
      queryClient.invalidateQueries({
        queryKey: collectionKeys.detail(data.id),
      });
    },
  });
};

export const useDeleteCollectionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(`/collections/${id}`);
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        collectionKeys.all,
        (oldData: Collection[] | undefined) => {
          return oldData ? oldData.filter((c) => c.id !== id) : [];
        },
      );

      queryClient.removeQueries({ queryKey: collectionKeys.detail(id) });
    },
  });
};
