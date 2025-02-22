package com.foodordering.service;

import java.util.List;

import com.foodordering.Dto.RestaurantDto;
import com.foodordering.model.Restaurant;
import com.foodordering.model.User;
import com.foodordering.request.CreateRestaurantRequest;

public interface RestaurantService {

    Restaurant createRestaurant(CreateRestaurantRequest req, User user) throws Exception;

    Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updatedRestaurant) throws Exception;

    void deleteRestaurant(Long restaurantId) throws Exception;

    List<Restaurant> getAllRestaurants();

    List<Restaurant> searchRestaurant(String keyword);

    Restaurant findRestaurantById(Long id) throws Exception;

    Restaurant getRestaurantByUserId(Long userId) throws Exception;

     RestaurantDto addToFavorites(Long restaurantId,User user)throws Exception;
    Restaurant updateRestaurantStatus(Long id) throws Exception;
}
