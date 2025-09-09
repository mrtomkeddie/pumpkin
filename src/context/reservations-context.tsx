'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Reservation } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface ReservationsContextType {
  reservations: Reservation[];
  addReservation: (reservation: Omit<Reservation, 'id'>) => void;
  removeReservation: (id: string) => void;
}

const ReservationsContext = createContext<ReservationsContextType | undefined>(undefined);

export const ReservationsProvider = ({ children }: { children: ReactNode }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedReservations = localStorage.getItem('blackCatReservations');
      if (storedReservations) {
        const parsed = JSON.parse(storedReservations).map((r: any) => ({ ...r, date: new Date(r.date) }));
        setReservations(parsed);
      }
    } catch (error) {
      console.error("Failed to parse reservations from localStorage", error);
      setReservations([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('blackCatReservations', JSON.stringify(reservations));
    } catch (error) {
      console.error("Failed to save reservations to localStorage", error);
    }
  }, [reservations]);

  const addReservation = (reservation: Omit<Reservation, 'id'>) => {
    const newReservation: Reservation = { ...reservation, id: crypto.randomUUID() };
    setReservations(prev => [...prev, newReservation]);
    toast({
      title: "Booking Confirmed!",
      description: `Your adventure for ${reservation.activityTitle} is booked.`,
    });
  };

  const removeReservation = (id: string) => {
    setReservations(prev => prev.filter(r => r.id !== id));
    toast({
      title: "Reservation Cancelled",
      description: "Your booking has been successfully cancelled.",
    });
  };

  return (
    <ReservationsContext.Provider value={{ reservations, addReservation, removeReservation }}>
      {children}
    </ReservationsContext.Provider>
  );
};

export const useReservations = () => {
  const context = useContext(ReservationsContext);
  if (context === undefined) {
    throw new Error('useReservations must be used within a ReservationsProvider');
  }
  return context;
};
