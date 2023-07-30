import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styles: [],
})
export class FiltersComponent {
  @Output() showCategory = new EventEmitter<string>();

  categories = ["shoes", "clothes"];

  onShowCategory(category: string): void {
    console.log(category);

    this.showCategory.emit(category);
  }
}
