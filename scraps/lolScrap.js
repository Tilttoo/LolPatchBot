const cheerio = require("cheerio");
const axios = require("axios").default;

const fethHtml = async url => {
    try {
        const { data } = await axios.get(url, {
            headers: {
                Cookie: "firestorm_session=takn7uft7qga37lh813b6a9c3thmnoek;registered=1;points_value_pixel=0;firestorm_sso=%7B%22token%22%3A%2278a22a5e251300dfce45fb66892195fa85b6d30e%22%2C%22mail%22%3A%22firestormtilttoo%40gmail.com%22%7D;points_value_check=12;user_lang=en;csrf_cookie_name=22c44a7d606bea7183133be9a93d5a7c;__cfduid=dcaa4b6a39b5c70cc91b1e1cf7d40d5cf1610966251"
            }
        });
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
