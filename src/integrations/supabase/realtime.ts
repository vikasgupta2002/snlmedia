
import { supabase } from './client';
import { Database } from './types';

/**
 * Enable real-time updates for a specific table
 * @param tableName - Name of the table to enable real-time for
 */
export const enableRealtimeForTable = async (tableName: keyof Database['public']['Tables']) => {
  try {
    // Execute Supabase SQL to enable real-time for the table
    // Using type assertion to bypass TypeScript restrictions for RPC calls
    const { error } = await supabase.rpc(
      'supabase_realtime' as unknown as never, 
      {
        table_name: tableName as string
      } as unknown as never
    );
    
    if (error) {
      console.error(`Error enabling real-time for ${tableName}:`, error);
    } else {
      console.log(`Real-time enabled for ${tableName}`);
    }
  } catch (error) {
    console.error('Unexpected error enabling real-time:', error);
  }
};

/**
 * Subscribe to real-time updates on a table
 * @param tableName - Table to subscribe to
 * @param callback - Function to call when an update occurs
 * @returns Cleanup function to unsubscribe
 */
export const subscribeToTable = (
  tableName: keyof Database['public']['Tables'], 
  callback: (payload: any) => void
) => {
  const channel = supabase
    .channel(`public:${tableName}`)
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: tableName as string
      }, 
      payload => callback(payload)
    )
    .subscribe();

  // Return cleanup function
  return () => {
    supabase.removeChannel(channel);
  };
};
