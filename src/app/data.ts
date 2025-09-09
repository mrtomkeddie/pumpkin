
import { Sun, Moon, Leaf, Users, Mic2 } from "lucide-react";
import { AlpacaIcon } from "@/components/icons";
import { type Activity } from "@/lib/types";

export const activities: Activity[] = [
  {
    slug: "pumpkin-picking",
    title: "Pumpkin Picking",
    description: "Enjoy a classic autumn day in our sun-drenched pumpkin patch. We offer day, quiet, and moonlit sessions.",
    icon: Sun,
    image: "/patch.jpg",
    aiHint: "pumpkin patch daytime",
    types: [
        {
            slug: 'day',
            title: 'Pumpkin Picking',
            description: 'Step into our pumpkin patch and discover more than pumpkins. Wander through mazes, capture seasonal photos, take part in festive activities, meet the farm animals, and enjoy so much more. Pumpkins are available for purchase separately.',
            price: '£9.43',
            details: '1 Car Per Ticket',
            icon: Sun,
            image: '/patch.jpg',
            aiHint: "pumpkin patch daytime",
            pax: 1,
        },
        {
            slug: 'quiet',
            title: 'Quiet Pumpkin Picking',
            description: 'Enjoy our pumpkin patch in a sensory-friendly environment, reserved for individuals with sensory sensitivities. Availability is limited to 5 cars per hour, so we kindly ask that only those who need it book this option.',
            price: '£9.43',
            details: '1 Car Per Ticket',
            icon: Mic2,
            image: '/quiet.jpg',
            aiHint: "empty pumpkin patch",
            pax: 1,
        },
        {
            slug: 'moonlit',
            title: 'Moonlit Pumpkin Picking',
            description: 'Experience the magic of our pumpkin patch after dark! Pick pumpkins under the night sky, explore mazes, snap photos, enjoy spooky activities, and more. Pumpkins sold separately.',
            price: '£10.48',
            details: '1 Car Per Ticket',
            icon: Moon,
            image: '/moonlit.jpg?v=2',
            aiHint: "pumpkin patch nighttime",
            pax: 1,
        },
    ]
  },
  {
    slug: "alpaca-walk",
    title: "Alpaca Walk",
    description: "Meet our three Alpacas, walk with them, and feed them in their natural habitat. A true Welsh experience!",
    icon: AlpacaIcon,
    image: "/alpaca.jpg",
    aiHint: "alpaca walking",
    types: [
        {
            slug: 'adult',
            title: 'Adult (1 Alpaca per Person)',
            description: 'One adult gets to walk one alpaca. A classic one-on-one experience with our furry friends.',
            price: '£26.20',
            details: 'Min age 10 for solo walk',
            pax: 1,
        },
        {
            slug: 'child',
            title: 'Child, under age of 10 (includes 1 Adult)',
            description: 'A shared experience for one child (under 10) and one supervising adult, walking one alpaca together.',
            price: '£20.96',
            details: '1 child & 1 adult',
            pax: 2, // This package includes two people
        },
        {
            slug: 'shared',
            title: 'Shared Alpaca Walking Experience (1 Alpaca for 2 people)',
            description: 'Perfect for couples or friends. Two people share the responsibility and joy of walking one alpaca.',
            price: '£52.40',
            details: '1 Alpaca for 2 people',
            pax: 2, // This package includes two people
        },
        {
            slug: 'spectator',
            title: 'Spectator',
            description: 'Want to join the fun without walking an alpaca? This ticket lets you accompany the group.',
            price: '£10.48',
            details: 'Walk along with the group',
            pax: 1,
        }
    ]
  },
];

    