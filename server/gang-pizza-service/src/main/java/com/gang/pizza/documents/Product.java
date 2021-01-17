package com.gang.pizza.documents;

import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
public class Product {
	@Id
	long id;
	@NotNull
	String name;
	@NotNull
	String description;
	@NotNull
	String picture;
	@NotNull
	String isVegan;
	@NotNull
	String price;
	@NotNull
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
	public String toString() {
		return "Product [id=" + id + ", name=" + name + ", description=" + description + ", picture=" + picture
				+ ", isVegan=" + isVegan + ", price=" + price + ", foodType=" + foodType + ", isHot=" + isHot + "]";
	}
	public Product(long id, @NotNull String name, @NotNull String description, @NotNull String picture,
			@NotNull String isVegan, @NotNull String price, @NotNull String foodType, boolean isHot) {
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
	public Product() {
		
	}
	
}
