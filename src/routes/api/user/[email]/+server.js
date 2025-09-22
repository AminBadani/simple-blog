import { json } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

export async function GET({ params }) {
    const { data } = await supabase.from('users').select().eq('email', params.email)
    if (data?.length == 0) return json({ message: `User dengan email '${params.email}' tidak ditemukan` }, { status: 404 })

    return json({
        users: data,
    })
}

export async function PUT({ params, request }) {
    const { username, password, bio } = await request.json();
    const { data } = await supabase.from('users').select().eq('email', params.email)
    if (data?.length == 0) return json({ message: `User dengan email '${params.email}' tidak ditemukan` }, { status: 404 })

    await supabase.from('users').update({
        username: username, 
        password: password,
        bio: bio
    }).eq('email', params.email).select();

    return json({
        message: "User berhasil diupdate"
    })
}

export async function DELETE({ params }) {
    const { data } = await supabase.from('users').select().eq('email', params.email)
    if (data?.length == 0) return json({ message: `User dengan email '${params.email}' tidak ditemukan`}, { status: 404 })
        
    await supabase.from('users').delete().eq('email', params.email)

    return json({
        message: "User berhasil dihapus"
    })
}