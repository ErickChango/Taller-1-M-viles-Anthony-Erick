import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qswtslmxtsazrgyytcoa.supabase.co/';
const supabaseKey = 'sb_publishable_g-nw5E788JbtxLKvOMqbYQ_DEXzI391';

export const supabase = createClient(supabaseUrl, supabaseKey);