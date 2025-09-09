
'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allReservations, allGiftCardPurchases } from "@/app/staff/data";
import { format } from 'date-fns';
import { Ticket, Users, Phone, Mail } from "lucide-react";
import { GiftCardSummary } from "@/components/staff/gift-card-summary";

export default function StaffDashboard() {
  const [filter, setFilter] = useState('all');

  const sortedReservations = allReservations.sort((a, b) => a.date.getTime() - b.date.getTime());

  const filteredReservations = sortedReservations.filter(reservation => {
    if (filter === 'all') return true;
    return reservation.activitySlug === filter;
  });

  const giftCardsSoldCount = allGiftCardPurchases.length;

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


      <Tabs defaultValue="all" onValueChange={setFilter} className="w-full">
         <Card>
            <CardHeader>
              <CardTitle>Reservations</CardTitle>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <CardDescription>
                  A list of all bookings made for your events.
                </CardDescription>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pumpkin-picking">Pumpkin Picking</TabsTrigger>
                  <TabsTrigger value="alpaca-walk">Alpaca Walk</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value={filter}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="hidden md:table-cell">Time</TableHead>
                      <TableHead className="text-right">Participants</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReservations.map((reservation) => (
                      <TableRow key={reservation.id}>
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
                        <TableCell className="hidden md:table-cell">
                          {format(reservation.date, 'dd/MM/yyyy')}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {reservation.time}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="font-bold">{reservation.quantity || 1}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </CardContent>
          </Card>
      </Tabs>
    </div>
  )
}
