async function buildMenu(objs) {
    const menu = document.getElementById("menu");
    const menuItems = [];
    for (let item of objs) {
        let key = "";
        let li = document.createElement("li");
        li.style.width = 100/objs.length+"%";
        li.onclick = (e) => {
            e.stopPropagation();
            buildTable(e.currentTarget.firstElementChild.textContent+".json");
        };
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
    return menuItems;
}

function buildTable(tableName) {

    const container = document.getElementById("link_container");

    fetch("./ressource/page/" + tableName)
        .then((response) => response.json())
        .then((data) => {
            const newChildren = [];
            data[tableName.match(/[^\.]*/)[0]].forEach((value, index) => {
                newChildren[index] = document.createElement('a');
                newChildren[index].href = value.href;
                //creating the div
                let divElement = document.createElement('div');
                newChildren[index].appendChild(divElement);
                //creating the icon
                let icon = document.createElement('img');
                icon.src = value.href.match(/https?:\/\/[^\/]+/)[0] + "/favicon.ico";
                icon.onerror = () => {
                  icon.onerror = null;
                  icon.src = "./ressource/media/fallback.png";
                };
                divElement.appendChild(icon);
                //creating p
                let p = document.createElement('p');
                p.innerText = value.title;
                divElement.appendChild(p);
            });
            return newChildren;
        })
        .then((arr) => container.replaceChildren(...arr))
        .catch((error) => console.log(error));
}