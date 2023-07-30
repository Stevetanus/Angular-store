import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Product } from "src/app/models/prodcut.model";

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box.component.html",
  styles: [],
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter();

  product: Product = {
    id: 1,
    title: "Snickers",
    price: 150,
    category: "shoes",
    description: "Description",
    image: "https://via.placeholder.com/150",
  };

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
