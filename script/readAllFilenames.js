function readAllFilenames() {
    return fetch('https://api.github.com/repos/be-edict/Navigator/contents/ressource/page')
        .then((data) => data.json())
        .then((obj) => {
            return obj;
        });
}