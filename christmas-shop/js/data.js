

// let data = null; // Переменная для хранения данных

// const getData = async () => {
//   const response = await fetch('../data.json');
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   data = await response.json();
//   return data;
// }

// // Чтобы получить данные из json один раз и не бегать туда-сюда
// const initData = async () => {
//   if (!data) {
//     await getData(); // Ждем завершения загрузки
//   }

//   return data;
// };

// // экспортирую уже полученные данные, а не функцию getData обращения к json
// export { initData };

/**************************************************** */
/**************************************************** */

class DataService {
  constructor() {
    this.data = null; // Сначала данных нет
  }

  async initData() {
    // Если данные еще не загружены, загружаем их
    if (!this.data) {
      await this.getData();
    }
    return this.data; // Возвращаем данные
  }

  async getData() {
    const response = await fetch('../data.json'); // Получаем данные
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    this.data = await response.json(); // Сохраняю данные в свойстве `data`
  }
}

// Создание единственного экземпляра (Singleton)
const instanceData = new DataService();

// export default instanceData; // экспорт default позволяет импортировать под любым именем
export { instanceData }




