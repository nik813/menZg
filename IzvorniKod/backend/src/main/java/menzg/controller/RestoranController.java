package menzg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import menzg.model.Restoran;
import menzg.service.RestaurantService;

@RestController
@RequestMapping("/restaurants")
@CrossOrigin(origins = "http://localhost:5173")
public class RestoranController {
	@Autowired
	private RestaurantService restaurantService;

	@GetMapping("")
	public List<Restoran> listRestaurants() {
		return restaurantService.listAll();
	}

}