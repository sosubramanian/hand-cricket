import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './routes/app-routing.module';

import { AppComponent }         from './app.component';
import { NavigationComponent }  from './components/navigation/navigation.component';
import { GameComponent } from './components/game/game.component';
import { ProgressBarComponent } from './components/progress_bar/progress-bar.component';
import { GameUpdateComponent } from './components/game-updates/game-update.component';
import { ScoreBoardComponent } from './components/score-board/score-board.component';
import { GameStatusComponent } from './components/game-status/game-status.component';
import { GameplayComponent } from './components/gameplay/gameplay.component';
import { PlaySelectComponent } from './components/play-select/play-select.component';
import { OnlineGameComponent } from './components/online-game/online-game.component';
import { JoinGameComponent } from './components/online-game/join-game/join-game.component';
import { ChatComponent } from './components/online-game/chat/chat.component';
import { PlayComponent } from './components/online-game/play/play.component';
import { OnlineGameStatusComponent } from './components/online-game/online-game-status/online-game-status.component';
import { OnlineScoreBoardComponent } from './components/online-game/online-score-board/online-score-board.component';

import { SocketService } from './services/socket.service';
import { GameService } from './services/game.service';
import { ApplicationService } from './services/application.service';
import { PlayService } from './services/play.service';
import { PlayerService } from './services/player.service';

@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  AppRoutingModule,
                  RouterModule,
                  HttpModule
                ],
  declarations: [ AppComponent,
                  NavigationComponent,
                  GameComponent,
                  ProgressBarComponent,
                  GameUpdateComponent,
                  ScoreBoardComponent,
                  GameStatusComponent,
									GameplayComponent,
									PlaySelectComponent,
                  OnlineGameComponent,
                  JoinGameComponent,
                  ChatComponent,
                  PlayComponent,
                  OnlineGameStatusComponent,
                  OnlineScoreBoardComponent
                ],
  providers:    [ SocketService,
                  GameService,
                  ApplicationService,
                  PlayService,
                  PlayerService
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
