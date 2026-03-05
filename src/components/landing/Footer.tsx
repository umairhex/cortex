import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Cortex. Open source & free.
        </p>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a
            href="https://github.com/umairhex/cortex"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <Link to="/docs" className="hover:text-foreground transition-colors">
            Documentation
          </Link>
        </div>
      </div>
    </footer>
  );
}
