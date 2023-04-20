package com.cripycode.springbootecommerce.dao;

import com.cripycode.springbootecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product,Long> {
    //No code needed all features are automatically provided by JPA Repo.

    //This line Spring will automatically execute the query SELECT * FROM product WHERE category_id = ?
    //And will exposse the endpoint ... /pruducts/search/findByCategory?id=1
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
}
