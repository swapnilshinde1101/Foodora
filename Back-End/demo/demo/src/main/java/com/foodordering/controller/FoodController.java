package com.foodordering.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.foodordering.model.Food;
import com.foodordering.model.Restaurant;
import com.foodordering.model.User;
import com.foodordering.request.CreateFoodRequest;
import com.foodordering.response.MessageResponse;
import com.foodordering.service.FoodService;
import com.foodordering.service.RestaurantService;
import com.foodordering.service.UserService;

@RestController
@RequestMapping("/api/food")
public class FoodController {
	
	@Autowired
	private FoodService foodService;

	@Autowired
	private UserService userService;

	
	@Autowired
	private RestaurantService restaurantService;
	
	@GetMapping("/search")
	public ResponseEntity<List<Food>> searchFood(@RequestParam String name,
			@RequestHeader("Authorization") String jwt) throws Exception
	{
		User user=userService.findUserByJwtToken(jwt);
		List<Food> foods=foodService.searchFood(name);
		
		return new ResponseEntity<>(foods, HttpStatus.CREATED);
	}
	
	@GetMapping("/restaurant/{restaurantId}")
	public ResponseEntity<List<Food>> getRestaurantFood(
	        @RequestParam(required = false) Boolean vegetarian,
	        @RequestParam(required = false) Boolean seasonal,
	        @RequestParam(required = false) Boolean nonveg,
	        @RequestParam(required = false) String food_category,
	        @PathVariable Long restaurantId,
	        @RequestHeader("Authorization") String jwt) throws Exception {

	    // Debug log to check the values
	    System.out.println("Request Parameters: " + "Vegetarian: " + vegetarian + ", Seasonal: " + seasonal +
	            ", Non-Veg: " + nonveg + ", Food Category: " + food_category + ", Restaurant ID: " + restaurantId);

	    User user = userService.findUserByJwtToken(jwt);

	    // Call the service to get filtered foods based on the provided params
	    List<Food> foods = foodService.getRestaurantsFood(restaurantId, vegetarian, nonveg, seasonal, food_category);

	    return new ResponseEntity<>(foods, HttpStatus.OK);
	}


	
}
