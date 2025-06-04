'use strict';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('products').del();
  await knex('products').insert([
    {
      name: 'Baguette',
      description: 'Long, thin type of bread of French origin.',
      price: 6.99,
      stock: 50,
      category_id: 1,
    },
    {
      name: 'Sourdough Loaf',
      description:
        'Naturally leavened bread made with a fermented starter containing wild yeast and bacteria, resulting in a tangy flavor and chewy texture.',
      price: 5.99,
      stock: 50,
      category_id: 1,
    },
    {
      name: 'Chocolate Chip Cookie',
      description: 'Chocolate Chip Cookie with sea salt sprinkled on top.',
      price: 1.99,
      stock: 50,
      category_id: 2,
    },
    {
      name: 'Peanut Butter Cookie',
      description: 'Peanut Butter Cookie.',
      price: 1.99,
      stock: 50,
      category_id: 2,
    },
    {
      name: 'Almond Croissant',
      description:
        'Traditional butter croissant, frangipane, slivered almonds and cider syrup.',
      price: 3.99,
      stock: 50,
      category_id: 3,
    },
    {
      name: 'Blueberry Danish',
      description:
        'Classic danish with cheesecake cream and blueberry compote filling',
      price: 3.99,
      stock: 50,
      category_id: 3,
    },
    {
      name: 'Chocolate Hazelnut Tart',
      description:
        'Chocolate tart with a chocolate sponge, hazelnut mousse, dark chocolate ganache, and toasted hazelnuts',
      price: 3.99,
      stock: 50,
      category_id: 4,
    },
    {
      name: 'Fresh Fruit Tart',
      description:
        'Vanilla sable, with vanilla pastry cream, topped with fresh seasonal fruits',
      price: 3.99,
      stock: 50,
      category_id: 4,
    },
  ]);
};
