<svelte:head>
	<title>Contact me</title>
</svelte:head>
<h1>Contact Us</h1>
<p>
    IDEAS: 1. Want to have links to IG, Linkedin, and email with icons, followed by form
</p>
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