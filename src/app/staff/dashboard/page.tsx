
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { allReservations } from "@/app/staff/data";
import { format } from 'date-fns';
import { Ticket } from "lucide-react";

export default function StaffDashboard() {

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
       <div className="flex items-center gap-4">
        <Ticket className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-4xl font-headline font-bold">All Bookings</h1>
          <p className="text-foreground/80">A complete list of all reservations.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Reservations</CardTitle>
          <CardDescription>
            A list of all bookings made for your events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">Time</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>
                    <div className="font-medium">{reservation.name}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {reservation.email}
                    </div>
                  </TableCell>
                  <TableCell>{reservation.activityTitle}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(reservation.date, 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {reservation.time}
                  </TableCell>
                  <TableCell className="text-right">
                    {reservation.activityType ? (
                       <Badge variant="outline">{reservation.activityType}</Badge>
                    ) : (
                       <span>{reservation.quantity} people</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
