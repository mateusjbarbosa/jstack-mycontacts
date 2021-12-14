const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(_, response) {
    const contacts = await ContactsRepository.findAll();

    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'contact not found' });
    }

    response.json(contact);
  }

  async store(request, response) {
    const {
      name,
      email,
      phone,
      category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response.status(409).json({ error: 'email is already in use' });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name,
      email,
      phone,
      category_id,
    } = request.body;

    const contactIdExists = await ContactsRepository.findById(id);
    if (!contactIdExists) {
      return response.status(404).json({ error: 'contact not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const contactEmailExists = await ContactsRepository.findByEmail(email);
    if (contactEmailExists && contactEmailExists.id !== id) {
      return response.status(409).json({ error: 'email is already in use' });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'contact not found' });
    }

    await ContactsRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ContactController();
