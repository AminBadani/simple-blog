<script>
    let userInput = $state({
        email: "testuser@email.com",
        username: "test_user",
        password: "password",
        confirmPassword: "password",
    });
    let showPass = $state(false);
    let showConfirmPass = $state(false);
    let message = $state('')

    async function register() {
        if (!userInput.email) return message = "Email tidak boleh kosong"
        if (!userInput.username.trim()) return message = "Username tidak boleh kosong"
        if (!userInput.password) return message = "Password tidak boleh kosong"
        if (userInput.confirmPassword != userInput.password) return message = "Konfirmasi password tidak sama dengan password"
        message = ''

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                email: userInput.email,
                username: userInput.username,
                password: userInput.password,
            }),
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        }

        const response = await fetch('/api/user', requestOptions);
        const data = await response.json()
        message = data.message;
    }
</script>

<div class="container">
    <h1>Sign-Up</h1>
    <p>Sudah punya akun? <a href="/login">login</a></p>

    {#if message}
        <div class="message">Message: {message}</div>
    {/if}

    <form onsubmit={() => register()}>
        <div class="input">
            <label for="email">Email</label>
            <input
                type="email"
                placeholder="Enter your email here"
                bind:value={userInput.email}
                
            />
        </div>
        <div class="input">
            <label for="username">Username</label>
            <input
                type="text"
                placeholder="Your username"
                bind:value={userInput.username}
                
            />
        </div>
        <div class="input">
            <label for="password">Password</label>
            <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your Password"
                bind:value={userInput.password}
                
            />
            <input
                type="checkbox"
                id="show_pass"
                bind:checked={showPass}
            /><label for="show_pass">Show</label>
        </div>
        <div class="input">
            <label for="confirm_password">Confirm Password</label>
            <input
                type={showConfirmPass ? "text" : "password"}
                placeholder="Confirm your Password"
                bind:value={userInput.confirmPassword}
                
            />
            <input
                type="checkbox"
                id="show_confirm_pass"
                bind:checked={showConfirmPass}
            /><label for="show_confirm_pass">Show</label>
        </div>
        <button type="submit">Create account</button>
    </form>
</div>