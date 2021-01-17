package com.gang.pizza.dto;

import javax.validation.constraints.*;

public class ProductDto {
	@Positive
	long id;
	@NotNull
	@NotEmpty
	String name;
	@NotNull
	@NotEmpty
	String description;
	@NotNull
	@NotEmpty
	String picture;
	@NotNull
	@NotEmpty
	String isVegan;
	@NotNull
	@NotEmpty
	String price;
	@NotNull
	@NotEmpty
	String foodType;
	boolean isHot;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public String getIsVegan() {
		return isVegan;
	}
	public void setIsVegan(String isVegan) {
		this.isVegan = isVegan;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getFoodType() {
		return foodType;
	}
	public void setFoodType(String foodType) {
		this.foodType = foodType;
	}
	public boolean isHot() {
		return isHot;
	}
	public void setHot(boolean isHot) {
		this.isHot = isHot;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((foodType == null) ? 0 : foodType.hashCode());
		result = prime * result + (int) (id ^ (id >>> 32));
		result = prime * result + (isHot ? 1231 : 1237);
		result = prime * result + ((isVegan == null) ? 0 : isVegan.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((picture == null) ? 0 : picture.hashCode());
		result = prime * result + ((price == null) ? 0 : price.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ProductDto other = (ProductDto) obj;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (foodType == null) {
			if (other.foodType != null)
				return false;
		} else if (!foodType.equals(other.foodType))
			return false;
		if (id != other.id)
			return false;
		if (isHot != other.isHot)
			return false;
		if (isVegan == null) {
			if (other.isVegan != null)
				return false;
		} else if (!isVegan.equals(other.isVegan))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (picture == null) {
			if (other.picture != null)
				return false;
		} else if (!picture.equals(other.picture))
			return false;
		if (price == null) {
			if (other.price != null)
				return false;
		} else if (!price.equals(other.price))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "ProductDto [id=" + id + ", name=" + name + ", description=" + description + ", picture=" + picture
				+ ", isVegan=" + isVegan + ", price=" + price + ", foodType=" + foodType + ", isHot=" + isHot + "]";
	}
	public ProductDto(@Positive long id, @NotNull @NotEmpty String name, @NotNull @NotEmpty String description,
			@NotNull @NotEmpty String picture, @NotNull @NotEmpty String isVegan, @NotNull @NotEmpty String price,
			@NotNull @NotEmpty String foodType, boolean isHot) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.picture = picture;
		this.isVegan = isVegan;
		this.price = price;
		this.foodType = foodType;
		this.isHot = isHot;
	}
	public ProductDto() {
	
	}
	
	
}
