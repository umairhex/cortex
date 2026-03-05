import { useTheme } from "@/components/use-theme";
import ApiIntegrationLight from "@/assets/site-images/api-integeration-light.webp";
import ApiIntegrationDark from "@/assets/site-images/api-integeration-dark.webp";
import { Link2, ShieldCheck, HardDrive, Lock } from "lucide-react";

const highlights = [
  {
    icon: Link2,
    label: "Seamless connection",
    description:
      "Connect to your existing database and manage content instantly.",
  },
  {
    icon: ShieldCheck,
    label: "Works with every major database",
    description:
      "First-class support for MongoDB, Supabase, and PostgreSQL out of the box.",
  },
  {
    icon: HardDrive,
    label: "Zero vendor lock-in",
    description:
      "Your schema, your database, your rules. Switch providers anytime.",
  },
  {
    icon: Lock,
    label: "Your data stays yours",
    description:
      "Cortex never stores your content. Everything lives in your own database.",
  },
];

const APIIntegrationSection = () => {
  const { resolvedTheme } = useTheme();
  const screenshot =
    resolvedTheme === "dark" ? ApiIntegrationDark : ApiIntegrationLight;

  return (
    <section className="max-w-6xl mx-auto py-24 px-4">
      <div className="space-y-2 mb-16">
        <h2 className="text-4xl font-semibold text-foreground">
          We built a flexible data layer
        </h2>
        <h2 className="text-4xl font-medium text-foreground/30">
          that connects to your favorite databases.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {highlights.map((item) => (
          <div
            key={item.label}
            className="flex gap-4 items-start group max-w-xs"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg border bg-card flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <item.icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {item.label}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-3 py-3 rounded-sm border">
        <img
          src={screenshot}
          alt="API Integration"
          className="rounded-sm w-full"
        />
      </div>
    </section>
  );
};

export default APIIntegrationSection;
