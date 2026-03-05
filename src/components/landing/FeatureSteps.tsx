import { useTheme } from "@/components/use-theme";
import CollectionBuilderLight from "@/assets/site-images/collection-types-builder-light.webp";
import CollectionBuilderDark from "@/assets/site-images/collection-types-builder-dark.webp";
import { Layers, PenTool, Send, Plug } from "lucide-react";

const steps = [
  {
    icon: PenTool,
    label: "Design",
    description:
      "Define your content structure visually with drag-and-drop fields.",
  },
  {
    icon: Layers,
    label: "Build",
    description:
      "Create collection types and single types with custom schemas.",
  },
  {
    icon: Send,
    label: "Publish",
    description: "Manage content entries with a powerful built-in editor.",
  },
  {
    icon: Plug,
    label: "Connect",
    description: "Integrate with MongoDB, Supabase, or Postgres in seconds.",
  },
];

const FeatureSteps = () => {
  const { resolvedTheme } = useTheme();
  const screenshot =
    resolvedTheme === "dark" ? CollectionBuilderDark : CollectionBuilderLight;

  return (
    <section className="max-w-6xl mx-auto py-24 px-4">
      <div className="space-y-2 mb-16">
        <h2 className="text-4xl font-semibold text-foreground">
          Design, build &amp; manage
        </h2>
        <h2 className="text-4xl font-medium text-foreground/30">
          your content on any database.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {steps.map((step) => (
          <div key={step.label} className="flex gap-4 items-start group">
            <div className="shrink-0 w-10 h-10 rounded-lg border bg-card flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <step.icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {step.label}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-3 py-3 rounded-sm border">
        <img
          src={screenshot}
          alt="Collection Types Builder"
          className="rounded-sm w-full"
        />
      </div>
    </section>
  );
};

export default FeatureSteps;
