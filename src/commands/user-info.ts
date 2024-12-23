import { SlashCommandBuilder, EmbedBuilder, ColorResolvable, Colors } from "discord.js";
import { Command } from "./index";
import timeSince from "../utils/timeSince";


const userInfoCommand: Command = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Displays information about the targeted user or yourself.")
        .addUserOption(option =>
            option.setDescription("User to target")
                .setName("target")
                .setRequired(false)
        ) as SlashCommandBuilder,
    async execute(interaction) {
        let user = interaction.options.getUser("target", false)
        if (!user) {
            user = interaction.user
        }

        const guildMember = interaction.guild?.members.cache.get(user.id);
        const memberJoined = guildMember?.joinedAt;
        const userCreated = guildMember?.user.createdAt;
        const embed1 = new EmbedBuilder()
            .setFooter({
                text: interaction.user.displayName,
                iconURL: interaction.user.displayAvatarURL({ size: 1024 })
            })
            .setTitle(guildMember?.displayName as string)
            .setThumbnail(user.displayAvatarURL({ size: 1024 }))
            .setColor(guildMember?.displayHexColor || Colors.Green)
            .addFields(
                { name: 'Username', value: user.username, inline: true },
                { name: 'ID', value: user.id, inline: true },
                { name: 'Roles', value: guildMember?.roles.cache && guildMember?.roles.cache.size > 1 ?guildMember?.roles.cache?.filter(r => r.id !== interaction.guild?.id).map(r => `${r.name}`).toString().split(',').join(' | ') as string : "No Aditional Roles"},
                { name: 'Joined Server', value: `${memberJoined?.getMonth() as number + 1}/${memberJoined?.getDate()}/${memberJoined?.getFullYear()}  (${timeSince(memberJoined)})`, inline: true },
                { name: 'Joined Discord', value: `${userCreated?.getMonth() as number + 1}/${userCreated?.getDate()}/${userCreated?.getFullYear()} (${timeSince(userCreated)})`, inline: true },
            )
        await interaction.reply({ embeds: [embed1], ephemeral: true })
    }
}

export default userInfoCommand;