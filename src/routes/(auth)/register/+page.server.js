import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    // @ts-ignore
    const userCredentials = JSON.parse(cookies.get('credentials') ?? null)
    if (userCredentials != null) {
        redirect(302, '/')
    }   
}

export const actions = {
    default: async ({ request, cookies, fetch }) => {
        const data = await request.formData();
        if (!data.get('email')) return { message: "Email tidak boleh kosong" }
        if (!data.get('username')) return { message: "Username tidak boleh kosong" }
        if (!data.get('password')) return { message: "Password tidak boleh kosong" }
        if (data.get('confirm_password') != data.get('password')) return { message: "Konfirmasi password tidak sama dengan password" }

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                email: data.get('email'),
                username: data.get('username'),
                password: data.get('password'),
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        const response = await fetch('/api/user', requestOptions);
        const result = await response.json()
        
        if (response.ok) cookies.set('credentials', JSON.stringify(result.user), { path: '/' })

        return { message: result.message };
    }
}