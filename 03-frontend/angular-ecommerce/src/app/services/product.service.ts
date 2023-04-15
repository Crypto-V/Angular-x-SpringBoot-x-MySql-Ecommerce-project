import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  //Url for the spring boot app
  private baseUrl = 'http://localhost:8181/api/products';

  //Inject Http client
  constructor(private httpClient: HttpClient) {}

  //This method will map the JSON data from the SpringDataRest to the Product Array
  getProductList(): Observable<Product[]> {
    return this.httpClient
      .get<GetResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.products));
  }
}

//Unwraps the JSON fromSpring Data REST _embedded entry
interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
