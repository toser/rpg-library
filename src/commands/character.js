
import * as Player from '../player';
import * as Race from '../race';

export const cmdRegExp = /^(character|char|c) *(\S+){0,1}$/; // " *" vs ( \S+)   :-(

export const run = (player, command, world) => {
    if (!world.playerGroup) {
        return [ `no group for players started .. yet.` ];
    } else if (world.getPlayers(player).length > 0) {
        return [ `character "${player}" already exists!` ];
    } else {
        let matches = cmdRegExp.exec(command),
            race = matches[2] ? matches[2].trim() : null;
        if (!race || Race.getRaces().indexOf(race) === -1) // no or wrong race chosen
            return [ `${player}, choose a race: ${Race.getRaces()}` ];
        let character = Player.createPlayer(player, race);
        world.playerGroup.members.add(character);
        return [ `character "${player}" created, may glory be with you! ${player} joined "${world.playerGroup.name.get()}".`, character.summary.short() ];
    }
};