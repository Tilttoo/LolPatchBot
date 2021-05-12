const cheerio = require("cheerio");
const axios = require("axios").default;

const fethHtml = async url => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch {
        console.error(`ERROR: An error occurred while trying to fetch the URL: ${url}`);
    }
};

const extractDeal = selector => {
    try {

        const img = selector
            .find("img")
            .attr('src')


        return {
            img
        };
    } catch(e){
        console.error(e)
    }
};

const lolPatchScrap = async (patch) => {



    const url =
        `https://eune.leagueoflegends.com/pl-pl/news/game-updates/patch-${patch}-notes/`;


    const html = await fethHtml(url);
    const selector = cheerio.load(html);
    const searchResults = selector("body").find(
        "a.skins"
    );

    const playerScrap = searchResults
        .map((idx, el) => {
            const elementSelector = selector(el);
            return extractDeal(elementSelector);
        })
        .get();

    return playerScrap;
};

module.exports = lolPatchScrap;
