// src/assets/data.js
import food1 from './food1.jpg';

export const menu_list = [
    {
      menu_name: 'Salad',
      menu_image: food1
    },
    {
      menu_name: 'Pizza',
      menu_image: food1
    },
    {
      menu_name: 'Dessert',
      menu_image: food1
    },
    {
      menu_name: 'Food4',
      menu_image: food1
    },
    {
      menu_name: 'Food5',
      menu_image: food1
    },
    {
      menu_name: 'Food6',
      menu_image: food1
    }
  ];

export const food_list = [
    {
        _id: "1",
        name: "Greek Salad",
        image: food1,  // Use a path relative to the public folder
        price: 12,
        description: "A refreshing salad made with the finest ingredients, perfect for any meal.",
        category: "Salad"
    },
    {
        _id: "2",
        name: "Margherita Pizza",
        image: food1,  // Adjust the image path accordingly
        price: 15,
        description: "Classic pizza topped with fresh tomatoes, mozzarella cheese, and basil.",
        category: "Pizza"
    },
    {
        _id: "3",
        name: "Chocolate Cake",
        image: food1,  // Adjust the image path accordingly
        price: 8,
        description: "Rich and moist chocolate cake topped with creamy chocolate frosting.",
        category: "Dessert"
    },
];