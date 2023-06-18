import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/model/category';
@Component({
  selector: 'app-shop-nav-menu',
  templateUrl: './shop-nav-menu.component.html',
  styleUrls: ['./shop-nav-menu.component.css']
})

export class ShopNavMenuComponent implements OnInit, OnDestroy {
  collapseNavMenu = true;
  categories: Category[] = [];
  navMenuCssClass: string | null = null;
  private categorySubscription: Subscription | undefined;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categorySubscription = this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = this.categoryService.Categories;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }

  toggleNavMenu(): void {
    this.collapseNavMenu = !this.collapseNavMenu;
  }
}
