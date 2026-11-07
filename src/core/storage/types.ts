// src/core/storage/types.ts

export type SupportedStorageFormat =
  | 'pdf' | 'docx' | 'csv' | 'txt'
  | 'png' | 'jpg' | 'jpeg' | 'webp'
  | 'json' | 'md' | 'zip';

export interface StorageFile {
  id: string;
  path: string;          // Supabase storage path
  name: string;          // Original file name
  size: number;          // Bytes
  format: SupportedStorageFormat;
  userId: string;
  jobId?: string;
  publicUrl?: string;
  createdAt: string;
}

export interface UploadOptions {
  jobId?: string;
  /** If true, generates a public URL immediately after upload */
  makePublic?: boolean;
  /** Expiry in seconds for signed URLs (default 3600) */
  signedUrlExpiry?: number;
}
