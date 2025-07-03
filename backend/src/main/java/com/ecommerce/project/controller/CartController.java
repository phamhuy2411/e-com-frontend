package com.ecommerce.project.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    @DeleteMapping("/carts/{cartId}/product/{productId}")
    public ResponseEntity<CartDTO> deleteCartProductFromCart(@PathVariable Long cartId,
                                                            @PathVariable Long productId) {
        String emailId = authUtil.loggedInEmail();
        Cart cart = cartRepository.findCartByEmail(emailId);
        if (cart == null || !cart.getCartId().equals(cartId)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        cartService.deleteProductFromCart(cartId, productId);
        CartDTO cartDTO = cartService.getCart(emailId, cartId);
        return ResponseEntity.ok(cartDTO);
    }
} 