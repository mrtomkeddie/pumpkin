import { Sun, Moon, Leaf, Users } from "lucide-react";
import { AlpacaIcon } from "@/components/icons";
import { type Activity } from "@/lib/types";

export const activities: Activity[] = [
  {
    slug: "pumpkin-picking",
    title: "Pumpkin picking",
    description: "Enjoy a classic autumn day in our sun-drenched pumpkin patch. We offer day, quiet, and moonlit sessions.",
    icon: Sun,
    image: "/patch.jpg",
    aiHint: "pumpkin patch daytime",
    types: [
        {
            slug: 'day',
            title: 'Pumpkin Picking',
            description: 'This ticket grants you access to our pumpkin patch. At our venue we offer more than just pumpkins, we have mazes, several photo opportunities, spooky activities, a chance to meet the farm animals and so much more. (Please note the pumpkins are not included with your ticket, they are sold separately).',
            price: '£9.43',
            details: '1 Car Per Ticket',
        },
        {
            slug: 'quiet',
            title: 'Quiet Pumpkin Picking',
            description: 'This ticket grants you access to our pumpkin patch. We offer this slot to individuals with sensory sensitivities, please refrain from booking unless absolutely needed as slots are limited to 5 cars per hour.',
            price: '£9.43',
            details: '1 Car Per Ticket',
        },
        {
            slug: 'moonlit',
            title: 'Moonlit Pumpkin Picking',
            description: 'This ticket grants you access to our pumpkin patch with the added twist of picking the pumpkins under the night sky. We have mazes, photo opportunities, spooky activities, and more. (Pumpkins sold separately).',
            price: '£10.48',
            details: '1 Car Per Ticket',
        },
    ]
  },
  {
    slug: "alpaca-walk",
    title: "Alpaca walk",
    description: "Meet our three Alpacas, walk with them, and feed them in their natural habitat. A true Welsh experience!",
    icon: AlpacaIcon,
    image: "/alpaca.jpg",
    aiHint: "alpaca walking",
    types: [
        {
            slug: 'adult',
            title: 'Adult (1 Alpaca)',
            description: 'One adult gets to walk one alpaca. A classic one-on-one experience with our furry friends.',
            price: '£26.20',
            details: 'Min age 10 for solo walk',
        },
        {
            slug: 'child',
            title: 'Child with Adult',
            description: 'A shared experience for one child (under 10) and one supervising adult, walking one alpaca together.',
            price: '£20.96',
            details: '1 child & 1 adult',
        },
        {
            slug: 'shared',
            title: 'Shared Alpaca Walk',
            description: 'Perfect for couples or friends. Two people share the responsibility and joy of walking one alpaca.',
            price: '£52.40',
            details: '1 Alpaca for 2 people',
        },
        {
            slug: 'spectator',
            title: 'Spectator',
            description: 'Want to join the fun without walking an alpaca? This ticket lets you accompany the group.',
            price: '£10.48',
            details: 'Walk along with the group',
        }
    ]
  },
];
