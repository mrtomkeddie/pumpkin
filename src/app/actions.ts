'use server';

import { suggestOptimalTimeslots } from '@/ai/flows/suggest-optimal-timeslots';

export async function getSuggestedTimes(activity: string, date: string) {
  try {
    const result = await suggestOptimalTimeslots({ activity, date });
    if (!result || !result.timeslots) {
      return { success: false, error: 'AI did not return valid suggestions.' };
    }
    return { success: true, timeslots: result.timeslots };
  } catch (error) {
    console.error('Error suggesting timeslots:', error);
    return { success: false, error: 'An unexpected error occurred while getting suggestions.' };
  }
}
