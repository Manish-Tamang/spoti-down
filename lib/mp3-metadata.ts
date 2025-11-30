import NodeID3 from 'node-id3';
import fs from 'fs/promises';
import path from 'path';

export interface TrackMetadata {
  title: string;
  artist: string;
  album: string;
  imageUrl: string | null;
}

/**
 * Downloads an image from a URL and returns it as a Buffer
 */
async function downloadImage(imageUrl: string): Promise<Buffer | null> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      console.error(`Failed to download image: ${response.status}`);
      return null;
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Error downloading image:', error);
    return null;
  }
}

/**
 * Edits MP3 metadata with Spotify track information
 * @param mp3Path Path to the MP3 file
 * @param metadata Track metadata (title, artist, album, cover image)
 * @returns true if successful, false otherwise
 */
export async function editMP3Metadata(
  mp3Path: string,
  metadata: TrackMetadata
): Promise<boolean> {
  try {
    // Download cover image if available
    let imageBuffer: Buffer | undefined;
    if (metadata.imageUrl) {
      const downloadedImage = await downloadImage(metadata.imageUrl);
      if (downloadedImage) {
        imageBuffer = downloadedImage;
      }
    }

    // Prepare ID3 tags
    const tags: NodeID3.Tags = {
      title: metadata.title,
      artist: metadata.artist,
      album: metadata.album,
    };

    // Add cover image if available
    if (imageBuffer) {
      // Detect image MIME type from URL or default to JPEG
      let mimeType = 'image/jpeg';
      if (metadata.imageUrl) {
        if (metadata.imageUrl.toLowerCase().includes('.png')) {
          mimeType = 'image/png';
        } else if (metadata.imageUrl.toLowerCase().includes('.jpg') || metadata.imageUrl.toLowerCase().includes('.jpeg')) {
          mimeType = 'image/jpeg';
        }
      }
      
      tags.image = {
        mime: mimeType,
        type: { id: 3, name: 'Front Cover' }, // Front cover
        description: 'Cover',
        imageBuffer: imageBuffer,
      };
    }

    // Write tags to the MP3 file
    // NodeID3.write returns true on success, false on failure, or throws an error
    try {
      const success = NodeID3.write(tags, mp3Path);
      if (success) {
        console.log(`Successfully edited metadata for: ${mp3Path}`);
        return true;
      } else {
        console.error(`Failed to write metadata to: ${mp3Path}`);
        return false;
      }
    } catch (writeError) {
      console.error(`Error writing metadata to ${mp3Path}:`, writeError);
      return false;
    }
  } catch (error) {
    console.error(`Error editing MP3 metadata for ${mp3Path}:`, error);
    return false;
  }
}

