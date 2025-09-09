import { Sun, Moon, Leaf } from "lucide-react";
import { AlpacaIcon } from "@/components/icons";
import { type Activity } from "@/lib/types";

export const activities: Activity[] = [
  {
    slug: "pumpkin-picking",
    title: "Pumpkin picking",
    description: "Enjoy a classic autumn day in our sun-drenched pumpkin patch. Perfect for families and photos.",
    icon: Sun,
    image: "/patch.jpg",
    aiHint: "pumpkin patch daytime",
  },
  {
    slug: "alpaca-picnic",
    title: "Alpaca picnic",
    description: "A spooky, moonlit pumpkin search! Bring your flashlights for a thrilling nighttime harvest.",
    icon: AlpacaIcon,
    image: "/alpaca.jpg",
    aiHint: "alpaca picnic",
  },
];
