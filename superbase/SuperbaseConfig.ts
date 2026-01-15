import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://cxsikdmgphzbqmkypujm.supabase.co';
export const supabaseKey = 'sb_publishable_3Q_PiAEEB1xBer6Yy9SC4w_D9wFV263';

export const supabase = createClient(supabaseUrl, supabaseKey);