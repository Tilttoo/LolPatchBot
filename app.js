const Hapi = require("@hapi/hapi");

const lolPatch = require("./scraps/lolScrap");


const discordBot = require("./discord/main")


const init = async () => {


    const server = Hapi.server({
        port: 3000,
        host: "localhost"
    });

    server.route({
        method: "GET",
        path: "/patch/{patch}",
        handler: async (request, h) => {
            return await lolPatch(request.params.patch);
        }
    });


    await server.start();
    console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(1);
});

init().then(r => {
    discordBot();
});