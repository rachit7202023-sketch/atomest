// src/core/storage/storage-service.ts
// Shared storage abstraction over Supabase Storage.
// All AI Employee file outputs go through here.

import { supabase } from '@/lib/supabase';
import type { StorageFile, SupportedStorageFormat, UploadOptions } from './types';

const BUCKET = 'atomest-outputs';
const DEFAULT_SIGNED_URL_EXPIRY = 3600; // 1 hour

export const storageService = {
  /**
   * Upload a file to Supabase Storage.
   * Returns a StorageFile with the path and optional signed URL.
   */
  async upload(file: File, userId: string, opts: UploadOptions = {}): Promise<StorageFile> {
    const ext = file.name.split('.').pop()?.toLowerCase() as SupportedStorageFormat;
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = opts.jobId
      ? `${userId}/${opts.jobId}/${timestamp}_${safeName}`
      : `${userId}/${timestamp}_${safeName}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { upsert: false });

    if (error) throw new Error(`Storage upload failed: ${error.message}`);

    let publicUrl: string | undefined;
    if (opts.makePublic) {
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      publicUrl = data.publicUrl;
    }

    return {
      id: crypto.randomUUID(),
      path,
      name: file.name,
      size: file.size,
      format: ext,
      userId,
      jobId: opts.jobId,
      publicUrl,
      createdAt: new Date().toISOString(),
    };
  },

  /**
   * Upload raw content (string/blob) — useful for generated reports.
   */
  async uploadContent(
    content: string | Blob,
    filename: string,
    userId: string,
    opts: UploadOptions = {},
  ): Promise<StorageFile> {
    const blob = typeof content === 'string'
      ? new Blob([content], { type: 'text/plain' })
      : content;
    const file = new File([blob], filename);
    return this.upload(file, userId, opts);
  },

  /**
   * Get a time-limited signed URL for a private file.
   */
  async getSignedUrl(
    path: string,
    expiresIn = DEFAULT_SIGNED_URL_EXPIRY,
  ): Promise<string> {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(path, expiresIn);

    if (error || !data) throw new Error(`Failed to create signed URL: ${error?.message}`);
    return data.signedUrl;
  },

  /**
   * Delete a file from storage.
   */
  async delete(path: string): Promise<void> {
    const { error } = await supabase.storage.from(BUCKET).remove([path]);
    if (error) throw new Error(`Storage delete failed: ${error.message}`);
  },

  /**
   * List all files for a user (optionally filtered by jobId).
   */
  async list(userId: string, jobId?: string): Promise<StorageFile[]> {
    const prefix = jobId ? `${userId}/${jobId}` : userId;
    const { data, error } = await supabase.storage.from(BUCKET).list(prefix);
    if (error || !data) return [];

    return data.map(item => ({
      id: item.id ?? crypto.randomUUID(),
      path: `${prefix}/${item.name}`,
      name: item.name,
      size: item.metadata?.size ?? 0,
      format: item.name.split('.').pop() as SupportedStorageFormat,
      userId,
      jobId,
      createdAt: item.created_at ?? new Date().toISOString(),
    }));
  },
};
