import { useRef, useCallback } from "react";
import { flushSync } from "react-dom";

import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTheme } from "@/components/use-theme";

type AnimatedThemeTogglerProps = {
  className?: string;
};

export const AnimatedThemeToggler = ({
  className,
}: AnimatedThemeTogglerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const onToggle = useCallback(async () => {
    if (!buttonRef.current) return;

    const newTheme = isDark ? "light" : "dark";

    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    }).ready;

    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const maxDistance = Math.hypot(
      Math.max(centerX, window.innerWidth - centerX),
      Math.max(centerY, window.innerHeight - centerY),
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${centerX}px ${centerY}px)`,
          `circle(${maxDistance}px at ${centerX}px ${centerY}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }, [isDark, setTheme]);

  return (
    <button
      ref={buttonRef}
      onClick={onToggle}
      aria-label="Switch theme"
      className={cn(
        "group relative flex items-center justify-center p-2 rounded-full outline-none focus:outline-none active:outline-none focus:ring-0 cursor-pointer text-muted-foreground hover:text-foreground",
        className,
      )}
      type="button"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </button>
  );
};
