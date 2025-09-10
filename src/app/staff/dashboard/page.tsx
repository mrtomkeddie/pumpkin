
'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { allReservations, allGiftCardPurchases, allActivities } from "@/app/staff/data";
import { Ticket, Gift, Archive, Calendar as CalendarIcon } from "lucide-react";
import { GiftCardSummary } from "@/components/staff/gift-card-summary";
import { SalesSummary } from "@/components/staff/sales-summary";
import { BookingDetails } from "@/components/staff/booking-details";
import { ReservationsTable } from "@/components/staff/reservations-table";
import type { Reservation } from "@/lib/types";

export default function StaffDashboard() {
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const upcomingReservations = allReservations.filter(r => r.date >= new Date());
  const pastReservations = allReservations.filter(r => r.date < new Date());

  const giftCardsSoldCount = allGiftCardPurchases.length;

  const handleRowClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
  };

  const closeDialog = () => {
    setSelectedReservation(null);
  }

  const parsePrice = (price: string) => parseFloat(price.replace('£', ''));

  const pumpkinSales = allReservations
    .filter(r => r.activitySlug === 'pumpkin-picking')
    .reduce((total, reservation) => {
        const activity = allActivities.find(a => a.slug === reservation.activitySlug);
        const activityTypeDetails = activity?.types?.find(t => t.title === reservation.activityType);
        if (activityTypeDetails) {
            return total + parsePrice(activityTypeDetails.price);
        }
        return total;
  }, 0);

  const alpacaSales = allReservations
    .filter(r => r.activitySlug === 'alpaca-walk')
    .reduce((total, reservation) => {
        const activity = allActivities.find(a => a.slug === reservation.activitySlug);
        if (reservation.packages && reservation.packages.length > 0) {
            return total + reservation.packages.reduce((pkgTotal, pkg) => {
                const packageType = activity?.types?.find(t => t.slug === pkg.slug);
                return pkgTotal + (packageType ? parsePrice(packageType.price) * pkg.quantity : 0);
            }, 0);
        }
        return total;
    }, 0);
  
  const giftCardSales = allGiftCardPurchases.reduce((total, card) => total + parseFloat(card.amount), 0);
  const totalSales = pumpkinSales + alpacaSales + giftCardSales;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
       <div className="flex items-center gap-4">
        <Ticket className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-4xl font-headline font-bold">Dashboard</h1>
          <p className="text-foreground/80">An overview of your events and sales.</p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SalesSummary 
            totalSales={totalSales}
            pumpkinSales={pumpkinSales}
            alpacaSales={alpacaSales}
            giftCardSales={giftCardSales}
          />
          <GiftCardSummary count={giftCardsSoldCount} />
      </div>

      <Dialog open={!!selectedReservation} onOpenChange={(isOpen) => !isOpen && closeDialog()}>
        <Tabs defaultValue="upcoming" className="w-full">
            <Card>
                 <CardHeader>
                    <CardTitle>All Bookings</CardTitle>
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <CardDescription>
                            A list of all bookings made for your events. Click a row to view details.
                        </CardDescription>
                         <TabsList className="grid w-full grid-cols-2 md:w-auto">
                            <TabsTrigger value="upcoming" className="flex items-center gap-2"><CalendarIcon className="h-4 w-4" />Upcoming ({upcomingReservations.length})</TabsTrigger>
                            <TabsTrigger value="archive" className="flex items-center gap-2"><Archive className="h-4 w-4" />Archive ({pastReservations.length})</TabsTrigger>
                        </TabsList>
                    </div>
                </CardHeader>
                <CardContent>
                    <TabsContent value="upcoming">
                        <ReservationsTable reservations={upcomingReservations} onRowClick={handleRowClick} />
                    </TabsContent>
                    <TabsContent value="archive">
                        <ReservationsTable reservations={pastReservations} onRowClick={handleRowClick} />
                    </TabsContent>
                </CardContent>
            </Card>
        </Tabs>
        
        {selectedReservation && (
           <DialogContent className="sm:max-w-md">
             <DialogHeader>
                <DialogTitle className="sr-only">Booking Details</DialogTitle>
             </DialogHeader>
             <BookingDetails reservation={selectedReservation} />
           </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
