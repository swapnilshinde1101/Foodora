package com.foodordering.Dto;

import java.util.List;
import java.util.Objects;

import jakarta.persistence.Column;
import lombok.Data;
@Data
public class RestaurantDto {

    private Long id;
    private String title;
    private String description;
    
    @Column(length = 1000)
    private List<String> images;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<String> getImages() {
		return images;
	}

	public void setImages(List<String> images) {
		this.images = images;
	} 
    
    




}
