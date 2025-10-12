import { controlsBtnState, currentPage, winnersPage } from '../store/controls-store';
import { getMaxID } from '../utils/elementUtils.ts';
import { counterID } from '../sources/car-options';

import { paginationButtonHolder } from '../components/pagination/pagination';

export async function fetchInitial(callback) {
  const { titleGarage } = controlsBtnState;

  try {
    const response = await fetch('http://127.0.0.1:3000/garage');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const totalCount = data.length;
    currentPage.totalCars = totalCount;
    if (titleGarage) {
      titleGarage.textContent = `Garage (total cars: ${totalCount})`;
    }

    paginationButtonHolder();

    const initialValueID = getMaxID(data);
    counterID.loadCount(initialValueID);

    const carOnFirstPage = Math.min(totalCount, 7);

    for (let i = 0; i < carOnFirstPage; i += 1) {
      callback(data[i].id, data[i].color, data[i].name);
    }

    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return null;
  }
}

/** ********************************************************************** */

export async function fetchPagination(page, callback) {
  const { titleGarage } = controlsBtnState;

  try {
    const response = await fetch(`http://127.0.0.1:3000/garage?_page=${page}&_limit=7`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const totalCount = Number(response.headers.get('X-total-Count'));

    currentPage.totalCars = totalCount;

    const carOnPage = data.length;

    if (carOnPage === 0 && page > 1) {
      fetchPagination(page - 1, callback);
    }

    if (titleGarage) {
      titleGarage.textContent = `Garage (total cars: ${totalCount})`;
    }

    paginationButtonHolder();

    for (let i = 0; i < carOnPage; i += 1) {
      callback(data[i].id, data[i].color, data[i].name);
    }

    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return null;
  }
}

/** *********************************************************************** */

export async function fetchDelete(carID) {
  const url = `http://127.0.0.1:3000/garage/${carID}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    const responseData = await response.json();

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
    // console.log(responseData);
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

    return false;
  }
  const data = await response.json();
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
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

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
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    winnersPage.dataTotalWinners = data;
    const totalCount = data.length;
    winnersPage.totalWinners = totalCount;

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

    const totalCount = Number(response.headers.get('X-total-Count'));
    winnersPage.totalWinners = totalCount;

    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return null;
  }
}
