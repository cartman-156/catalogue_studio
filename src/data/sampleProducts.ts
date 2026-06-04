/**
 * Sample products data for Catalog Studio
 * This demonstrates the expected JSON structure for products
 */

export const sampleProducts = {
  products: [
    {
      id: "product_001",
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with active noise cancellation",
      price: 199.99,
      category: "Electronics",
      inStock: true,
      quantity: 50,
      rating: 4.5,
      tags: ["audio", "wireless", "premium"],
      images: [
        "https://example.com/headphones-1.jpg",
        "https://example.com/headphones-2.jpg"
      ],
      specifications: {
        battery: "30 hours",
        bluetoothVersion: "5.0",
        weight: "250g"
      },
      reviews: [
        {
          author: "John Doe",
          rating: 5,
          comment: "Excellent sound quality!"
        }
      ]
    },
    {
      id: "product_002",
      name: "USB-C Cable",
      description: "Durable USB-C charging cable",
      price: 14.99,
      category: "Accessories",
      inStock: true,
      quantity: 200,
      rating: 4.2,
      tags: ["cables", "usb-c", "charging"],
      images: [
        "https://example.com/cable-1.jpg"
      ],
      specifications: {
        length: "2 meters",
        maxCurrent: "3A",
        material: "nylon braid"
      },
      reviews: []
    }
  ],
  metadata: {
    version: "1.0",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
};
