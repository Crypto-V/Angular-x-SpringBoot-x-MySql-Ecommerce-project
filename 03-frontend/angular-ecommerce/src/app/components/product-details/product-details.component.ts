import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  // ! is a non-null assertion operator, strict nul and undefined checks will be suspended.
  product!: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    //get the "id " param string, convert to a number using the + symbol
    const id = this.route.snapshot.paramMap.get('id');
    const theProductId: number = id ? +id : 0;

    this.productService.getProduct(theProductId).subscribe(
      (data) => {
      this.product = data;
    });
  }
}
