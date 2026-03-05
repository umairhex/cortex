import { useTheme } from "@/components/use-theme";
import DahboardLightImage from "@/assets/site-images/dashboard-light.webp";
import DahboardDarkImage from "@/assets/site-images/dashboard-dark.webp";

const DashboardImageSection = () => {
  const { resolvedTheme } = useTheme();
  const dashboardImage =
    resolvedTheme === "dark" ? DahboardDarkImage : DahboardLightImage;
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="px-3 py-3 rounded-sm border">
        <img
          src={dashboardImage}
          alt="Cortex Dashboard"
          className="rounded-sm"
        />
      </div>
    </div>
  );
};

export default DashboardImageSection;
