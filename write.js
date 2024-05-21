const { Archive, SuggestionSearcher, Searcher } = require("@openzim/libzim");

async function readZimFile(url) {
    const outFile = url;
    const archive = new Archive(outFile);
    console.log(`Archive opened: main entry path - ${archive.mainEntry.path}`);

    for (const entry of archive.iterByPath()) {
        console.log(`entry: ${entry.path} - ${entry.title}`);
    }

    const suggestionSearcher = new SuggestionSearcher(archive);
    const suggestion = suggestionSearcher.suggest('laborum');
    let results = suggestion.getResults(0, 10);
    console.log("Suggestion results:");
    for(const entry of results) {
        console.log(`\t- ${entry.path} - ${entry.title}`);
    }

    const searcher = new Searcher(archive);
    const search = searcher.search(new Query('rem'));
    results = search.getResults(0, 10);
    console.log("Search results:");
    for(const entry of results) {
        console.log(`\t- ${entry.path} - ${entry.title}`);
    }

    const entry = await archive.getEntryByPath("A/laborum");
    const item = entry.item;
    const blob = item.data;
    console.info(`Entry by url (laborum):`, blob.data);
    // delete archive;
}

module.exports = { readZimFile };