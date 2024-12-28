import { Team, TeamMemberRole, Interaction } from 'discord.js';

/**
 * Checks if a user is an admin or developer in the application's team.
 *
 * @param interaction - The interaction object to extract the user and application data.
 * @returns A Promise that resolves to `true` if the user is an admin or developer, otherwise `false`.
 */
export async function isAdmin(interaction: Interaction): Promise<boolean> {
  // Fetch the application info
  const application = await interaction.client.application?.fetch();

  // Ensure the application is owned by a team
  const owner = application?.owner;
  if (!owner) return false;

  // Single-user-owned bot
  if (!(owner instanceof Team)) {
    return owner.id === interaction.user.id; // Only the bot owner has access
  }

  // Team-owned bot: Check if the user is the team owner, admin, or developer
  const member = owner.members.get(interaction.user.id);
  if (!member) return false;

  return (
    interaction.user.id === owner.ownerId || // Team owner
    member.role === TeamMemberRole.Admin || // Admin role
    member.role === TeamMemberRole.Developer // Developer role
  );
}
