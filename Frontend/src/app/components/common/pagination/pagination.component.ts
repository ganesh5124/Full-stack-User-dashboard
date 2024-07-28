import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  getPages(): number[] {
    // Assuming totalPages is a variable that represents the total number of pages
    // Create a Set to store unique page numbers
    const pages = new Set<number>();

    for (let i = 1; i <= this.totalPages; i++) {
      pages.add(i);
    }
    // If you need to convert the Set back to an array, you can do so
    // This line is optional depending on how you plan to use the pages
    return Array.from(pages);

  }

  onPageChange(page: number) {
    if (page >= 1) {
      console.log('came here');

      this.pageChange.emit(page);
    }
  }
}
