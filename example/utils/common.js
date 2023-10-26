import { faker } from '@faker-js/faker';

export function getList(number) {
  const newList = [];
  for (let i = 0; i < number; i++) {
    newList.push({
      id: faker.string.nanoid(),
      text: faker.lorem.sentences(),
    });
  }
  return newList;
}

export function getNameList(count) {
  const data = [];
  for (let index = 0; index < count; index += 1) {
    data.push({
      id: index,
      name: `${faker.name.firstName()}`,
    });
  }
  return data;
}

export async function getParagraphList(page = 1, count) {
  return new Promise((resolve) => {
    console.time('getParagraphList');
    const data = [];
    for (let index = 0; index < count; index += 1) {
      data.push({
        id: (page - 1) * count + index,
        text: `${faker.lorem.paragraph()}`,
        text1: `${faker.lorem.paragraph()}`,
      });
    }
    console.timeEnd('getParagraphList');
    resolve(data);
  });
}

// export function getRows(page, pageSize) {
//   return fakeData.slice((page - 1) * pageSize, page * pageSize);
// }

// export function addRows(lastLength, length) {
//   return fakeData.slice(lastLength, lastLength + length);
// }

// export function asyncGetRows(page, pageSize) {
//   return new Promise((resolve) => {
//     // fake ajax
//     setTimeout(() => {
//       resolve(fakeData.slice((page - 1) * pageSize, page * pageSize));
//     }, 1000);
//   });
// }

const randomArr = [60, 80, 100, 110, 130];

export function getHorizontalList(count) {
  const data = [];
  for (let index = 0; index < count; index += 1) {
    const randomIndex = Math.floor(Math.random() * randomArr.length);
    data.push({
      id: index,
      width: randomArr[randomIndex],
    });
  }
  return data;
}
