<script></script>
<style>
    @import url("$lib/global.css");
    form {
        border: 1px solid var(--primary);
        border-radius: 4px;
        padding: 10px;
        display: flex;
        flex-direction: column; 
        gap: 10px;
        margin: 10px;
    }
    button {
        background-color: var(--primary);
        color: var(--background-color);
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: var(--secondary);
    }
</style>

<svelte:head>
	<title>Contact me</title>
</svelte:head>
<h1>Contact Me</h1>
<p>If you have any questions or ideas, feel free to reach out!</p>
<div class="social-links">
    <a href="https://www.instagram.com/sashajh__/" target="_blank">
        <img src="images/contact/Instagram-jpg.webp" alt="Instagram" width="30"/>
    </a>
    <a href="https://www.linkedin.com/in/aleks-jov-hacon" target="_blank">
        <img src="images/contact/linkedin.png" alt="LinkedIn" width="30"/>
    </a>
    <a href="mailto:ajovanov@mit.edu">
        <img src="images/contact/email.png" alt="Email" width="30"/>
    </a>
</div>
<form
    action="mailto:ajovanov@mit.edu"
    method="POST"
    enctype="text/plain"
>
    <label>
        Email: 
        <input name="email" type="email"/>
    </label>
    <label>
        Subject: 
        <input name="subject"/>
    </label>
    <label>
        Body: 
        <textarea name="body"></textarea>
    </label>
    <label>
        <button>Submit</button>
    </label>
</form>