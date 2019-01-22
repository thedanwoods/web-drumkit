import originalList from '../config/instrumentsList.json';

const instrumentsList = () => originalList.instruments.map(instrument => ({
  ...instrument,
  url: `${process.env.PUBLIC_URL}${instrument.url}`,
}));

export default instrumentsList;
