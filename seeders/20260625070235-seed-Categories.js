'use strict';
const fs = require(`fs`).promises


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile(`./data/categories.json`))
    data = data.map(el => {
      delete el.id 
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    
    await queryInterface.bulkInsert('Categories', data);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
