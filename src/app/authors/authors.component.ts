import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BooksService } from '../books/service/books.service';
import { Author } from '../books/model/book';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class AuthorsComponent {
  authorId: string = '';
  author: Author | null = null;
  errorMessage: string = '';

  constructor(private booksService: BooksService) {}

  searchAuthor() {
    if (this.authorId) {
      this.booksService.getAuthorById(this.authorId).subscribe({
        next: (data: Author) => {
          this.author = data;
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error fetching author:', error);
          this.author = null;
          this.errorMessage = 'Author not found';
        }
      });
    }
  }
}
