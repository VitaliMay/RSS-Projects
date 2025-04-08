import { controlsBtnState, currentPage, winnersPage } from '../store/controls-store';
// import { createListItem } from '../components/list/list';
import { getMaxID } from '../utils/elementUtils';
import { counterID } from '../sources/car-options';

import { paginationButtonHolder } from '../components/pagination/pagination';

// const { startRaceButton } = controlsBtnState;
// console.log(startRaceButton);

// if (startRaceButton) {
//   startRaceButton.addEventListener('click', () => {
//     console.log('Привет');
//   });
// }

// startRaceButton.addEventListener('click', () => {
//   console.log('Привет');
//   fetchTotal();
// });

export async function fetchInitial(callback) {
  // console.log('Привет');

  // const { titleGarage, pagination } = controlsBtnState;
  // const titlePagination = pagination.title;
  // const { buttonNext } = pagination;

  // const { numberCurrentPage } = currentPage;
  const { titleGarage } = controlsBtnState;

  try {
    // Запрос на весь гараж, чтобы правильно определить начальный ID
    const response = await fetch('http://127.0.0.1:3000/garage');
    // const response = await fetch('http://127.0.0.1:3000/garage?_page=1&_limit=7');

    // Проверяем, успешен ли ответ
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const totalCount = data.length;
    currentPage.totalCars = totalCount;

    // Получаем заголовок X-Total-Count (с запросом на весь гараж не сработает)
    // const totalCount = Number(response.headers.get('X-total-Count'));
    // console.log('X-Total-Count:', totalCount);
    // console.log(titleGarage);
    if (titleGarage) {
      titleGarage.textContent = `Garage (total cars: ${totalCount})`;
    }

    // const maxPage = Math.ceil(totalCount / 7);
    // titlePagination.textContent = `Page: ${numberCurrentPage} / ${maxPage}`;
    // if (totalCount > 7) {
    //   buttonNext.disabled = false;
    // }

    paginationButtonHolder();

    // const data = await response.json();

    // можно упростить, взяв iD у тока последнего элемента
    const initialValueID = getMaxID(data);
    // console.log(initialValueID);
    counterID.loadCount(initialValueID);
    // console.log(counterID.getCount());

    // Обработка полученных данных
    // console.log(data);
    // return data;

    // const carOnFirstPage = totalCount > 7 ? 7 : totalCount;
    const carOnFirstPage = Math.min(totalCount, 7);

    // Ставлю на страницу только 7 первых элементов
    for (let i = 0; i < carOnFirstPage; i += 1) {
      // createListItem(data[i].id, data[i].color, data[i].name);
      callback(data[i].id, data[i].color, data[i].name);
    }

    // data.forEach((item) => {
    //   createListItem(item.id, item.color, item.name);
    // });

    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return null;
  }
}

/** ********************************************************************** */

export async function fetchPagination(page, callback) {
  // console.log('Привет');

  const { titleGarage } = controlsBtnState;
  // const { titleGarage, pagination } = controlsBtnState;
  // const titlePagination = pagination.title;
  // const { buttonNext } = pagination;

  // const { numberCurrentPage } = currentPage;

  try {
    const response = await fetch(`http://127.0.0.1:3000/garage?_page=${page}&_limit=7`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const totalCount = Number(response.headers.get('X-total-Count'));

    console.log('pagination', data);

    currentPage.totalCars = totalCount;

    const carOnPage = data.length;
    // Получаем заголовок X-Total-Count (с запросом на весь гараж не сработает)

    if (carOnPage === 0 && page > 1) {
      fetchPagination(page - 1, callback);
    }

    if (titleGarage) {
      titleGarage.textContent = `Garage (total cars: ${totalCount})`;
    }

    // currentPage.totalCars += 100;
    // const maxPage = Math.ceil(totalCount / 7);
    // titlePagination.textContent = `Page: ${page} / ${maxPage}`;
    // if (totalCount > 7) {
    //   buttonNext.disabled = false;
    // }

    paginationButtonHolder();

    // Ставлю на страницу
    for (let i = 0; i < carOnPage; i += 1) {
      callback(data[i].id, data[i].color, data[i].name);
    }

    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return null;
  }
}

// export async function mainFunc(callbackFetch, callback) {
//   const data = await callbackFetch();
//   // console.log(data);
//   callback(data);
//   // return data;
// }

/** *********************************************************************** */

export async function fetchDelete(carID) {
  const url = `http://127.0.0.1:3000/garage/${carID}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }

    const responseData = await response.json();
    // item.remove();
    // console.log(responseData); // обрабатываем данные ответа по необходимости
    return responseData;
  } catch (error) {
    console.error('Произошла проблема с выполнением запроса:', error);
    throw error;
  }
}

/** ************************************************************** */

export async function fetchAdd(data) {
  const url = 'http://127.0.0.1:3000/garage';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    // console.log(responseData); // смотрю что отправляю
    return responseData;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}

/** **************************************************** */

export async function fetchUpdateCar(id, data) {
  const url = `http://127.0.0.1:3000/garage/${id}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    console.log(responseData); // смотрю что отправляю
    return responseData;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}

/** **************************************************** */

export async function fetchStarted(id) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      throw new Error('Error occurred!');
    }
    const data = await response.json();
    // console.log(`${JSON.stringify(dataVelocityObj)}`)
    console.log(data);
    const animationDuration = data.distance / data.velocity;
    return animationDuration;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/** ********************************************************************* */

export async function fetchDrive(id) {
  // try {
  const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    // throw new Error('Error occurred!');

    console.log('машинка сломалась, id=', id);
    return false;
  }
  const data = await response.json();
  console.log('id=', id, data.success);
  return data.success;
  // } catch (error) {
  //   // console.log(`Статус ошибки ${error}`);
  //   // throw error;
  //   return false;
  // }
}

/** *************************************************************** */

export async function fetchStopped(id, callback) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=stopped`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      throw new Error('Error occurred!');
    }
    const data = await response.json();
    // console.log(`${JSON.stringify(dataVelocityObj)}`)
    console.log('stop id=', id, data.velocity);
    callback();
    // const animationDuration = data.distance / data.velocity;
    // return animationDuration;
    return data.velocity;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/** ************************************************************** */

export async function fetchGetTotalGarage() {
  try {
    const response = await fetch('http://127.0.0.1:3000/garage');
    // Проверяем, успешен ли ответ
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    // winnersPage.dataTotalWinners = data;
    // const totalCount = data.length;

    // currentPage.dataTotalGarage = data;

    // if (titleWinners) {
    //   titleWinners.textContent = `Winners (total: ${totalCount})`;
    // }

    // paginationButtonHolder();

    // const winnersOnFirstPage = Math.min(totalCount, 10);

    // // Ставлю на страницу только 10 первых элементов
    // for (let i = 0; i < winnersOnFirstPage; i += 1) {
    //   callback(data[i].id, data[i].color, data[i].name);
    // }

    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return null;
  }
}

/** ************************************************************** */

export async function fetchGetTotalWinners() {
  try {
    const response = await fetch('http://127.0.0.1:3000/winners');
    // Проверяем, успешен ли ответ
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    winnersPage.dataTotalWinners = data;
    const totalCount = data.length;
    winnersPage.totalWinners = totalCount;

    // if (titleWinners) {
    //   titleWinners.textContent = `Winners (total: ${totalCount})`;
    // }

    // paginationButtonHolder();

    // const winnersOnFirstPage = Math.min(totalCount, 10);

    // // Ставлю на страницу только 10 первых элементов
    // for (let i = 0; i < winnersOnFirstPage; i += 1) {
    //   callback(data[i].id, data[i].color, data[i].name);
    // }

    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return null;
  }
}

/** ************************************************************** */

export async function fetchAddWinner(data) {
  const url = 'http://127.0.0.1:3000/winners';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    console.log(responseData); // смотрю что отправляю
    return responseData;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}

export async function fetchGetWinner(id) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/winners?id=${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    console.log(data);
    // const totalCount = data.length;
    // winnersTotal.totalWinners = totalCount;

    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return null;
  }
}

export async function fetchDeleteWinner(carID) {
  const url = `http://127.0.0.1:3000/winners/${carID}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }

    const responseData = await response.json();
    // item.remove();
    // console.log(responseData); // обрабатываем данные ответа по необходимости
    return responseData;
  } catch (error) {
    console.error('Произошла проблема с выполнением запроса:', error);
    throw error;
  }
}

export async function fetchUpdateWinner(id, data) {
  const url = `http://127.0.0.1:3000/winners/${id}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    console.log(responseData); // смотрю что отправляю
    return responseData;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}

// _sort=['id'|'wins'|'time']

// _order=['ASC'|'DESC']

export async function fetchSortWinner(page, sort, order) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/winners?_page=${page}&_limit=10&_sort=${sort}&_order=${order}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    console.log(data);

    const totalCount = Number(response.headers.get('X-total-Count'));
    winnersPage.totalWinners = totalCount;

    // console.log('total Winners =', totalCount);
    // const totalCount = data.length;
    // winnersTotal.totalWinners = totalCount;

    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return null;
  }
}

// export async function fetchGetWinner(id) {
//   const url = 'http://127.0.0.1:3000/winners';

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const responseData = await response.json();
//     // console.log(responseData); // смотрю что отправляю
//     return responseData;
//   } catch (error) {
//     console.error('There was a problem with the fetch operation:', error);
//     throw error;
//   }
// }
