import { Layers, Zap, Shield, Database } from "lucide-react";
import { BentoCard } from "./BentoCard";
import supabaseLogo from "@/assets/databases/supabase.svg";
import postgresLogo from "@/assets/databases/postgress.svg";
import mongodbLogo from "@/assets/databases/mongodb.svg";

export function Features() {
  return (
    <section
      id="features"
      className="features-section relative pt-52 pb-32 px-6 overflow-hidden bg-background"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Empower your{" "}
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              data stories
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cortex provides the tools to build, manage, and scale your content
            infrastructure with unparalleled elegance.
          </p>
          <div className="reveal-line h-px w-32 bg-primary/40 mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <BentoCard
            icon={Layers}
            className="md:col-span-8"
            iconClassName="bg-primary/10 border-primary/20 text-primary"
          >
            <div className="mt-auto">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Visual Schema Architect
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Design complex content structures through an intuitive visual
                interface. Manage relationships, custom fields, and validations
                without writing a single line of code.
              </p>
            </div>
          </BentoCard>

          <BentoCard
            icon={Zap}
            className="md:col-span-4"
            iconClassName="bg-secondary/10 border-secondary/20 text-secondary"
          >
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Instant Edge API
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Every collection is automatically exposed through a
              high-performance REST API. Zero configuration, infinite
              possibilities.
            </p>
          </BentoCard>

          <BentoCard
            icon={Shield}
            className="md:col-span-4"
            iconClassName="bg-accent/10 border-accent/20 text-accent"
          >
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Full Data Sovereignty
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Cortex is self-hosted on your infrastructure. Your databases, your
              security, your rules. No vendor lock-in, ever.
            </p>
          </BentoCard>

          <BentoCard
            icon={Database}
            className="md:col-span-8"
            iconClassName="bg-primary/10 border-primary/20 text-primary"
          >
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Agnostic Connectivity
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Seamlessly connect to MongoDB, PostgreSQL, or Supabase. Cortex
                  abstracts the database layer so you can focus on building
                  beautiful experiences.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                {[
                  { name: "PostgreSQL", icon: postgresLogo, className: "" },
                  {
                    name: "MongoDB",
                    icon: mongodbLogo,
                    className:
                      "row-span-2 flex-col justify-center text-center py-8",
                  },
                  { name: "Supabase", icon: supabaseLogo, className: "" },
                ].map((db) => (
                  <div
                    key={db.name}
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl bg-muted/30 border border-border/50 text-sm font-medium ${db.className}`}
                  >
                    <img
                      src={db.icon}
                      alt={db.name}
                      className={`${db.name === "MongoDB" ? "h-10 mb-2" : "h-5"} w-auto`}
                    />
                    <span className="text-foreground/80">{db.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
