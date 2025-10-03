// Admin client with service role key for bypassing RLS
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { supabase } from './client';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

// If service role key is not available, fall back to regular client
// In production, you MUST set the service role key for admin operations
export const adminSupabase = SUPABASE_SERVICE_ROLE_KEY 
  ? createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : supabase; // Fallback to regular client for development

// Helper functions for admin operations
export const adminOperations = {
  // Update user balance (bypasses RLS)
  async updateUserBalance(userId: string, newBalance: number) {
    const { data, error } = await adminSupabase
      .from('profiles')
      .update({ 
        balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    return { data, error };
  },

  // Get all users (bypasses RLS)
  async getAllUsers() {
    const { data, error } = await adminSupabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    return { data, error };
  },

  // Block/unblock user
  async updateUserStatus(userId: string, isBlocked: boolean) {
    // This would require adding a status field to your profiles table
    // For now, we'll just return a placeholder
    return { data: null, error: new Error('User status management not implemented yet') };
  },

  // Create deposit record
  async createDepositRecord(userId: string, amount: number, status: 'pending' | 'approved' | 'rejected' = 'pending') {
    // This would require a deposits table
    // For now, we'll just return a placeholder
    return { data: null, error: new Error('Deposit management not implemented yet') };
  }
};
