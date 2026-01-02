import { CoffeeItem } from './types';

export const COFFEE_MENU: CoffeeItem[] = [
  {
    id: '1',
    name: 'Artisan Espresso',
    price: 25000,
    description: 'Double shot of our signature dark roast blend with rich crema.',
    category: 'Hot',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&auto=format'
  },
  {
    id: '2',
    name: 'Velvet Latte',
    price: 35000,
    description: 'Silky micro-foam poured over a smooth espresso base.',
    category: 'Hot',
    image: 'https://api.omela.com/storage/content-editor-images/Y1E8TpUXcGmbQiQ5IVCf5wWwMQelcSSxMgvfY2Rz.jpg'
  },
  {
    id: '3',
    name: 'Cold Brew Reserve',
    price: 32000,
    description: '18-hour steeped single-origin beans served over crystal ice.',
    category: 'Cold',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format'
  },
  {
    id: '4',
    name: 'Caramel Macchiato',
    price: 45000,
    description: 'Layered espresso and milk topped with artisanal caramel drizzle.',
    category: 'Hot',
    image: 'https://www.allrecipes.com/thmb/LgtetzzQWH3GMxFISSii84XEAB8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/258686-IcedCaramelMacchiato-ddmps-4x3-104704-2effb74f7d504b8aa5fbd52204d0e2e5.jpg'
  },
  {
    id: '5',
    name: 'Iced Matcha Fusion',
    price: 38000,
    description: 'Ceremonial grade matcha with a hint of honey and vanilla.',
    category: 'Cold',
    image: 'https://www.umami.recipes/api/image/recipes/8YJkL4JmvZySv0m6WivL/images/Hni7xQZHYfXw5iSCp53VGI?w=3840&q=75'
  },
  {
    id: '6',
    name: 'Signature Nitro',
    price: 50000,
    description: 'Nitrogen-infused cold brew for a stout-like creamy texture.',
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=500&auto=format'
  }
];