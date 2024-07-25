function buildTable(tableName) {

    const container = document.getElementById("link_container");

    fetch("../ressource/page/" + tableName + ".json")
        .then((response) => response.json())
        .then((data) => {
            const newChildren = [];
            data[tableName].forEach((value, index) => {
                newChildren[index] = document.createElement('div');
                //creating the icon
                let icon = document.createElement('img');
                icon.src = value.href.match(/https?:\/\/[^\/]+/)[0] + "/favicon.ico";
                newChildren[index].appendChild(icon);
                //creating the link
                let link = document.createElement('a');
                link.href = value.href;
                link.innerText = value.title;
                newChildren[index].appendChild(link);
            });
            return newChildren;
        })
        .then((arr) => container.replaceChildren(...arr))
        .catch((error) => console.log(error));
}