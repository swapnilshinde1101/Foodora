package com.foodordering.request;

import com.foodordering.model.Address;

public class OrderRequest {
	
	private Long restaurantId;
	private Address deliveryAddress;
	
	public Long getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(Long restaurantId) {
		this.restaurantId = restaurantId;
	}

	public Address getDeliveryAddress() {  // Renamed from getDeliverAddress() for consistency
		return deliveryAddress;
	}

	public void setDeliveryAddress(Address deliveryAddress) {  // Renamed parameter for clarity
		this.deliveryAddress = deliveryAddress;
	}
}
