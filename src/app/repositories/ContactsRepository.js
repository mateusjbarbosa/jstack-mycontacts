const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Mateus Barbosa',
    email: 'mateus@mail.com',
    phone: '5511012345678',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Paula Kelly',
    email: 'paula.kelly@mail.com',
    phone: '5511012345678',
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    const contact = contacts.find((c) => c.id === id);

    return new Promise((resolve) => resolve(contact));
  }

  findByEmail(email) {
    const contact = contacts.find((c) => c.email === email);

    return new Promise((resolve) => resolve(contact));
  }

  create({
    name,
    email,
    phone,
    category_id,
  }) {
    const newContact = {
      id: v4(),
      name,
      email,
      phone,
      category_id,
    };

    contacts.push(newContact);

    return new Promise((resolve) => resolve(newContact));
  }

  update(id, {
    name,
    email,
    phone,
    category_id,
  }) {
    const updateContact = {
      id,
      name,
      email,
      phone,
      category_id,
    };

    contacts = contacts.map((contact) => (
      contact.id === id ? updateContact : contact
    ));

    return new Promise((resolve) => resolve(updateContact));
  }

  delete(id) {
    contacts = contacts.filter((c) => c.id !== id);

    return new Promise((resolve) => resolve());
  }
}

module.exports = new ContactsRepository();
