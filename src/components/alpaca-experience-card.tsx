
'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Activity, ActivityType } from '@/lib/types';
import { AlpacaIcon } from './icons';

interface AlpacaExperienceCardProps {
  activity: Activity;
  onBookClick: (activity: Activity, type?: ActivityType) => void;
}

export function AlpacaExperienceCard({ activity, onBookClick }: AlpacaExperienceCardProps) {
  return (
    <Card className="bg-card border-border/50 overflow-hidden group flex flex-col transition-all duration-300 hover:border-primary hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-60 w-full">
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            data-ai-hint={activity.aiHint}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-1 relative flex flex-col">
        <AlpacaIcon className="w-6 h-6 text-primary absolute top-6 right-6" />
        <CardTitle className="font-headline text-2xl tracking-wider mb-2 pr-8">
          {activity.title}
        </CardTitle>
        <CardDescription className="flex-1">{activity.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 bg-transparent mt-auto">
        <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => onBookClick(activity)}>
          Book Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
