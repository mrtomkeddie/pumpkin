// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting optimal timeslots for activities
 *  based on historical booking data and activity popularity.
 *
 * - suggestOptimalTimeslots - A function that suggests optimal timeslots for a given activity.
 * - SuggestOptimalTimeslotsInput - The input type for the suggestOptimalTimeslots function.
 * - SuggestOptimalTimeslotsOutput - The return type for the suggestOptimalTimeslots function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptimalTimeslotsInputSchema = z.object({
  activity: z.string().describe('The activity for which to suggest timeslots.'),
  date: z.string().describe('The date for which to suggest timeslots (YYYY-MM-DD).'),
});
export type SuggestOptimalTimeslotsInput = z.infer<
  typeof SuggestOptimalTimeslotsInputSchema
>;

const SuggestOptimalTimeslotsOutputSchema = z.object({
  timeslots: z.array(
    z.string().describe('A list of optimal timeslots in HH:MM format.')
  ).describe('Suggested timeslots for the activity and date, ranked by popularity and availability.'),
});
export type SuggestOptimalTimeslotsOutput = z.infer<
  typeof SuggestOptimalTimeslotsOutputSchema
>;

export async function suggestOptimalTimeslots(
  input: SuggestOptimalTimeslotsInput
): Promise<SuggestOptimalTimeslotsOutput> {
  return suggestOptimalTimeslotsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptimalTimeslotsPrompt',
  input: {schema: SuggestOptimalTimeslotsInputSchema},
  output: {schema: SuggestOptimalTimeslotsOutputSchema},
  prompt: `You are an AI assistant that suggests optimal timeslots for activities.

  Based on historical booking data and activity popularity, suggest the best timeslots for the given activity and date.

  Activity: {{{activity}}}
  Date: {{{date}}}

  Return a JSON array of timeslots in HH:MM format, ranked by popularity and availability.
  Explain briefly as a sentence why these timeslots have been chosen.
  Example:
  {
    "timeslots": ["10:00", "14:00", "16:00"]
  }`,
});

const suggestOptimalTimeslotsFlow = ai.defineFlow(
  {
    name: 'suggestOptimalTimeslotsFlow',
    inputSchema: SuggestOptimalTimeslotsInputSchema,
    outputSchema: SuggestOptimalTimeslotsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
