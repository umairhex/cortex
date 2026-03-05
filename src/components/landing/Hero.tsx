import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="space-y-2">
        <h1 className="text-5xl font-semibold text-foreground">
          Your content. One powerful platform.
        </h1>
        <h1 className="text-5xl font-medium text-foreground/30">
          The modern headless CMS built for speed and simplicity.
        </h1>
      </div>
      <div className="flex gap-3 mt-12">
        <Link to="/dashboard">
          <Button size="lg">
            <span>Get Started</span>
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </Link>
        <a
          href="https://github.com/umairhex/cortex"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="lg" variant="outline">
            View on GitHub
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Hero;
