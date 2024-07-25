function buildTable(tableName) {

    const container = document.getElementById("link_container");

    fetch("../ressource/page/" + tableName + ".json")
        .then((response) => response.json())
        .then((data) => {
            const newChildren = [];
            data[tableName].forEach((value, index) => {
                newChildren[index] = document.createElement('div');
                let link = document.createElement('a');
                link.href = value.href;
                link.title = value.title;
                newChildren[index].appendChild(link);
            });
            return newChildren;
        })
        .then((arr) => container.replaceChildren(...arr))
        .catch((error) => console.log(error));
}