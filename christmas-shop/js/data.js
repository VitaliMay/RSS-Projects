

let data = null; // Переменная для хранения данных

const getData = async () => {
  const response = await fetch('../data.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  data = await response.json();
  return data;
}

// Чтобы получить данные из json один раз и не бегать туда-сюда
const initData = async () => {
  if (!data) {
    await getData(); // Ждем завершения загрузки
  }

  return data;
};

// экспортирую уже полученные данные, а не функцию getData обращения к json
export { initData };







