## 🥙 Project Introduction

Easily customizable. **Food Loops** is an easy open-source Backend-as-a-Service (BaaS) that provides developers API needed for small restaurant/food businesses to go online. Just use food loops dashboard to add your food and get ready-to-use API for fetching your menu and implementing guest user checkout.

Currently created using Node.js on the top of Express framework and TypeScript. For database, we've decided to go with MongoDB and and Mongoose as an ODM. Also using AWS S3 for image storage but you can update code to your own requirements.

<div align="center">
  
  ![](./banner.gif)
  
</div>

The content is divided into several sections:

- [Requirements](#-requirements)
- [Setup](#-setup)
- [Documentation](#-documentation)
- [Contributing guide](#-contributing-guide)

## 🎛 Requirements

- NodeJS >= 12.x
- NPM >= 6.x
- MongoDB >= 4.2

## 🚀 Setup

First of all, you need to check if you're using the required versions of Node.js and npm <br/>

Then, please follow the instructions below:

### Clone the repository

```bash

# Clone with SSH
$ git clone git@github.com:manjillama/food-app.git

# Or with HTTPS
$ git clone https://github.com/manjillama/food-app.git
```

### Installation

The project consists of a client-side admin app `/admin-app` and an API server `/api` in the project root directory. Navigate to respective project folder to see the installation instructions.

## 📜 Documentation

Based on simple REST principles, the Food Loops API endpoints returns JSON metadata.

API Documentation for user-side actions i.e. fetching menu, menu items and checkout.

### Get all menu

Request

```curl
GET /api/menu
```

You can add sorting, filters, paginations by adding the request params to the request.

| Request Params Fields                           | Values                                                                   |
| ----------------------------------------------- | ------------------------------------------------------------------------ |
| E.g. isHotMeal, isEnabled, type etc. (Optional) | Field value (Using same field multiple times will result in union query) |
| page (Optional)                                 | Page number (default value is 1)                                         |
| size (Optional)                                 | Size of response list per page (default is 40)                           |
| sort (Optional)                                 | -field i.e. -price (Sort using price in descending order)                |
| fields (Optional)                               | i.e. id, name, categories, etc. (Fetch provided fields only)             |

Response

```json
{
  "status": "success",
  "data": {
    "total": 2,
    "size": 40,
    "menuItems": [
      {
        "isHotMeal": true,
        "isEnabled": true,
        "type": "Main Dish",
        "categories": ["Breakfast", "Lunch", "Dinner"],
        "_id": "60a774a24367081449540954",
        "name": "Grilled Steak Tortilla Salad",
        "description": "Serve a plate of your favorite taco fixins' — greens, steak strips, and jalapeños.",
        "price": 249,
        "servingSize": 597,
        "nutrients": [
          {
            "_id": "60a774a24367081449540955",
            "name": "Carbohydrates",
            "amount": 120,
            "unit": "g"
          },
          {
            "_id": "60a774a24367081449540956",
            "name": "Protein",
            "amount": 200,
            "unit": "g"
          },
          {
            "_id": "60a774a24367081449540957",
            "name": "Fat",
            "amount": 150,
            "unit": "g"
          },
          {
            "_id": "60a774a24367081449540958",
            "name": "Cholesterol",
            "amount": 90,
            "unit": "mg"
          },
          {
            "_id": "60a774a24367081449540959",
            "name": "Fiber",
            "amount": 300,
            "unit": "g"
          },
          {
            "_id": "60a774a2436708144954095a",
            "name": "Sodium",
            "amount": 60,
            "unit": "mg"
          }
        ]
      },
      {
        "isHotMeal": true,
        "isEnabled": true,
        "type": "Main Dish",
        "categories": ["Lunch", "Dinner"],
        "_id": "60a77536436708144954095b",
        "name": "Chicken & Veggie Fajitas",
        "description": "Time to clean out the fridge? These versatile skillet chicken fajitas are designed to work with whatever vegetables you happen to have on hand. The key is to slice all the veggies to approximately the same size so they cook evenly.",
        "price": 448,
        "servingSize": 700,
        "nutrients": [
          {
            "_id": "60a77536436708144954095c",
            "name": "Carbohydrates",
            "amount": 300,
            "unit": "g"
          },
          {
            "_id": "60a77536436708144954095d",
            "name": "Protein",
            "amount": 350,
            "unit": "g"
          },
          {
            "_id": "60a77536436708144954095e",
            "name": "Fat",
            "amount": 90,
            "unit": "g"
          },
          {
            "_id": "60a77536436708144954095f",
            "name": "Cholesterol",
            "amount": 70,
            "unit": "mg"
          }
        ],
        "photo": "https://manjiltamang.com/public/menu-1621612320621.jpg"
      }
    ]
  }
}
```

### Get menu by id

Request

```curl
GET /api/menu/60a4d13d87103d230da48c57
```

Response

```json
{
  "status": "success",
  "data": {
    "menuItem": {
      "isHotMeal": false,
      "isEnabled": false,
      "type": "Main Dish",
      "categories": ["Lunch", "Dinner", "Breakfast"],
      "_id": "60a4d13d87103d230da48c57",
      "name": "Creamed Spinach",
      "description": "Creamy, cheesy and easy creamed spinach prepared with cream cheese and spinach! It is the perfect party or dinner side dish.",
      "price": 220,
      "servingSize": 100,
      "__v": 12,
      "nutrients": [
        {
          "_id": "60a4dc46e48664250de42e6d",
          "name": "Cholesterol",
          "amount": 12,
          "unit": "mg"
        },
        {
          "_id": "60a4dc46e48664250de42e6e",
          "name": "Fat",
          "amount": 40,
          "unit": "g"
        },
        {
          "_id": "60a4dc46e48664250de42e6f",
          "name": "Carbohydrates",
          "amount": 100,
          "unit": "g"
        },
        {
          "_id": "60a4dc46e48664250de42e70",
          "name": "Protein",
          "amount": 350,
          "unit": "g"
        },
        {
          "_id": "60a77cef4367081449540972",
          "name": "Fiber",
          "amount": 200,
          "unit": "g"
        },
        {
          "_id": "60a77cef4367081449540973",
          "name": "Sodium",
          "amount": 20,
          "unit": "mg"
        }
      ],
      "photo": "https://manjiltamang.com/public/menu-1621756211054.jpg"
    }
  }
}
```

### Order Checkout

```json
POST /api/checkout

{
    "firstName": "Manjil",
    "lastName": "Tamang",
    "address": "Jorpati, Attherkhel",
    "email": "lamamanjil@gmail.com",
    "phoneNumber": 9803587436,
    "deliveryDate": "2021-05-30",
    "deliveryTime": "14:00",
    "menuItems": [
        {
            "menuItem": "60a4d13d87103d230da48c57",
            "quantity": 1
        },
        {
            "menuItem": "60a774a24367081449540954",
            "quantity": 2
        }
    ]
}
```

## 🤝 Contributing guide

Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.

## 📝 License

Licensed under the [MIT License](./LICENSE).
