import {
  Database,
  FileText,
  Image,
  Layers,
  Moon,
  RefreshCcw,
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Collection Types",
    description:
      "Build custom schemas with a visual editor. Define fields, set validations, and organize your data structure effortlessly.",
  },
  {
    icon: FileText,
    title: "Content Manager",
    description:
      "Create, edit, and manage content entries across all your collections with a clean, intuitive interface.",
  },
  {
    icon: Database,
    title: "API Integration",
    description:
      "Connect to MongoDB, Supabase, or Postgres. Your data lives where you want it.",
  },
  {
    icon: Image,
    title: "Media Library",
    description:
      "Upload, organize, and manage your media assets in one central place with drag-and-drop support.",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description:
      "Built-in light and dark themes that respect your system preference. Zero configuration needed.",
  },
  {
    icon: RefreshCcw,
    title: "Real-time Sync",
    description:
      "Powered by TanStack Query for instant data synchronization and optimistic updates across your app.",
  },
];

const FeaturesGrid = () => {
  return (
    <section className="max-w-6xl mx-auto py-24 px-4">
      <div className="space-y-2 mb-16">
        <h2 className="text-4xl font-semibold text-foreground">
          What Cortex delivers today.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group p-6 rounded-sm border bg-card hover:border-primary/30 transition-colors"
          >
            <feature.icon className="size-5 text-muted-foreground mb-4 group-hover:text-primary transition-colors" />
            <h3 className="text-base font-semibold text-foreground mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;
