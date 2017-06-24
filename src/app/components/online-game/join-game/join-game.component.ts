import { Component, Input } from '@angular/core';

import { Player } from '../../../model/Player';
import { Game } from '../../../model/Game';

import { PlayerType } from '../../../enum/PlayerType';
import { GameService } from '../../../services/game.service';
import { PlayerService } from '../../../services/player.service';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'join-game',
  templateUrl: 'join-game.component.html'
})

export class JoinGameComponent {
  player: Player;
  infoSaved: boolean;
  // enums
  PlayerType = PlayerType;

  constructor(private gameService: GameService,
              private playerService: PlayerService,
              private socketService: SocketService) {
    this.player = playerService.getPlayer();
  }

  collectInfo(): boolean {
    if (this.gameService.isConnected()) return false;
    return !this.infoSaved;
  }

  getGameId(): void {
    this.gameService.getGameId(this.player).subscribe(
      (gameId: string) => {
        this.gameService.getGame().id = gameId,
        this.socketService.subscribetoGame(this.gameService.getGame());
      },
      (error) => console.log(error)
    );
  }

  setHost(): void {
    this.player.type = PlayerType.Host;
    this.getGameId();
  }

  setGuest(): void {
    this.player.type = PlayerType.Guest;
  }

  joinGame(): void {
    this.gameService.joinGame(this.player, this.gameService.getGame().id).subscribe(
      (game: Game) => {
        this.gameService.setGame(game);
        this.socketService.subscribetoGame(this.gameService.getGame());
      },
      (error) => console.log(error)
    );
  }
}
