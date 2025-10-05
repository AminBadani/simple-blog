import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    // @ts-ignore
    const userCredentials = JSON.parse(cookies.get('credentials') ?? null);
    if (userCredentials != null) {
        redirect(302, '/')
    }
}

export const actions = {
    default: async ({ request, cookies, fetch }) => {
        const form = await request.formData()
        if (!form.get('email')) return { message: "Email masih kosong" };
        if (!form.get('password')) return { message: "Password masih kosong" };

        const requestOptions = {
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        const response = await fetch(`/api/user/${form.get('email')}`, requestOptions);
        const data = await response.json()

        if (response.status == 404) return { message: data.message }

        /**
         * 1 menit = 60 detik
         * 60 menit = 1 jam = 60 detik * 60
         * 24 jam = 1 hari = 60 menit * 24
         * 12 hari = 24 jam * 12
         */
        cookies.set('credentials', JSON.stringify(data.user), { path: '/', maxAge: 60 * 60 * 24 })
        return { message: data.message };
    }
}