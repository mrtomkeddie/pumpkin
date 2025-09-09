import type { LucideIcon } from 'lucide-react';
import type { FC, SVGProps } from 'react';

export interface ActivityType {
  slug: string;
  title: string;
  description: string;
  price: string;
  details: string;
  icon?: LucideIcon | FC<SVGProps<SVGSVGElement>>;
  image?: string;
  aiHint?: string;
}

export interface Activity {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon | FC<SVGProps<SVGSVGElement>>;
  image: string;
  aiHint: string;
  types?: ActivityType[];
}

export interface Reservation {
  id: string;
  activityTitle: string;
  activitySlug: string;
  activityType?: string;
  date: Date;
  time: string;
}
