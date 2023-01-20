import {
  IconBellPlus,
  IconCreditCard,
  IconPassword,
  IconSettings,
  IconTriangleSquareCircle,
  IconUser,
} from "@tabler/icons";

export const subNavigation = [
  { name: "Profile", icon: IconUser, current: true },
  { name: "Account", icon: IconSettings, current: false },
  { name: "Password", icon: IconPassword, current: false },
  { name: "Notifications", href: "#", icon: IconBellPlus, current: false },
  { name: "Billing", icon: IconCreditCard, current: false },
  {
    name: "Integrations",
    icon: IconTriangleSquareCircle,
    current: false,
  },
];
