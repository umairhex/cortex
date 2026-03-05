import { Link } from "react-router-dom";
import { useTheme } from "@/components/use-theme";
import blackLogo from "@/assets/black-logo.svg";
import whiteLogo from "@/assets/white-logo.svg";

const Footer = () => {
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === "dark" ? whiteLogo : blackLogo;

  return (
    <footer className="border-t">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={logoSrc} alt="Cortex" className="size-8 animate-spin" />
          <span className="font-serif text-base">Cortex</span>
        </div>

        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/docs" className="hover:text-foreground transition-colors">
            Docs
          </Link>
          <a
            href="https://github.com/umairhex/cortex"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <Link
            to="/dashboard"
            className="hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
