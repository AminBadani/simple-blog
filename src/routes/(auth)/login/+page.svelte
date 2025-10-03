<script>
    let { form } = $props();

    let userInput = $state({
        email: "testuser@email.com",
        password: "password",
    });
    let showPassword = $state(false);
    let message = $state(form?.message ?? "");
</script>

<div class="container">
    <h1>Sign-In</h1>
    <p>Belum punya akun? <a href="/register">register</a></p>

    {#if message}
        <div class="message">Message: {message}</div>
    {/if}

    <form method="POST">
        <div class="input">
            <label for="email">Email</label>
            <input
                name="email"
                type="text"
                placeholder="Enter your email here"
                bind:value={userInput.email}
                required
            />
        </div>
        <div class="input">
            <label for="password">Password</label>
            <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                bind:value={userInput.password}
                required
            />
            <input
                type="checkbox"
                name="show_password"
                id="show_password"
            /><label for="show_password">Show</label>
        </div>
        <button type="submit">Login</button>
    </form>
</div>
