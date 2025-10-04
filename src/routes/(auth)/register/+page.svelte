<script>
    let { form } = $props();

    let userInput = $state({
        email: "testuser@email.com",
        username: "test_user",
        password: "password",
        confirmPassword: "password",
    });
    let showPass = $state(false);
    let showConfirmPass = $state(false);
    let message = $state(form?.message ?? "");
</script>

<div class="container">
    <h1>Sign-Up</h1>
    <p>Sudah punya akun? <a href="/login">login</a></p>

    {#if message}
        <div class="message">Message: {message}</div>
    {/if}

    <form method="POST">
        <div class="input">
            <label for="email">Email</label>
            <input
                name="email"
                type="email"
                placeholder="Enter your email here"
                bind:value={userInput.email}
            />
        </div>
        <div class="input">
            <label for="username">Username</label>
            <input
                name="username"
                type="text"
                placeholder="Your username"
                bind:value={userInput.username}
            />
        </div>
        <div class="input">
            <label for="password">Password</label>
            <input
                name="password"
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
                name="confirm_password"
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
