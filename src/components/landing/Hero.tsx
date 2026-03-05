import { ArrowRight, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import supabaseLogo from "@/assets/databases/supabase.svg";
import postgresLogo from "@/assets/databases/postgress.svg";
import mongodbLogo from "@/assets/databases/mongodb.svg";

interface HeroProps {
  heroBg: string;
}

export function Hero({ heroBg }: HeroProps) {
  return (
    <section className="hero-section relative h-[120vh] flex items-center justify-center overflow-hidden">
      <div
        className="parallax-bg absolute inset-0 w-full h-[140%] -top-[20%]"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="hero-content relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-white/80">
            Open source & self-hostable
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-white">
          The{" "}
          <span className="bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            write-only
          </span>
          <br />
          CMS.
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 mb-10">
          Author content in a beautiful UI. Publish directly to your database.
          <br className="hidden md:block" />
          No vendor APIs. No cold starts. No lock-in.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="group bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12 text-base font-medium"
          >
            <Link to="/signin">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 h-12 text-base font-medium border-white/20 text-white hover:bg-white/10 bg-transparent"
            asChild
          >
            <a
              href="https://github.com/umairhex/cortex"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </Button>
        </div>

        <div className="mt-16 pt-8">
          <p className="text-sm text-white/50 mb-6">Works with your database</p>
          <div className="flex items-center justify-center gap-8 md:gap-12">
            {[
              { name: "Supabase", icon: supabaseLogo },
              { name: "PostgreSQL", icon: postgresLogo },
              { name: "MongoDB", icon: mongodbLogo },
            ].map((db) => (
              <div
                key={db.name}
                className="flex items-center gap-3 text-white/40 hover:text-white/70 transition-colors group"
              >
                <img
                  src={db.icon}
                  alt={db.name}
                  className="h-6 w-auto opacity-50 group-hover:opacity-100 transition-opacity"
                />
                <span className="text-sm font-medium">{db.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
