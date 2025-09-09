
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { format } from 'date-fns';
import { Calendar, Clock, User, Mail, Phone, Users, Box, Ticket, Cat } from "lucide-react";
import type { Reservation } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "../ui/separator";

interface BookingDetailsProps {
    reservation: Reservation;
}

export function BookingDetails({ reservation }: BookingDetailsProps) {
  return (
    <div>
        <CardHeader className="p-0 mb-6">
            <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                    <Ticket className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <CardTitle className="font-headline text-2xl">Booking Details</CardTitle>
                    <CardDescription>ID: {reservation.id.slice(0,8)}</CardDescription>
                </div>
            </div>
        </CardHeader>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Cat className="h-5 w-5 text-primary" />
                        <span>{reservation.activityType || reservation.activityTitle}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                     <div className="flex items-center gap-3 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{format(reservation.date, 'PPPP')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{reservation.time}</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        <span>Customer Details</span>
                    </CardTitle>
                </CardHeader>
                 <CardContent className="space-y-3">
                    <div className="font-semibold">{reservation.name}</div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4 text-primary" />
                        <a href={`mailto:${reservation.email}`} className="hover:underline">{reservation.email}</a>
                    </div>
                    {reservation.phone && (
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4 text-primary" />
                             <a href={`tel:${reservation.phone}`} className="hover:underline">{reservation.phone}</a>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                     <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <span>Participants</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {reservation.packages && reservation.packages.length > 0 ? (
                        <div className='space-y-2'>
                        {reservation.packages.map(pkg => (
                            <div key={pkg.slug} className='flex justify-between items-center text-sm'>
                            <span className='text-muted-foreground'>{pkg.title}</span>
                            <span className='font-bold'>x{pkg.quantity}</span>
                            </div>
                        ))}
                        <Separator className="my-3" />
                         <div className='flex justify-between items-center font-bold'>
                            <span>Total People</span>
                            <span>{reservation.quantity}</span>
                        </div>
                        </div>
                    ) : (
                        <div className='flex justify-between items-center font-bold'>
                            <span>Carload</span>
                            <span>{reservation.quantity} {reservation.quantity === 1 ? 'person' : 'people'}</span>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

