import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function fetchWrapper<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      let errorBody;
      try {
        errorBody = await response.json();
      } catch (e) {
        // Ignore if response body is not JSON
      }
      console.error(`HTTP Error: ${response.status} ${response.statusText}`, { url, options, errorBody });
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    // Handle cases where the response might be empty (e.g., 204 No Content)
    const contentType = response.headers.get("content-type");
    if (response.status === 204 || !contentType || !contentType.includes("application/json")) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return undefined as any; // Or handle as needed, maybe return null or an empty object
    }

    return await response.json() as T;
  } catch (error) {
    console.error("Fetch Error:", { url, options, error });
    // Re-throw the error after logging
    if (error instanceof Error) {
      throw new Error(`Failed to fetch ${url}: ${error.message}`);
    }
    throw new Error(`An unknown error occurred while fetching ${url}`);
  }
}

// Helper to format duration from ms to MM:SS
export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Helper to parse YouTube ISO 8601 duration format (e.g., PT3M45S)
export function parseYouTubeDuration(duration: string): string {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return "0:00";

    match.shift(); // Remove the full match

    const parts = { H: 0, M: 0, S: 0 };
    match.forEach(part => {
        if (part) {
            const unit = part.slice(-1);
            const value = parseInt(part.slice(0, -1), 10);
            parts[unit as keyof typeof parts] = value;
        }
    });

    const totalSeconds = parts.H * 3600 + parts.M * 60 + parts.S;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
// --- END NEW ---