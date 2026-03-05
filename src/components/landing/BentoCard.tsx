import type { LucideIcon } from "lucide-react";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  icon: LucideIcon;
  iconClassName?: string;
}

export function BentoCard({
  children,
  className = "",
  icon: Icon,
  iconClassName = "",
}: BentoCardProps) {
  return (
    <div
      className={`feature-card relative group p-px rounded-3xl overflow-hidden bg-card/40 border border-border/50 backdrop-blur-xl ${className}`}
    >
      <div className="p-10 h-full flex flex-col">
        <div
          className={`feature-icon w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border ${iconClassName}`}
        >
          <Icon className="h-7 w-7" />
        </div>
        {children}
      </div>
    </div>
  );
}
