/**
 * Calculate reading time based on word count
 * Average reading speed: 200-250 words per minute
 * We'll use 225 words per minute for a balanced estimate
 */

export function calculateReadingTime(content: string): number {
  // Remove HTML tags and extra whitespace
  const cleanContent = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  
  // Count words (split by spaces and filter out empty strings)
  const wordCount = cleanContent.split(' ').filter(word => word.length > 0).length;
  
  // Calculate reading time (225 words per minute)
  const readingTimeMinutes = Math.ceil(wordCount / 225);
  
  // Minimum 1 minute reading time
  return Math.max(1, readingTimeMinutes);
}

export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return '1 min read';
  }
  return `${minutes} min read`;
}
