import { Component } from '@angular/core';
import { commonImports } from '../app.imports';

import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-main',
  imports: [commonImports],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})

export class MainComponent {
  feedbackControl = new FormControl('');
  feedbackCount!: number;

  private apiKey  = environment.API_KEY;
  private apiToken = environment.API_TOKEN;
  private boardId = environment.BOARD_ID;
  private listId = environment.LIST_ID;

  constructor(private http: HttpClient) {
  }

  sendFeedback() {
    const text = this.feedbackControl.value;

    if (!text || !text.trim()) {
      alert('Pole nemůže být prázdné!');
      return;
    }

    const url = `https://api.trello.com/1/cards`;
    const body = {
      name: text,
      idList: this.listId,
      key: this.apiKey,
      token: this.apiToken,
      cover: {
        color: 'yellow',
        size: 'full',
        brightness: 'light'
      }
    
    };

    this.http.post(url, body).subscribe({
      next: (response: any) => {
        this.feedbackControl.reset();
        this.setCover(response.id);
        this.resetTextareaHeight();
      },
      error: (error) => {
        console.error('Error while we creating card:', error);
      }
    });
  }

  resetTextareaHeight() {
    const textarea = document.getElementById('input') as HTMLTextAreaElement;
    if (textarea) {
        textarea.style.height = '26px';
    }
  }

  setCover(cardId: string) {
    const coverColors = [
      'yellow', 'blue', 'green', 'orange', 'red', 'purple',
      'pink', 'sky', 'lime', 'black'
    ];
    
    const randomColor = coverColors[Math.floor(Math.random() * coverColors.length)];

    const url = `https://api.trello.com/1/cards/${cardId}?key=${this.apiKey}&token=${this.apiToken}`;
    
    const body = {
      cover: {
        color: randomColor,
        size: 'full',
        brightness: 'light'
      }
    };
  
    this.http.put(url, body).subscribe({
      next: () => console.log('Cover added'),
      error: (error) => console.error('Error cover:', error)
    });
  }

  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }
}
