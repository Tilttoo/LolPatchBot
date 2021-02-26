const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const fetch = require('node-fetch');



const patchnote = require("./functions/patchnotes")

const discordStart = () => {


    client.on('ready', () => {
        console.log("Ready")
    });

        client.on('message', message => {
            patchnote(message, fetch);



    })

    client.login("ODAwMDIxNjcyMTUyNjYyMDI3.YAMEPg.OaKsv-xdUSy62seNRDUhwQyAvxA");
}

module.exports = discordStart