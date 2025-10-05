import { supabase } from "$lib/supabaseClient";
import { json } from "@sveltejs/kit";

export async function GET() {
    const { data } = await supabase.from('blogs').select()
    return json({ 
        blogs: data
    })
}