const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;

    const categories = await CategoriesRepository.findAll(orderBy);

    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const categoryExists = await CategoriesRepository.findByName(name);

    if (categoryExists) {
      return response.status(409).json({ error: 'category is already exists' });
    }

    const category = await CategoriesRepository.create({ name });

    response.status(201).json(category);
  }
}

module.exports = new CategoryController();
