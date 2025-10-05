<script>
    // @ts-nocheck

    import "./style.css";
    import { onMount } from "svelte";

    let blogs = $state("");

    async function getAllBlogs() {
        const requestOptions = {
            method: "GET",
            header: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };
        const response = await fetch("/blog", requestOptions);
        const data = await response.json();
        blogs = data.blogs;
        console.log(data);
    }

    onMount(() => {
        getAllBlogs();
    });
</script>

<div class="container">
    <div class="navigation">
        <h1>Welcome to, FooBar</h1>
        <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
        </ul>
    </div>

    {#each blogs as blog}
        <div class="card-blog">
            <div class="card-head">
                <a href={`/blog/${blog?.id}`}>
                    <h3># {blog.judul}</h3>
                </a>
                <a href={`/user/${blog.user_email}`}>
                    <span>{blog.user_email}</span>
                </a>
            </div>
            <div class="card-body">
                <span>
                    {new Date(blog?.created_at).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </span>
                <p class="content">{blog?.isi}</p>
            </div>
        </div>
    {/each}
</div>

<style>
    h3 {
        margin: 0;
    }
    span {
        font-size: small;
    }
    a {
        text-decoration: none;
        color: black;
    }
    a:hover {
        text-decoration: underline;
    }

    .navigation {
        margin-bottom: 2rem;
    }
    .card-blog {
        display: flex;
        flex-direction: column;
    }
    .card-head {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .card-body .content {
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 1.5em;
        height: 3em;
        font-size: small;
    }
</style>
