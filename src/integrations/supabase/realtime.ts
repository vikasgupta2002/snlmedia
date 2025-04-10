
import { supabase } from './client';

/**
 * Enable real-time updates for a specific table
 * @param tableName - Name of the table to enable real-time for
 */
export const enableRealtimeForTable = async (tableName: string) => {
  try {
    // Execute Supabase SQL to enable real-time for the table
    const { error } = await supabase.rpc('supabase_realtime', {
      table_name: tableName
    });
    
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
  tableName: string, 
  callback: (payload: any) => void
) => {
  const channel = supabase
    .channel(`public:${tableName}`)
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: tableName 
      }, 
      payload => callback(payload)
    )
    .subscribe();

  // Return cleanup function
  return () => {
    supabase.removeChannel(channel);
  };
};
