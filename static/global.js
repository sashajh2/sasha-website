console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}

// let navLinks = $$("nav a");
// let currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname)
// if (currentLink) {
// 	currentLink.classList.add("current");
// }
let pages = {
    ".": "Home",
    "projects": "Projects",
    "resume": "Resume",
    "contact": "Contact",
    "https://github.com/sashajh2": "Github",
}
let nav = document.createElement("nav");
document.body.prepend(nav);
for (let url in pages) {
	let title = pages[url];
	let a = document.createElement("a");
    a.href = url;
    a.textContent = title;
    nav.append(a);
    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add("current");
    } else if (a.host !== location.host) {
        a.target="_blank";
    }
}

document.body.insertAdjacentHTML("afterbegin", `
	<label class="color-scheme", style="position: absolute; top: 1rem; right: 1rem; font-size: 80%;">
		Theme:
		<select>
			<option value="automatic">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
		</select>
	</label>`
);

const select = document.querySelector('select');

select.addEventListener('input', function(event) {
    document.documentElement.style.setProperty("color-scheme", event.target.value);
    localStorage.colorScheme = event.target.value
});

if (localStorage.getItem("colorScheme")) {
    const storedColorScheme = localStorage.getItem("colorScheme");
    document.documentElement.style.setProperty("color-scheme", storedColorScheme);
    select.value = storedColorScheme;
}