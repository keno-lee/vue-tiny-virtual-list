import { faker } from '@faker-js/faker';

export function getList(length: number, start = 0): any[] {
  const newList = [];
  for (let i = 0; i < length; i++) {
    newList.push({
      index: i,
      id: faker.string.nanoid(),
      text: faker.lorem.sentences(),
    });
  }
  return newList;
}

// 异步获取数据
export async function asyncGetList(length: number, start = 0): Promise<any[]> {
  return new Promise((resolve) => {
    const newList = [];
    for (let i = 0; i < length; i++) {
      newList.push({
        index: start + i,
        id: faker.string.nanoid(),
        text: faker.lorem.sentences(),
      });
    }
    resolve(newList);
  });
}

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
