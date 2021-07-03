const mongo = require(`../mongo`);

const freezerConfig = require('../Schemas/freezenick');

module.exports = {

    name: 'freezenick',

    usage: '&{prefix}freezenick <set/remove> <@user> <new nick>',

    description: 'Freezes nick so that it cannot be changed.',

    aliases: [],

    permissions: ['SEND_MESSAGES', 'MANAGE_NICKNAMES'],

    async execute(message, args, bot, Discord, prefix) {

       if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Only an admin can use this command.");




       if (!args[0]) {

              let emb = new Discord.MessageEmbed()

               .setColor("GREEN")

               .setTitle("Freenick help menu")

               .setDescription(`**Set**\n${prefix}freezenick set @Multi A programmer lol\n**Remove**\n${prefix}freezenick remove @Multi`)

       return message.channel.send(emb);

        }




        if (args[0]&&args[0].toLowerCase() == "set") {

       if (!args[1] || !message.mentions.users.first()||!args[1].includes(message.mentions.users.first().id)) return message.reply("Invalid Syntax");




       if (!args[2]) return message.reply("No nickname provided");




      let nick = args.splice(0,2).join(" ");

      if (nick > 32) return message.reply("Nickname cannot be longer than 32 characters.");




      bot.freezer.set(`${message.guild.id}-${message.mentions.users.first().id}`, nick)

        

        await mongo().then(async (mongoose)=>{

          

            await freezerConfig.findOneAndUpdate({

                    _id: `${message.guild.id}-${message.mentions.users.first().id}`

                },{

                    _id: `${message.guild.id}-${message.mentions.users.first().id}`,

                    nick: nick,

                },{

                    upsert: true

                })

        })

        }

        else if (args[0]&&args[0].toLowerCase == "remove") {

             if (!message.mentions.users.first()) return message.reply("You forgot to mention the person");




              if (message.mentions.users.first().id == message.author.id) return message.channel.send("You cannot remove freezenick from yourself, ask some other admin to do it.");

             bot.freezer.delete(`${message.guild.id}-${message.mentions.users.first().id}`)

await mongo().then(async (mongoose)=>{

            await Config.findOneAndRemove({

                    _id: `${message.guild.id}-${message.mentions.users.first().id}`

                })

             })

         }

         else {

               let emb = new Discord.MessageEmbed()




               .setColor("GREEN")




               .setTitle("Freenick help menu")




               .setDescription(`**Set**\n${prefix}freezenick set @Multi A programmer lol\n**Remove**\n${prefix}freezenick remove @Multi`)




       return message.channel.send("Invalid choice", emb);

          }

    }

}
