const dummyData = [
  {
    id: '123',
    title: 'testBoard',
    columns: [
      {
        id: '222',
        title: 'testColumn',
        order: 0,
      },
    ],
  },
];

const getAll = async () => dummyData;
const addNewRecord = async (data) => dummyData.push(data);
module.exports = { getAll, addNewRecord };
