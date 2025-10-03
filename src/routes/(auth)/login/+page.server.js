export async function load({ cookies }) {
    const userCredentials = cookies.get('credentials');
    return { userCredentials }
}

export const actions =  {
    default: async ({ request, cookies }) => {
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

        if (response.status == 404) return {message: result.message} 
        
        return {message: result.message};
    }
}