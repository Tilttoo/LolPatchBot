function patchNote(message, fetch){
    if (message.content.toLowerCase().includes('!lol patch')) {
        let patch = message.content.split(" ")[2]

        patch = patch.replace('.', '-')

        fetch(`http://localhost:3000/patch/${patch}`)
            .then(res => res.json())
            .then((json) => {
                message.channel.send(json[0].img).catch(err =>{
                    console.log(err)
                })
                console.log(json[0].img)
            }).catch(() =>{
            message.channel.send("Brak informacji o tym patchu").catch()
        })
    }
}
module.exports = patchNote