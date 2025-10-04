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
        const data = await request.formData()
        if (!data.get('email')) return { message: "Email masih kosong" };
        if (!data.get('password')) return { message: "Password masih kosong" };

        const requestOptions = {
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        const response = await fetch(`/api/user/${data.get('email')}`, requestOptions);
        const result = await response.json()

        if (response.status == 404) return { message: result.message }

        cookies.set('credentials', JSON.stringify(result.user), { path: '/' })
        return { message: result.message };
    }
}