import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { Cart, CartItem } from "../models/cart.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open(" 1 item added to cart. ", "OK", {
      duration: 1000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
    console.log(this.cart.value);
  }

  getTotal(items: CartItem[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open(" Cart is cleared ", "OK", {
      duration: 1000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

  removeFromCart(item: CartItem, update = true): CartItem[] {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    if (update) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open(`${item.name} is removed from cart`, "OK", {
        duration: 1000,
        horizontalPosition: "center",
        verticalPosition: "top",
      });
    }

    return filteredItems;
  }

  addOne(item: CartItem): void {
    const modifiedItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        return { ...item, quantity: _item.quantity + 1 };
      }
      return _item;
    });
    this.cart.next({ items: modifiedItems });
    this._snackBar.open(`Add one ${item.name} to the cart`, "OK", {
      duration: 1000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

  removeOne(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;

    let modifiedItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;

        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });

    if (itemForRemoval) {
      modifiedItems = this.removeFromCart(itemForRemoval, false);
    }

    this.cart.next({ items: modifiedItems });
    this._snackBar.open(`Remove one ${item.name} from the cart`, "OK", {
      duration: 1000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }
}
