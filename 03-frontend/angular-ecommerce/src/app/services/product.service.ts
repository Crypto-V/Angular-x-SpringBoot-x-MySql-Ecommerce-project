import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
 
  //Url for the spring boot app
  private baseUrl = 'http://localhost:8181/api/products';

  private categoryUrl = 'http://localhost:8181/api/product-category'

  //Inject Http client
  constructor(private httpClient: HttpClient) {}

  //This method will map the JSON data from the SpringDataRest to the Product Array
  getProductList(theCategoryId: number): Observable<Product[]> {

    //Build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

   
  getProductCategories(): Observable<ProductCategory[]> {

     return this.httpClient
       .get<GetResponseProductCategory>(this.categoryUrl)
       .pipe(map((response) => response._embedded.productCategory));
  }

}

//Unwraps the JSON fromSpring Data REST _embedded entry
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}

//Unwraps the JSON fromSpring Data REST _embedded entry
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
