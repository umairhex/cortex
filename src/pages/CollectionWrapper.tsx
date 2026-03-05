import { Database } from "lucide-react";
import { useParams } from "react-router-dom";
import { EmptyState } from "@/components/EmptyState";
import { useCollections } from "@/contexts/CollectionsContext";
import { useCollectionQuery } from "@/hooks/tanstack/useCollections";
import CollectionBuilds from "./CollectionBuilds";
import SingleCollectionBuilds from "./SingleCollectionBuilds";

const CollectionWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const { collections } = useCollections();
  const { data: collection, isLoading } = useCollectionQuery(id || "");

  let foundCollection = collections.find((c) => c.id === id);

  if (!foundCollection && collection) {
    foundCollection = collection;
  }

  if (isLoading) {
    return <div>Loading collection...</div>;
  }

  if (!foundCollection) {
    return (
      <EmptyState
        icon={Database}
        title="Collection Not Found"
        description="The collection you're looking for doesn't exist or has been deleted."
      />
    );
  }

  if (foundCollection.type === "single") {
    return <SingleCollectionBuilds />;
  }

  return <CollectionBuilds />;
};

export default CollectionWrapper;
