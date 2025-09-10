
'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { type Reservation } from "@/lib/types";

interface ReservationsTableProps {
    reservations: Reservation[];
    onRowClick: (reservation: Reservation) => void;
}

export function ReservationsTable({ reservations, onRowClick }: ReservationsTableProps) {
  return (
    <div className="overflow-x-auto">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Activity</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {reservations.map((reservation) => (
                    <TableRow key={reservation.id} onClick={() => onRowClick(reservation)} className="cursor-pointer">
                        <TableCell>
                            <div className="font-medium">{reservation.name}</div>
                            <div className="text-xs text-muted-foreground hidden sm:block">{reservation.email}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <Badge variant="outline">{reservation.activityType || reservation.activityTitle}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{format(reservation.date, 'PPP')}</TableCell>
                        <TableCell className="text-right">{reservation.time}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  );
}
