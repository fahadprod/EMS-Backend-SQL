'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.renameColumn('employees', 'designation', 'designationId'),
      queryInterface.changeColumn('employees', 'designationId', {
        type: Sequelize.INTEGER,
        unique: false,
        references: {
          model: 'designations',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      })
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
}
