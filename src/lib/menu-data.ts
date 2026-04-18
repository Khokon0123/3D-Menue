import { MenuItem } from "@/types";

export const menuItems: MenuItem[] = [
  {
    id: "p1",
    name: "The New Yorker",
    description:
      "Our signature hand-tossed NY slice — San Marzano tomato sauce, whole milk mozzarella, fresh basil. Folded the way it was meant to be.",
    price: 16.99,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
    popular: true,
    badge: "Signature",
    sizes: [
      { label: 'Small 10"', price: 16.99 },
      { label: 'Medium 14"', price: 21.99 },
      { label: 'Large 18"', price: 26.99 },
    ],
  },
  {
    id: "p2",
    name: "Pepperoni Supreme",
    description:
      "Double-layered premium pepperoni, fresh basil, house-made tomato, low-moisture mozzarella. Crispy edges, chewy center.",
    price: 18.99,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80",
    popular: true,
    sizes: [
      { label: 'Small 10"', price: 18.99 },
      { label: 'Medium 14"', price: 23.99 },
      { label: 'Large 18"', price: 28.99 },
    ],
  },
  {
    id: "p3",
    name: "BBQ Smoke",
    description:
      "Slow-smoked pulled chicken, smoky BBQ drizzle, pickled red onion, fresh cilantro on a garlic-butter base. Bold and unforgettable.",
    price: 19.99,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    badge: "Chef Pick",
    sizes: [
      { label: 'Small 10"', price: 19.99 },
      { label: 'Medium 14"', price: 24.99 },
      { label: 'Large 18"', price: 29.99 },
    ],
  },
  {
    id: "p4",
    name: "Margherita Bianca",
    description:
      "White garlic cream base, fresh buffalo mozzarella, burst cherry tomatoes, wild arugula, shaved parmesan, EVOO finish.",
    price: 17.99,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    sizes: [
      { label: 'Small 10"', price: 17.99 },
      { label: 'Medium 14"', price: 22.99 },
      { label: 'Large 18"', price: 27.99 },
    ],
  },
  {
    id: "b1",
    name: "Smash Bros Classic",
    description:
      "Double smash patty, American cheese, shredded lettuce, house pickles, diced white onion, our legendary secret sauce on a toasted brioche bun.",
    price: 13.99,
    category: "burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    popular: true,
    badge: "Fan Favorite",
  },
  {
    id: "b2",
    name: "Crust Signature",
    description:
      "6oz Wagyu beef, aged white cheddar, slow-caramelized onions, truffle aioli, arugula, heirloom tomato. The burger that started it all.",
    price: 15.99,
    category: "burger",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&q=80",
    badge: "Premium",
  },
  {
    id: "b3",
    name: "Spicy Bird",
    description:
      "Crispy Nashville fried chicken thigh, jalapeno honey slaw, pickled cucumbers, sriracha mayo, toasted sesame bun. Heat level: fierce.",
    price: 14.99,
    category: "burger",
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&q=80",
  },
  {
    id: "s1",
    name: "Garlic Knots",
    description:
      "Fresh-baked pizza dough knots tossed in roasted garlic herb butter, parmesan, and flaky sea salt. Comes with house marinara.",
    price: 6.99,
    category: "sides",
    image: "https://images.unsplash.com/photo-1619960263640-8d374da6e4b9?w=800&q=80",
    popular: true,
  },
  {
    id: "s2",
    name: "Truffle Fries",
    description:
      "Hand-cut russet fries, black truffle oil, shaved parmesan, fresh parsley. Finished with Maldon salt flakes.",
    price: 8.99,
    category: "sides",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80",
    badge: "Must Try",
  },
  {
    id: "s3",
    name: "Mozzarella Sticks",
    description:
      "Hand-breaded whole-milk mozzarella, double-fried for the ultimate pull. Served with house-made San Marzano marinara.",
    price: 7.99,
    category: "sides",
    image: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=800&q=80",
  },
];

export const categories = [
  { id: "all", label: "All Items" },
  { id: "pizza", label: "Pizzas" },
  { id: "burger", label: "Burgers" },
  { id: "sides", label: "Sides" },
];
