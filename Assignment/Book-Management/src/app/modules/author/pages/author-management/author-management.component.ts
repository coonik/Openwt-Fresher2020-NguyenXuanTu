import { AuthorService } from './../../../../core/services/author.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service';

@Component({
  selector: 'app-author-management',
  templateUrl: './author-management.component.html',
  styleUrls: ['./author-management.component.css']
})
export class AuthorManagementComponent implements OnInit {
  authorsObs$: Observable<any>;
  displayedColumns: string[] = ['position', 'name', 'website', 'birthday', 'books', 'CRUD'];

  constructor(private authorService: AuthorService,
    private messageDialogService: MessageDialogService) { }

  ngOnInit(): void {
    this.authorsObs$ = this.authorService.getAllAuthor();
  }

  onDelete(id: number) {

  }
}
