import { Sun, Moon, Leaf } from "lucide-react";
import { AlpacaIcon } from "@/components/icons";
import { type Activity } from "@/lib/types";

export const activities: Activity[] = [
  {
    slug: "day-pumpkin-picking",
    title: "Day Pumpkin Picking",
    description: "Enjoy a classic autumn day in our sun-drenched pumpkin patch. Perfect for families and photos.",
    icon: Sun,
    image: "https://picsum.photos/600/400",
    aiHint: "pumpkin patch daytime",
  },
  {
    slug: "night-pumpkin-picking",
    title: "Night Pumpkin Picking",
    description: "A spooky, moonlit pumpkin search! Bring your flashlights for a thrilling nighttime harvest.",
    icon: Moon,
    image: "https://picsum.photos/600/401",
    aiHint: "pumpkin patch night",
  },
  {
    slug: "quiet-pumpkin-picking",
    title: "Quiet Pumpkin Picking",
    description: "A sensory-friendly, peaceful pumpkin picking experience with limited capacity for a calm atmosphere.",
    icon: Leaf,
    image: "https://picsum.photos/600/402",
    aiHint: "quiet autumn",
  },
  {
    slug: "alpaca-walks",
    title: "Alpaca Walks",
    description: "Take a gentle stroll through the autumn scenery with a friendly alpaca companion by your side.",
    icon: AlpacaIcon,
    image: "https://picsum.photos/600/403",
    aiHint: "alpaca autumn",
  },
];
