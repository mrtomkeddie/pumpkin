
'use client';

import { useReservations } from '@/context/reservations-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Trash2, Ticket } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function ReservationsPage() {
  const { reservations, removeReservation } = useReservations();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Ticket className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-4xl font-headline font-bold">My Reservations</h1>
          <p className="text-foreground/80">View and manage your upcoming adventures.</p>
        </div>
      </div>

      {reservations.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg bg-card">
          <h2 className="text-2xl font-semibold text-foreground/80">No Adventures Booked Yet</h2>
          <p className="text-foreground/80 mt-2">Time to plan your next mystical experience!</p>
          <Button asChild className="mt-4">
            <Link href="/">Book an Activity</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservations.map((reservation) => (
            <Card key={reservation.id}>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{reservation.activityTitle}</CardTitle>
                {reservation.activityType && (
                  <Badge variant="secondary" className='w-fit'>{reservation.activityType}</Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                 <CardDescription>Reservation ID: {reservation.id.slice(0, 8)}</CardDescription>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{format(reservation.date, 'PPPP')}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{reservation.time}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => removeReservation(reservation.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Cancel Reservation
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
