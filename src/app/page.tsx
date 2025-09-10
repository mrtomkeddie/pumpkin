
'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { activities } from "@/app/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, MapPin, Phone, Mail, Sun, Gift, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Activity, ActivityType } from "@/lib/types";
import { AlpacaIcon } from "@/components/icons";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { BookingForm } from "@/components/booking-form";
import { AlpacaExperienceCard } from "@/components/alpaca-experience-card";

export default function Home() {
  const [activeTab, setActiveTab] = useState('pumpkin-picking');
  const [selectedItem, setSelectedItem] = useState<{ activity: Activity, type?: ActivityType } | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const pumpkinActivity = activities.find(a => a.slug === 'pumpkin-picking')!;
  const alpacaActivity = activities.find(a => a.slug === 'alpaca-walk')!;

  const handleBookClick = (activity: Activity, type?: ActivityType) => {
    setSelectedItem({ activity, type });
    setIsSheetOpen(true);
  };
  
  const handleBookingConfirmed = () => {
    setIsSheetOpen(false);
  };

  const ExperienceCard = ({ item, parentActivity }: { item: Activity | ActivityType, parentActivity?: Activity }) => {
    const activity = parentActivity || (item as Activity);
    const type = parentActivity ? (item as ActivityType) : undefined;
    
    const itemIcon = 'icon' in item ? item.icon : AlpacaIcon;

    return (
       <Card className="bg-card border-border/50 overflow-hidden group flex flex-col transition-all duration-300 hover:border-primary hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative h-60 w-full">
            <Image
              src={item.image!}
              alt={item.title}
              fill
              data-ai-hint={item.aiHint}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-1 relative flex flex-col">
            {itemIcon && <item.icon className="w-6 h-6 text-primary absolute top-6 right-6" />}
            <CardTitle className="font-headline text-2xl tracking-wider mb-2 pr-8">
              {item.title}
            </CardTitle>
            <CardDescription className="flex-1">{item.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-6 bg-transparent mt-auto">
           <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => handleBookClick(activity, type)}>
              Book Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <>
      <div className="flex flex-col flex-1 pt-0 -mt-24">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent className="overflow-y-auto sm:max-w-lg">
            <SheetHeader>
              <SheetTitle className="font-headline text-3xl">Complete Your Booking</SheetTitle>
              <SheetDescription>
                You're just a few steps away from your next adventure.
              </SheetDescription>
            </SheetHeader>
            {selectedItem && (
              <BookingForm
                activity={selectedItem.activity}
                activityTypeSlug={selectedItem.type?.slug}
                onBookingConfirmed={handleBookingConfirmed}
              />
            )}
          </SheetContent>
        </Sheet>

        <main className="flex-1 flex flex-col">
          <section className="relative flex flex-col items-center justify-center text-center p-4 min-h-screen text-white">
            <div className="absolute inset-0">
              <Image
                src="/home.png"
                alt="The Black Cat Events entrance with pumpkin decorations"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <p className="text-primary font-semibold mb-2">Welcome To Black Cat Events</p>
              <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4 leading-tight">
                Discover the Spirit of Autumn
              </h1>
              <p className="max-w-2xl text-lg md:text-xl mb-8">
                Pumpkin picking, alpaca adventures, photo opportunities, and festive activities—everything you love about fall in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="#experiences">
                    Book Your Experience
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <section id="experiences" className="min-h-screen flex flex-col justify-center bg-background py-12 md:py-0">
            <div className="container mx-auto px-4">
              <h2 className="text-center text-4xl font-bold font-headline mb-2">Choose Your Experience</h2>
              <div className="flex justify-center mb-12">
                <div className="h-1 w-24 bg-primary rounded-full" />
              </div>

              <div className="flex justify-center mb-12">
                <div className="bg-muted p-1 rounded-full flex items-center space-x-1">
                  <button
                    onClick={() => setActiveTab('pumpkin-picking')}
                    className={cn(
                      "px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none",
                      activeTab === 'pumpkin-picking'
                        ? "bg-primary text-primary-foreground shadow"
                        : "text-muted-foreground hover:bg-card/80"
                    )}
                  >
                    <div className='flex items-center gap-2'>
                      <Sun className="h-5 w-5" />
                      <span className="sm:hidden">Pumpkins</span>
                      <span className="hidden sm:inline">Pumpkin Picking</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('alpaca-walk')}
                    className={cn(
                      "px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none",
                      activeTab === 'alpaca-walk'
                        ? "bg-primary text-primary-foreground shadow"
                        : "text-muted-foreground hover:bg-card/80"
                    )}
                  >
                    <div className='flex items-center gap-2'>
                      <AlpacaIcon className="h-5 w-5" />
                      <span className="sm:hidden">Alpacas</span>
                      <span className="hidden sm:inline">Alpaca Walks</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('gift-card')}
                    className={cn(
                      "px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none",
                      activeTab === 'gift-card'
                        ? "bg-primary text-primary-foreground shadow"
                        : "text-muted-foreground hover:bg-card/80"
                    )}
                  >
                    <div className='flex items-center gap-2'>
                      <Gift className="h-5 w-5" />
                      <span className="sm:hidden">Gifts</span>
                      <span className="hidden sm:inline">Gift Cards</span>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                {activeTab === 'pumpkin-picking' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {pumpkinActivity?.types?.map((type) => (
                      <ExperienceCard key={type.slug} item={type} parentActivity={pumpkinActivity} />
                    ))}
                  </div>
                )}
                {activeTab === 'alpaca-walk' && (
                  <div className="flex justify-center">
                    <div className="w-full md:w-2/3 lg:w-1/2">
                      <AlpacaExperienceCard
                        activity={alpacaActivity}
                        onBookClick={handleBookClick}
                      />
                    </div>
                  </div>
                )}
                {activeTab === 'gift-card' && (
                  <div className="flex justify-center">
                    <div className="w-full md:w-2/3 lg:w-1/2">
                      <Card className="bg-card border-border/50 overflow-hidden group flex flex-col transition-all duration-300 hover:border-primary hover:shadow-lg">
                        <CardHeader className="p-0">
                          <div className="relative h-60 w-full">
                            <Image
                              src="/pumpkin.png"
                              alt="A decorative pumpkin"
                              fill
                              data-ai-hint="pumpkin decorative"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 flex-1 relative flex flex-col">
                          <Gift className="w-6 h-6 text-primary absolute top-6 right-6" />
                          <CardTitle className="font-headline text-2xl tracking-wider mb-2 pr-8">
                            Gift Card
                          </CardTitle>
                          <CardDescription className="flex-1">The perfect gift for any occasion. Give the gift of a magical experience at Black Cat Events, redeemable against any of our activities.</CardDescription>
                        </CardContent>
                        <CardFooter className="p-6 bg-transparent mt-auto">
                          <Button asChild className="w-full bg-primary hover:bg-primary/90">
                            <Link href="/gift-card">
                              Purchase Now <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
        <footer className="py-8 md:py-6 text-sm text-foreground border-t">
          <div className="container mx-auto flex flex-col justify-center items-center gap-4 text-center">
            <div className="flex gap-4 items-center">
              <Link
                href="/info"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Info className="w-4 h-4 text-primary" />
                <span>Contact & FAQ</span>
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link
                href="/staff/login"
                className="hover:text-primary transition-colors"
              >
                Staff Login
              </Link>
            </div>
            <p className="text-muted-foreground">© 2025 Black Cat Events | Design by Tom Keddie</p>
          </div>
        </footer>
      </div>
    </>
  );
}
