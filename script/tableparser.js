function buildTable(tableName) {

    const container = $("#link_container");
    const newChildren = [];

    fetch("../ressource/page/" + tableName + ".json")
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));


    container.replaceChildren(...newChildren);
}