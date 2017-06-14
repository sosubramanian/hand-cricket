import { Component, Input } from '@angular/core';

import { Player } from '../../../model/Player';
import { Game } from '../../../model/Game';

import { PlayerType } from '../../../enum/PlayerType';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'game-selection',
  templateUrl: 'game-selection.component.html',
  providers: [GameService]
})

export class GameSelectionComponent {
  @Input() player: Player;
  @Input() game: Game;

  isInfoSaved: boolean = false;
  isJoined: boolean = false;

  // enums
  PlayerType = PlayerType;

  constructor(private gameService: GameService) {
  }

  getGameId(): void {
    this.gameService.getGameId(this.player).subscribe(
      (gameId: string) => this.game.id = gameId,
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
    this.gameService.joinGame(this.player, this.game.id).subscribe(
      (isJoined: boolean) => this.isJoined = isJoined,
      (error) => this.isJoined = false
    );
  }
}
