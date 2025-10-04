import { json } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

export async function GET() {
    const { data } = await supabase.from('users').select()

    return json({
        users: data,
    })
}

export async function POST ({ request }) {
    const { email, username, password, bio } = await request.json()

    const checkUser = await supabase.from('users').select().eq('email', email);
    if (checkUser.data?.length) return json({ message: 'Email sudah ada yang menggunakan' })

    const response = await supabase.from('users').insert({
        email: email,
        username: username, 
        password: password,
        bio: bio
    }).select()
    
    if (response.error) return json(response.error, { status: 409 })

    return json({
        user: response.data[0],
        message: "User berhasil dibuat" 
    });
}