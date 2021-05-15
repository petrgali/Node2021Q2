const DB = require('../../common/mockDB').users;

const userAPI = {
  getAll: async () => DB,

  addNewRecord: async (user) => DB.push(user),

  getById: async (idx) => DB.find((user) => user.id === idx),

  updateRecord: async (idx, data) => {
    const user = await userAPI.getById(idx);
    if (user) Object.assign(user, data);
  },

  deleteRecord: async (idx) => {
    const index = DB.findIndex((record) => record.id === idx);
    DB.splice(index, 1);
  },
};

module.exports = { userAPI };
