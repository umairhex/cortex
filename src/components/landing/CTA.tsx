import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section id="cta" className="cta-section relative py-32 px-6">
      <div className="cta-content max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
          Ready to own your
          <br />
          <span className="text-primary">content layer</span>?
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          Start building with Cortex in minutes. No credit card required. Deploy
          on your infrastructure, own your data.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="group bg-primary text-primary-foreground hover:bg-primary/90 px-10 h-14 text-lg font-medium"
          >
            <Link to="/signup">
              Start Building
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="reveal-line h-[2px] w-32 bg-primary/30 mx-auto mt-16" />
      </div>
    </section>
  );
}
