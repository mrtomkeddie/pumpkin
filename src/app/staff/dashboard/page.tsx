
'use client';

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { allReservations, allGiftCardPurchases } from "@/app/staff/data";
import { format } from 'date-fns';
import { Ticket, Users, Phone, Mail, Eye, Archive, Calendar as CalendarIcon } from "lucide-react";
import { GiftCardSummary } from "@/components/staff/gift-card-summary";
import { BookingDetails } from "@/components/staff/booking-details";
import type { Reservation } from "@/lib/types";

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [filter, setFilter] = useState('all');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const sortedReservations = allReservations.sort((a, b) => a.date.getTime() - b.date.getTime());
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingReservations = sortedReservations.filter(r => r.date >= today);
  const pastReservations = sortedReservations.filter(r => r.date < today);

  const getFilteredReservations = (reservations: Reservation[]) => {
    if (filter === 'all') return reservations;
    return reservations.filter(reservation => reservation.activitySlug === filter);
  };
  
  const reservationsToDisplay = activeTab === 'upcoming' ? getFilteredReservations(upcomingReservations) : getFilteredReservations(pastReservations);

  const giftCardsSoldCount = allGiftCardPurchases.length;

  const handleRowClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
  };

  const closeDialog = () => {
    setSelectedReservation(null);
  }

  const ReservationsList = ({ reservations }: { reservations: Reservation[] }) => (
    <>
       {/* Desktop Table View */}
       <div className="hidden md:block">
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead>Customer</TableHead>
                 <TableHead>Activity</TableHead>
                 <TableHead>Date</TableHead>
                 <TableHead>Time</TableHead>
                 <TableHead className="text-right">Participants</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {reservations.map((reservation) => (
                 <DialogTrigger asChild key={reservation.id}>
                   <TableRow onClick={() => handleRowClick(reservation)} className="cursor-pointer">
                     <TableCell>
                       <div className="font-medium">{reservation.name}</div>
                       <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                         <Mail className="h-3 w-3" />
                         {reservation.email}
                       </div>
                       {reservation.phone && (
                         <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                           <Phone className="h-3 w-3" />
                           {reservation.phone}
                         </div>
                       )}
                     </TableCell>
                     <TableCell>{reservation.activityType || reservation.activityTitle}</TableCell>
                     <TableCell>{format(reservation.date, 'dd/MM/yyyy')}</TableCell>
                     <TableCell>{reservation.time}</TableCell>
                     <TableCell className="text-right">
                       {reservation.packages && reservation.packages.length > 0 ? (
                         <div className="flex flex-col items-end gap-1">
                             <div className="flex items-center justify-end gap-2 font-bold">
                                 <Users className="h-4 w-4 text-muted-foreground" />
                                 <span>{reservation.quantity}</span>
                             </div>
                             <div className="text-xs text-muted-foreground">
                             {reservation.packages.map(pkg => `${pkg.quantity}x ${pkg.title}`).join(', ')}
                             </div>
                         </div>
                       ) : (
                         <div className="flex items-center justify-end gap-2">
                             <Users className="h-4 w-4 text-muted-foreground" />
                             <span className="font-bold">{reservation.quantity || 1}</span>
                         </div>
                       )}
                     </TableCell>
                   </TableRow>
                 </DialogTrigger>
               ))}
             </TableBody>
           </Table>
       </div>
       
       {/* Mobile Card View */}
       <div className="grid grid-cols-1 gap-4 md:hidden">
         {reservations.map((reservation) => (
           <DialogTrigger asChild key={reservation.id}>
               <Card onClick={() => handleRowClick(reservation)} className="cursor-pointer hover:bg-muted/50">
                 <CardContent className="p-4 flex items-center justify-between">
                   <div>
                     <p className="font-bold">{reservation.name}</p>
                     <p className="text-sm text-muted-foreground">{reservation.activityType || reservation.activityTitle}</p>
                     <p className="text-sm text-muted-foreground">{format(reservation.date, 'eee, dd MMM')} at {reservation.time}</p>
                   </div>
                    <div className="flex items-center gap-2 text-primary">
                       <Eye className="h-5 w-5" />
                   </div>
                 </CardContent>
               </Card>
           </DialogTrigger>
         ))}
       </div>
       {reservations.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No bookings in this category.</p>
          </div>
        )}
    </>
  );


  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
       <div className="flex items-center gap-4">
        <Ticket className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-4xl font-headline font-bold">Dashboard</h1>
          <p className="text-foreground/80">An overview of your events and sales.</p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <GiftCardSummary count={giftCardsSoldCount} />
      </div>


      <Dialog open={!!selectedReservation} onOpenChange={(isOpen) => !isOpen && closeDialog()}>
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full">
            <Card>
                 <CardHeader>
                    <CardTitle>Reservations</CardTitle>
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <CardDescription>
                            A list of all bookings made for your events.
                        </CardDescription>
                         <TabsList className="grid w-full grid-cols-2 md:w-auto">
                            <TabsTrigger value="upcoming" className="flex items-center gap-2"><CalendarIcon className="h-4 w-4" />Upcoming</TabsTrigger>
                            <TabsTrigger value="archive" className="flex items-center gap-2"><Archive className="h-4 w-4" />Archive</TabsTrigger>
                        </TabsList>
                    </div>
                </CardHeader>
                <CardContent>
                    <TabsContent value="upcoming">
                        <Tabs defaultValue="all" onValueChange={setFilter}>
                             <div className="flex justify-end mb-4">
                                <TabsList>
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="pumpkin-picking">Pumpkin Picking</TabsTrigger>
                                    <TabsTrigger value="alpaca-walk">Alpaca Walk</TabsTrigger>
                                </TabsList>
                            </div>
                            <ReservationsList reservations={getFilteredReservations(upcomingReservations)} />
                        </Tabs>
                    </TabsContent>
                    <TabsContent value="archive">
                        <Tabs defaultValue="all" onValueChange={setFilter}>
                            <div className="flex justify-end mb-4">
                                <TabsList>
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="pumpkin-picking">Pumpkin Picking</TabsTrigger>
                                    <TabsTrigger value="alpaca-walk">Alpaca Walk</TabsTrigger>
                                </TabsList>
                            </div>
                            <ReservationsList reservations={getFilteredReservations(pastReservations)} />
                        </Tabs>
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
