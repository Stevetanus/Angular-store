import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
  styles: [],
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  sort = "desc";
  itemsShowCount = 12;

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
  }

  onItemsUpdated(count: number) {
    this.itemsShowCount = count;
  }

  onColumnsUpdated(colsNum: number) {
    this.columnsCountChange.emit(colsNum);
  }
}
