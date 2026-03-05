import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Github, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import blackLogo from "@/assets/black-logo.svg";
import whiteLogo from "@/assets/white-logo.svg";
import { useTheme } from "../use-theme";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

const Navbar = () => {
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === "dark" ? whiteLogo : blackLogo;
  return (
    <nav className="w-full border-b border-t py-0 relative">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center border-x relative py-3">
        <Plus
          className="absolute -top-[12.5px] -left-[12.5px] text-muted-foreground/30 w-6 h-6 z-10 pointer-events-none"
          strokeWidth={1}
        />
        <Plus
          className="absolute -bottom-[12.5px] -left-[12.5px] text-muted-foreground/30 w-6 h-6 z-10 pointer-events-none"
          strokeWidth={1}
        />
        <Plus
          className="absolute -top-[12.5px] -right-[12.5px] text-muted-foreground/30 w-6 h-6 z-10 pointer-events-none"
          strokeWidth={1}
        />
        <Plus
          className="absolute -bottom-[12.5px] -right-[12.5px] text-muted-foreground/30 w-6 h-6 z-10 pointer-events-none"
          strokeWidth={1}
        />

        <div className="flex gap-1 items-center ml-3 ">
          <img
            src={logoSrc}
            alt="Cortex Logo"
            className="w-6 h-6 inline-block mr-2 animate-spin duration-1000"
          />
          <h1 className="font-serif">Cortex</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant={"outline"}>
            <AnimatedThemeToggler />
          </Button>
          <a
            href="https://github.com/umairhex/cortex"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant={"outline"}>
              <Github />
              <span>Github</span>
            </Button>
          </a>
          <Link to="/docs">
            <Button variant={"outline"}>
              <FileText />
              <span>Docs</span>
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button>
              <span>Get Started</span>
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
