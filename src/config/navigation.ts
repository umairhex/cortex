import {
  IconApi,
  IconFileText,
  IconHome,
  IconPhoto,
  IconSettings,
} from "@tabler/icons-react";

export const navigationItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: IconHome,
  },
  {
    title: "Content Manager",
    url: "/content-manager",
    icon: IconFileText,
  },
  {
    title: "Media Library",
    url: "/media-library",
    icon: IconPhoto,
  },
  {
    title: "Collection Types Builder",
    url: "/collection-types-builder",
    icon: IconSettings,
  },
  {
    title: "API Integration",
    url: "/api-integration",
    icon: IconApi,
  },
];
