import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  // URL for the Spring Boot app
  private baseUrl = 'http://localhost:8181/api/products';
  private categoryUrl = 'http://localhost:8181/api/product-category';
  
  // Inject Http client
  constructor(private httpClient: HttpClient) {}
  
  // This method will map the JSON data from the SpringDataRest to the Product Array
  getProductList(theCategoryId: number): Observable<Product[]> {
    // Build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }
  
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }
  
  searchProducts(theKeyword: string): Observable<Product[]> {
    // Build URL based on keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }
  
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }
  
  getProduct(theProductId: number): Observable<Product> {
    // Need to build the URL based on the id
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }
  
  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId: number
  ): Observable<GetResponseProducts> {
    // Spring support pagination but we have to send info about page and size.
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` +
                      `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
}

// Unwraps the JSON from Spring Data REST _embedded entry
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  
  // Creating support for the JSON response for the given attributes.
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

// Unwraps the JSON from Spring Data REST _embedded entry
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
