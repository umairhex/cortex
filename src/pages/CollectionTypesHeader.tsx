import { Separator } from "@/components/ui/separator";

const CollectionTypesHeader = ({
  title,
  tagline,
  actions,
}: {
  title: string;
  tagline: string;
  actions?: React.ReactNode;
}) => {
  return (
    <>
      <div className="flex items-center justify-between px-4 mb-4">
        <div className="space-y-1 min-w-0">
          <h4 className="text-lg font-semibold truncate">{title}</h4>
          <p className="text-xs text-muted-foreground truncate">{tagline}</p>
        </div>
        {actions && <div className="flex items-center">{actions}</div>}
      </div>
      <Separator />
    </>
  );
};

export default CollectionTypesHeader;
