import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {  
  
  title = 'Lectura de Temperatura';
  temperature: Number = 0;
  subject$: Subscription;

  constructor(socketSvc: SocketService) {
    this.subject$ = socketSvc.getMessage('broadcast').subscribe((data: any) => {
      console.log(data);
      this.temperature = data;
    });
  }

  ngOnInit(): void {
    
  }
  
  ngOnDestroy(): void {
    if (this.subject$) {
      this.subject$.unsubscribe();
    }
  }
}
