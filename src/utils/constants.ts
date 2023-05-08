import {
  IconBellPlus,
  IconCreditCard,
  IconSettings,
  IconTriangleSquareCircle,
  IconUser,
} from "@tabler/icons-react";

export const subNavigation = [
  { name: "Profile", icon: IconUser, current: true },
  { name: "Posts", icon: IconSettings, current: false },
  { name: "Liked Posts", href: "#", icon: IconBellPlus, current: false },
  { name: "Billing", icon: IconCreditCard, current: false },
  {
    name: "Integrations",
    icon: IconTriangleSquareCircle,
    current: false,
  },
];
