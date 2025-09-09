
import { type Reservation } from '@/lib/types';

const today = new Date();
const currentYear = today.getFullYear();

export const allReservations: Reservation[] = [
  {
    id: 'res_001',
    activityTitle: 'Pumpkin Picking',
    activitySlug: 'pumpkin-picking',
    activityType: 'Pumpkin Picking',
    date: new Date(currentYear, 9, 25),
    time: '10:00',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    quantity: 4, // Carload
  },
  {
    id: 'res_002',
    activityTitle: 'Alpaca Walk',
    activitySlug: 'alpaca-walk',
    packages: [{ slug: 'adult', title: 'Adult (1 Alpaca per Person)', quantity: 2 }],
    date: new Date(currentYear, 9, 22),
    time: '11:00',
    name: 'Bob Williams',
    email: 'bob.w@example.com',
    quantity: 2,
  },
  {
    id: 'res_003',
    activityTitle: 'Pumpkin Picking',
    activitySlug: 'pumpkin-picking',
    activityType: 'Moonlit Pumpkin Picking',
    date: new Date(currentYear, 9, 24),
    time: '19:00',
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    quantity: 2, // Carload
  },
  {
    id: 'res_004',
    activityTitle: 'Alpaca Walk',
    activitySlug: 'alpaca-walk',
    packages: [
      { slug: 'child', title: 'Child, under age of 10 (includes 1 Adult)', quantity: 1 },
      { slug: 'adult', title: 'Adult (1 Alpaca per Person)', quantity: 1 },
    ],
    date: new Date(currentYear, 9, 23),
    time: '13:00',
    name: 'Diana Prince',
    email: 'diana.p@example.com',
    quantity: 3,
  },
  {
    id: 'res_005',
    activityTitle: 'Pumpkin Picking',
    activitySlug: 'pumpkin-picking',
    activityType: 'Quiet Pumpkin Picking',
    date: new Date(currentYear, 9, 22),
    time: '15:00',
    name: 'Eve Adams',
    email: 'eve.a@example.com',
    quantity: 3, // Carload
  },
    {
    id: 'res_006',
    activityTitle: 'Alpaca Walk',
    activitySlug: 'alpaca-walk',
    packages: [{ slug: 'shared', title: 'Shared Alpaca Walking Experience', quantity: 1 }],
    date: new Date(currentYear, 9, 24),
    time: '11:00',
    name: 'Frank Miller',
    email: 'frank.m@example.com',
    quantity: 2,
  },
  {
    id: 'res_007',
    activityTitle: 'Pumpkin Picking',
    activitySlug: 'pumpkin-picking',
    activityType: 'Pumpkin Picking',
    date: new Date(currentYear, 9, 26),
    time: '11:00',
    name: 'Grace Lee',
    email: 'grace.l@example.com',
    quantity: 5, // Carload
  },
  {
    id: 'res_008',
    activityTitle: 'Alpaca Walk',
    activitySlug: 'alpaca-walk',
    packages: [
        { slug: 'adult', title: 'Adult (1 Alpaca per Person)', quantity: 2 },
        { slug: 'spectator', title: 'Spectator', quantity: 1 },
    ],
    date: new Date(currentYear, 9, 16),
    time: '13:00',
    name: 'Heidi Turner',
    email: 'heidi.t@example.com',
    quantity: 3,
  },
    {
    id: 'res_009',
    activityTitle: 'Pumpkin Picking',
    activitySlug: 'pumpkin-picking',
    activityType: 'Moonlit Pumpkin Picking',
    date: new date(currentyear, 9, 25),
    time: '20:00',
    name: 'ivan petrov',
    email: 'ivan.p@example.com',
    quantity: 4, // carload
  },
  {
    id: 'res_010',
    activitytitle: 'pumpkin picking',
    activityslug: 'pumpkin-picking',
    activitytype: 'pumpkin picking',
    date: new date(currentyear, 9, 27),
    time: '14:00',
    name: 'judy alvarez',
    email: 'judy.a@example.com',
    quantity: 2, // carload
  },
];
