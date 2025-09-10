
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useReservations } from '@/context/reservations-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Trash2, User, Users, Box, Search } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Reservation } from '@/lib/types';

const searchFormSchema = z.object({
  query: z.string().min(1, 'Please enter your email or phone number.'),
});
type SearchFormValues = z.infer<typeof searchFormSchema>;

export default function ReservationsPage() {
  const { reservations: allReservations, removeReservation } = useReservations();
  const [searchedReservations, setSearchedReservations] = useState<Reservation[] | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
  });

  const handleSearch = (data: SearchFormValues) => {
    const query = data.query.toLowerCase().trim();
    const results = allReservations.filter(
      (r) => r.email.toLowerCase() === query || r.phone === query
    );
    setSearchedReservations(results);
    setSearchAttempted(true);
  };

  const clearSearch = () => {
    setSearchedReservations(null);
    setSearchAttempted(false);
    form.reset();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Search className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-4xl font-headline font-bold">My Reservations</h1>
          <p className="text-foreground/80">Look up your booking details below.</p>
        </div>
      </div>

      {searchedReservations === null ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Search className="h-6 w-6 text-primary" />
                Find Your Booking
            </CardTitle>
            <CardDescription>Enter the email address or phone number you used to book.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSearch)} className="flex items-end gap-4">
                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Email or Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. your@email.com or 07123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="h-10">Search</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <div>
            <div className="flex justify-end mb-4">
                <Button variant="outline" onClick={clearSearch}>Start New Search</Button>
            </div>
            {searchedReservations.length === 0 && searchAttempted ? (
            <div className="text-center py-20 border-2 border-dashed rounded-lg bg-card">
                <h2 className="text-2xl font-semibold text-foreground/80">No Bookings Found</h2>
                <p className="text-foreground/80 mt-2">We couldn't find any bookings with that information.</p>
                <Button asChild className="mt-4">
                <Link href="/">Book an Activity</Link>
                </Button>
            </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchedReservations.map((reservation) => (
                    <Card key={reservation.id} className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">{reservation.activityTitle}</CardTitle>
                        {reservation.activityType && (
                        <Badge variant="secondary" className='w-fit'>{reservation.activityType}</Badge>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-3 flex-1">
                        <div className="flex items-center gap-3 text-sm font-semibold">
                        <User className="h-4 w-4 text-primary" />
                        <span>{reservation.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{format(reservation.date, 'PPPP')}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{reservation.time}</span>
                        </div>
                        {reservation.quantity && (
                        <div className="flex items-center gap-3 text-sm">
                            <Users className="h-4 w-4 text-primary" />
                            <span>{reservation.quantity} {reservation.quantity > 1 ? 'people' : 'person'}</span>
                        </div>
                        )}
                        {reservation.packages && reservation.packages.length > 0 && (
                        <>
                            <Separator className='my-4' />
                            <div className='space-y-2'>
                            <div className="flex items-center gap-3 text-sm font-semibold">
                                <Box className="h-4 w-4 text-primary" />
                                <span>Package Summary</span>
                            </div>
                            {reservation.packages.map(pkg => (
                                <div key={pkg.slug} className='flex justify-between items-center text-sm ml-7'>
                                <span className='text-muted-foreground'>{pkg.title}</span>
                                <span className='font-bold'>x{pkg.quantity}</span>
                                </div>
                            ))}
                            </div>
                        </>
                        )}

                    </CardContent>
                    <CardFooter className="flex flex-col items-stretch gap-2 pt-4">
                        <CardDescription>
                            Reservation ID: {reservation.id.slice(0, 8)}
                        </CardDescription>
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
      )}

      {allReservations.length === 0 && !searchAttempted &&(
        <div className="text-center py-20 border-2 border-dashed rounded-lg bg-card mt-8">
            <h2 className="text-2xl font-semibold text-foreground/80">Welcome!</h2>
            <p className="text-foreground/80 mt-2">No adventures have been booked on this device yet. Ready to create one?</p>
            <Button asChild className="mt-4">
                <Link href="/">Book an Activity</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
