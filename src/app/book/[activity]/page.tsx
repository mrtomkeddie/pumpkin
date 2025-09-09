
'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams, useSearchParams, useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Calendar as CalendarIcon, Clock, ArrowLeft, Ticket, Users, Sun, Moon, Mic2, User, Mail, Phone } from 'lucide-react';

import { activities } from '@/app/data';
import { useReservations } from '@/context/reservations-context';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

const dayTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const moonlitTimes = ['19:00', '20:00'];
const pumpkinTimes = ['15:00', '16:00', '17:00'];

const currentYear = new Date().getFullYear();

const moonlitDates = [
  new Date(currentYear, 9, 10), // Oct 10
  new Date(currentYear, 9, 11), // Oct 11
  new Date(currentYear, 9, 17), // Oct 17
  new Date(currentYear, 9, 18), // Oct 18
  new Date(currentYear, 9, 24), // Oct 24
  new Date(currentYear, 9, 25), // Oct 25
].map(d => d.setHours(0,0,0,0));

const quietDates = [
    new Date(currentYear, 9, 15),
    new Date(currentYear, 9, 16),
    new Date(currentYear, 9, 17),
    new Date(currentYear, 9, 22),
    new Date(currentYear, 9, 23),
    new Date(currentYear, 9, 24),
].map(d => d.setHours(0,0,0,0));


const BookingFormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Please enter a valid email.'),
  phone: z.string().optional(),
  activityType: z.string({
    required_error: 'Please select a booking option.',
  }),
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
  const searchParams = useSearchParams();
  const { addReservation } = useReservations();
  const { toast } = useToast();
  const activitySlug = typeof params.activity === 'string' ? params.activity : '';
  const activity = activities.find((a) => a.slug === activitySlug);
  const typeParam = searchParams.get('type');

  const getInitialTimes = () => {
    if (activity?.slug === 'pumpkin-picking') {
        const isMoonlit = typeParam === 'moonlit';
        return isMoonlit ? moonlitTimes : pumpkinTimes;
    }
    return dayTimes;
  }

  const [availableTimes, setAvailableTimes] = useState<string[]>(getInitialTimes());

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      activityType: typeParam || activity?.types?.[0].slug,
    }
  });

  const watchedActivityType = form.watch('activityType');

  useEffect(() => {
    if (activity?.slug === 'pumpkin-picking' && typeParam) {
      form.setValue('activityType', typeParam);
    }
  }, [typeParam, activity, form]);

  useEffect(() => {
    let newTimes: string[];
    const isMoonlit = watchedActivityType === 'moonlit';
    const isQuiet = watchedActivityType === 'quiet';

    if (activity?.slug === 'pumpkin-picking') {
        newTimes = isMoonlit ? moonlitTimes : pumpkinTimes;
    } else {
        newTimes = dayTimes; // Assuming alpaca walk uses dayTimes
    }
    setAvailableTimes(newTimes);

    // Reset time if it's not in the new set of available times
    const currentTime = form.getValues('time');
    if (currentTime && !newTimes.includes(currentTime)) {
      form.setValue('time', '');
    }

    // Reset date if changing to/from moonlit/quiet and it's invalid
    const currentDate = form.getValues('date');
    if (currentDate) {
        const currentDateOnly = new Date(currentDate).setHours(0,0,0,0);
        if (isMoonlit && !moonlitDates.includes(currentDateOnly)) {
            form.setValue('date', undefined as any);
        } else if (isQuiet && !quietDates.includes(currentDateOnly)) {
            form.setValue('date', undefined as any);
        } else if (!isMoonlit && !isQuiet && (moonlitDates.includes(currentDateOnly) || quietDates.includes(currentDateOnly))) {
            form.setValue('date', undefined as any);
        }
    }

  }, [watchedActivityType, form, activity?.slug]);

  if (!activity) {
    notFound();
  }
  
  const hasTypes = !!activity.types;
  const isPumpkinBooking = activity.slug === 'pumpkin-picking';

  function onSubmit(data: BookingFormValues) {
    const activityType = activity?.types?.find(t => t.slug === data.activityType)?.title;

    addReservation({
      activityTitle: activity!.title,
      activitySlug: activity!.slug,
      activityType: activityType,
      date: data.date,
      time: data.time,
      name: data.name,
      email: data.email,
      phone: data.phone,
    });
    router.push('/reservations');
  }

  const TypeIcon = ({ slug }: { slug: string }) => {
    switch (slug) {
        case 'day': return <Sun className="h-5 w-5 text-primary" />;
        case 'quiet': return <Mic2 className="h-5 w-5 text-primary" />;
        case 'moonlit': return <Moon className="h-5 w-5 text-primary" />;
        case 'adult':
        case 'child':
        case 'shared':
        case 'spectator':
            return <Users className="h-5 w-5 text-primary" />;
        default: return <Ticket className="h-5 w-5 text-primary" />;
    }
  };


  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 pt-36">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-4xl">{activity.title}</CardTitle>
          <CardDescription>Select your preferred package, date, and time for this magical experience.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="space-y-4">
                  <FormLabel className="text-lg font-semibold flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    Your Details
                  </FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm"><User className="h-4 w-4" /> Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4" /> Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4" /> Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Contact Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {hasTypes && (
                <FormField
                  control={form.control}
                  name="activityType"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-lg font-semibold flex items-center gap-2">
                        <Ticket className="h-6 w-6 text-primary" />
                        Choose Your Experience
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          {activity.types!.map((type) => (
                            <FormItem key={type.slug}>
                              <FormControl>
                                <RadioGroupItem value={type.slug} id={type.slug} className="sr-only" />
                              </FormControl>
                              <FormLabel
                                htmlFor={type.slug}
                                className="flex flex-col rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary h-full"
                              >
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-base">{type.title}</h3>
                                    <TypeIcon slug={type.slug} />
                                </div>
                                <p className="text-sm text-muted-foreground flex-1 mb-3">{type.description}</p>
                                <div className="text-right">
                                    <p className="font-bold text-lg">{type.price}</p>
                                    <p className="text-xs text-muted-foreground">{type.details}</p>
                                </div>
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {hasTypes && <Separator />}


              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-lg font-semibold flex items-center gap-2 mb-2"><CalendarIcon className="h-6 w-6 text-primary" /> Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full justify-start text-left font-normal h-11',
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
                            defaultMonth={isPumpkinBooking ? new Date(new Date().getFullYear(), 9) : undefined}
                            disabled={(date) => {
                                const today = new Date();
                                today.setHours(0,0,0,0);
                                if (date < today) return true;

                                const dateOnly = new Date(date).setHours(0,0,0,0);

                                if (activity.slug === 'pumpkin-picking') {
                                    if (date.getMonth() !== 9) { // 9 is October
                                        return true;
                                    }
                                    const isMoonlitType = watchedActivityType === 'moonlit';
                                    const isQuietType = watchedActivityType === 'quiet';

                                    const isMoonlitDate = moonlitDates.includes(dateOnly);
                                    const isQuietDate = quietDates.includes(dateOnly);

                                    if (isMoonlitType) {
                                        return !isMoonlitDate;
                                    } else if (isQuietType) {
                                        return !isQuietDate;
                                    } else {
                                        return isMoonlitDate || isQuietDate;
                                    }
                                } else {
                                     if (date > new Date(new Date().setDate(new Date().getDate() + 60))) {
                                        return true;
                                    }
                                }
                                return false;
                            }}
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
                    <FormItem className="flex flex-col mt-px">
                      <FormLabel className="text-lg font-semibold flex items-center gap-2 mb-2"><Clock className="h-6 w-6 text-primary" /> Time</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-3 sm:grid-cols-4 gap-2"
                        >
                          {availableTimes.map((time) => (
                            <FormItem key={time}>
                              <FormControl>
                                <RadioGroupItem value={time} id={time} className="sr-only" />
                              </FormControl>
                              <FormLabel
                                htmlFor={time}
                                className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover py-3 px-2 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary h-11"
                              >
                                {time}
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
              <CardFooter className="flex flex-col-reverse sm:flex-row gap-4 mt-8 p-0">
                <Button variant="outline" size="lg" className="w-full" type="button" onClick={() => router.back()}>
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>
                <Button type="submit" size="lg" className="w-full">
                  Confirm Booking
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
