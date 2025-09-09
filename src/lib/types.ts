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
  pax: number; // Number of people this package counts for
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

export interface ReservationPackage {
  slug: string;
  title: string;
  quantity: number;
}

export interface Reservation {
  id: string;
  activityTitle: string;
  activitySlug: string;
  activityType?: string; // For single-type bookings like pumpkin picking
  packages?: ReservationPackage[]; // For multi-package bookings like alpaca walks
  date: Date;
  time: string;
  name: string;
  email: string;
  phone?: string;
  quantity?: number; // Total people, for display
}

export interface GiftCardPurchase {
    id: string;
    amount: string;
    senderName: string;
    recipientName: string;
    recipientEmail: string;
    message?: string;
    purchaseDate: Date;
}
