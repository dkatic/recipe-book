import { Headers, Http, Response } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe';
import { Ingredient } from "../shared";
import 'rxjs/Rx';


@Injectable()
export class RecipeService {
  recipeChanged = new EventEmitter<Recipe[]>();

    private recipes: Recipe[] = [
      new Recipe('Schnitzel', 'Very tasty', 'https://1.bp.blogspot.com/-8IBes10P528/Vq32UoSnlnI/AAAAAAAAQbw/NL1Nv9O2jpg/w800-h800/krmenadle%2Bu%2Bmarinadi.jpg', [
        new Ingredient('French Fries', 2),
        new Ingredient('Pork Meat', 1)
      ]),
      new Recipe('Summer Salad', 'Okayish', 'http://www.centarzdravlja.hr/site/assets/files/25304/tjestenina_salata2.jpg', [])
    ];

  constructor(private http: Http) {}

getRecipes() {
    return this.recipes;
}

getRecipe(id: number) {
  return this.recipes[id];
}

deliteRecipe(recipe: Recipe) {
  this.recipes.splice(this.recipes.indexOf(recipe), 1);
}

addRecipe(recipe: Recipe) {
  this.recipes.push(recipe);
}

editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
  this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
}

storeData() {
  const body = JSON.stringify(this.recipes);
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  return this.http.put('https://recipebook-77d22.firebaseio.com/recipes.json', body, {headers: headers});
}

fetchData() {
  return this.http.get('https://recipebook-77d22.firebaseio.com/recipes.json')
  .map((response: Response) => response.json())
  .subscribe(
    (data: Recipe[]) => {
      this.recipes = data;
      this.recipeChanged.emit(this.recipes);
    }
  );
}

}
