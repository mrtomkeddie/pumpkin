'use client';

import { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { WandSparkles, Calendar as CalendarIcon, Clock, Loader2 } from 'lucide-react';

import { activities } from '@/app/data';
import { useReservations } from '@/context/reservations-context';
import { getSuggestedTimes } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const availableTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

const BookingFormSchema = z.object({
  date: z.date({
    required_error: 'A date is required.',
  }),
  time: z.string({
    required_error: 'Please select a time.',
  }),
});

type BookingFormValues = z.infer<typeof BookingFormSchema>;

export default function BookActivityPage() {
  const router = useRouter();
  const params = useParams();
  const { addReservation } = useReservations();
  const { toast } = useToast();
  const activitySlug = typeof params.activity === 'string' ? params.activity : '';
  const activity = activities.find((a) => a.slug === activitySlug);

  const [suggestedTimes, setSuggestedTimes] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(BookingFormSchema),
  });

  if (!activity) {
    notFound();
  }

  const handleSuggestTimes = async () => {
    const selectedDate = form.getValues('date');
    if (!selectedDate) {
      toast({
        title: 'Please select a date first',
        description: 'We need a date to suggest the best times.',
        variant: 'destructive',
      });
      return;
    }
    setIsSuggesting(true);
    setSuggestedTimes([]);
    const result = await getSuggestedTimes(activity.title, format(selectedDate, 'yyyy-MM-dd'));
    if (result.success && result.timeslots) {
      setSuggestedTimes(result.timeslots);
    } else {
      toast({
        title: 'Suggestion Error',
        description: result.error || 'Could not fetch suggestions at this time.',
        variant: 'destructive',
      });
    }
    setIsSuggesting(false);
  };

  function onSubmit(data: BookingFormValues) {
    addReservation({
      activityTitle: activity!.title,
      activitySlug: activity!.slug,
      date: data.date,
      time: data.time,
    });
    router.push('/reservations');
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Card className="bg-card/80">
        <CardHeader>
          <CardTitle className="font-headline text-4xl">{activity.title}</CardTitle>
          <CardDescription>Select your preferred date and time for this magical experience.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="flex items-center gap-2 mb-2"><CalendarIcon className="h-5 w-5 text-primary" /> Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date() || date > new Date(new Date().setDate(new Date().getDate() + 60))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> Time</FormLabel>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={handleSuggestTimes}
                        disabled={isSuggesting}
                        className="mb-2"
                      >
                        {isSuggesting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <WandSparkles className="mr-2 h-4 w-4" />
                        )}
                        Suggest Best Times
                      </Button>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-3 gap-4"
                        >
                          {availableTimes.map((time) => (
                            <FormItem key={time}>
                              <FormControl>
                                <RadioGroupItem value={time} id={time} className="sr-only" />
                              </FormControl>
                              <FormLabel
                                htmlFor={time}
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary"
                              >
                                {time}
                                {suggestedTimes.includes(time) && (
                                  <Badge variant="default" className="mt-1 text-xs">Suggested</Badge>
                                )}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" size="lg" className="w-full mt-8">
                Confirm Booking
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
