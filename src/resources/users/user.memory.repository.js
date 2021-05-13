const dummyData = [
  {
    id: '1',
    name: 'Qwerty1',
    login: 'qwe',
    password: 'qwerty123',
  },
  {
    id: '2',
    name: 'Qwerty2',
    login: 'asd',
    password: 'qwerty123',
  },
  {
    id: '3',
    name: 'Qwerty3',
    login: 'zxc',
    password: 'qwerty123',
  },
  {
    id: '4',
    name: 'Qwerty4',
    login: 'wer',
    password: 'qwerty123',
  },
  {
    id: '5',
    name: 'Qwerty5',
    login: 'sdf',
    password: 'qwerty123',
  },
];

const getAll = async () => dummyData;

const getById = async (idx) => dummyData.find((user) => user.id === idx);

const addNewRecord = async (user) => dummyData.push(user);

const updateRecord = async (idx, data) => {
  const user = await getById(idx);
  if (user) Object.assign(user, data);
};
const deleteRecord = async (idx) => {
  const index = dummyData.findIndex((record) => record.id === idx);
  dummyData.splice(index, 1);
};

module.exports = { getAll, addNewRecord, getById, updateRecord, deleteRecord };
