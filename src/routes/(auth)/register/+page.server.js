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
        const form = await request.formData();
        if (!form.get('email')) return { message: "Email tidak boleh kosong" }
        if (!form.get('username')) return { message: "Username tidak boleh kosong" }
        if (!form.get('password')) return { message: "Password tidak boleh kosong" }
        if (form.get('confirm_password') != form.get('password')) return { message: "Konfirmasi password tidak sama dengan password" }

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                email: form.get('email'),
                username: form.get('username'),
                password: form.get('password'),
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        const response = await fetch('/api/user', requestOptions);
        const data = await response.json()
        
        if (response.ok) cookies.set('credentials', JSON.stringify(data.user), { path: '/', maxAge: 60 * 60 *24 })

        return { message: data.message };
    }
}