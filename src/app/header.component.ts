import { error } from 'util';
import { RecipeService } from './recipes/recipe.service';
import { Component } from '@angular/core';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(private recipeService: RecipeService) {}

  onStore() {
    this.recipeService.storeData().subscribe(
      data => console.log(data),
      error => console.error(error)
    )
  }

  onFetch() {
    this.recipeService.fetchData();
  }

}
