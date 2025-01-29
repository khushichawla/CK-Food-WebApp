// src/assets/data.js
export const menu_list = [
    {
      menu_name: 'Food1',
      menu_image: '/header_img.jpg'
    },
    {
      menu_name: 'Food2',
      menu_image: '/header_img.jpg'
    },
    {
      menu_name: 'Food3',
      menu_image: '/header_img.jpg'
    }
  ];

export const food_list = [
    {
        _id: "1",
        name: "Greek Salad",
        image: "/header_img.png",  // Use a path relative to the public folder
        price: 12,
        description: "A refreshing salad made with the finest ingredients, perfect for any meal.",
        category: "Salad"
    },
    {
        _id: "2",
        name: "Margherita Pizza",
        image: "/margherita_pizza.png",  // Adjust the image path accordingly
        price: 15,
        description: "Classic pizza topped with fresh tomatoes, mozzarella cheese, and basil.",
        category: "Pizza"
    },
    {
        _id: "3",
        name: "Chocolate Cake",
        image: "/chocolate_cake.png",  // Adjust the image path accordingly
        price: 8,
        description: "Rich and moist chocolate cake topped with creamy chocolate frosting.",
        category: "Dessert"
    },
    // Add more food items as needed
];