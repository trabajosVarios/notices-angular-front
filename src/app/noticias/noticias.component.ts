import { Component } from '@angular/core';
import { NoticiasService } from './services/noticias.service';
import { BodyNotices } from './interfaces/notices.interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent {
  
  constructor ( private noticiaService: NoticiasService ) {}


  callNotices() {
    return this.noticiaService.GetListArticles();
  }
}
