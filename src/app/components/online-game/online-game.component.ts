import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Player } from '../../model/Player';
import { Game } from '../../model/Game';
import { Message } from '../../model/Message';
import { PlayerType } from '../../enum/PlayerType';

import { SocketService } from '../../services/socket.service';
import { GameService } from '../../services/game.service';
import { PlayerService } from '../../services/player.service';
import { CountdownService } from '../../services/countdown.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'online-game',
  templateUrl: './online-game.component.html'
})

export class OnlineGameComponent implements OnInit, OnDestroy {

  constructor(private socketService: SocketService,
              private gameService: GameService,
              private playerService: PlayerService,
              private countdownService: CountdownService,
              private chatService: ChatService) {
    this.playerService.setPlayer(new Player(PlayerType.User));
  }

  ngOnInit(): void {
    this.connect();
    this.countdownService.countdown();
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
    this.gameService.resetGame();
  }

  connect(): void {
    this.socketService.initConnect();
  }

  disconnect(): void {
    this.socketService.disconnect();
  }

  isOnline(): boolean { return this.socketService.isConnected(); }

  isGameConnected(): boolean {
    return this.gameService.isConnected();
  }

}
