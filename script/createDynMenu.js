async function buildMenu(objs) {
    const menu = document.getElementById("menu");
    const menuItems = [];
    for (let item of objs) {
        let key = "";
        let li = document.createElement("li");
        let a = document.createElement("a");
        await fetch("./ressource/page/" + item.name)
            .then((res) => res.json())
            .then((data) => {
                key = Object.keys(data)[0];
            });
        a.innerText = key;
        li.appendChild(a);
        menuItems.push(li);
    }
    menu.replaceChildren(...menuItems);
}