import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Message } from '../../../model/Message';
import { Player } from '../../../model/Player';
import { Game } from '../../../model/Game';

import { SocketService } from '../../../services/socket.service';
import { GameService } from '../../../services/game.service';
import { PlayerService } from '../../../services/player.service';
import { ChatService } from '../../../services/chat.service';

import { ChatAnimation } from '../../../animations/ChatAnimation';


import * as _ from 'lodash';

@Component({
  selector: 'chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css'],
  animations: [ChatAnimation]
})

export class ChatComponent implements OnInit, OnDestroy {

  player: Player;
  text: string = '';
  chatConnected: boolean;

  chatSubsription: any;

  constructor(public socketService: SocketService,
              public gameService: GameService,
              public playerService: PlayerService,
              public chatService: ChatService) {}

  ngOnInit(): void {
    this.player = this.playerService.getCurrentPlayer();
    this.socketService.subscribetoChat();
  }

  ngOnDestroy(): void {
    this.chatService.messages = [];
    this.chatService.newMessages = 0;
    this.chatService.showChat = false;
  }

  composeMessage(text: string): Message {
    return new Message(this.player, text);
  }

  send(): void {
    if (!this.text.trim()) return;
    this.socketService.sendChatMessage(this.composeMessage(this.text));
    this.text = '';
  }

  isChatConnected(): boolean { return this.chatSubsription != undefined; }

  fromHost(message: Message): boolean {
    return this.player.id == message.senderId;
  }

  fromChatBot(message: Message): boolean {
    return message.senderId == 'CHATBOT';
  }

  fromGuest(message: Message): boolean {
    return !this.fromHost(message) && !this.fromChatBot(message);
  }

}
