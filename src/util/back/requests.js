// import axios from "axios";

import axios from "axios";

// const URL = "https://blockcreater.com:6054/"; // TEST
export const API_URL = "https://fotball-learn.site:7044/api/v1/"; //PROD
// export const DOMAIN = "https://fotball-learn.site:7044/";
// const TYPE = "DEV";
const TYPE = "PROD";

export const TG_ID = localStorage.getItem("username") || "username";
const token = localStorage.getItem("token");

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export const getAllPlayers = async () => {
  if (TYPE == "DEV") {
    return [
      {
        id: 1,
        name: "Player One",
        price: 1000,
        value: 15.5,
        photo: "./images/person/1.png",
      },
      {
        id: 2,
        name: "Player Two",
        price: 2000,
        value: 20,
        photo: "./images/person/2.png",
      },
      {
        id: 3,
        name: "Player Three",
        price: 1500,
        value: 18.7,
        photo: "./images/person/3.png",
      },
      {
        id: 4,
        name: "Player Four",
        price: 1000,
        value: 15.5,
        photo: "./images/person/4.png",
      },
      {
        id: 5,
        name: "Player Five",
        price: 2000,
        value: 20,
        photo: "./images/person/5.png",
      },
      {
        id: 6,
        name: "Player Fifth",
        price: 1500,
        value: 18.7,
        photo: "./images/person/6.png",
      },
    ];
  } else {
    try {
      const response = await apiClient.get("player/shop/all");
      return response.data;
    } catch {
      return false;
    }
  }
};
export const getAllBalls = async () => {
  if (TYPE == "DEV") {
    return [
      {
        id: 1,
        name: "Test",
        price: 100,
        photo: "./images/ball/1.png",
      },
      {
        id: 2,
        name: "Test",
        price: 100,
        photo: "./images/ball/2.png",
      },
      {
        id: 3,
        name: "Test",
        price: 100,
        photo: "./images/ball/3.png",
      },
      {
        id: 4,
        name: "Test",
        price: 100,
        photo: "./images/ball/4.png",
      },
      {
        id: 5,
        name: "Test",
        price: 100,
        photo: "./images/ball/5.png",
      },
      {
        id: 6,
        name: "Test",
        price: 100,
        photo: "./images/ball/6.png",
      },
    ];
  } else {
    try {
      const response = await apiClient.get("ball/shop/all");
      return response.data;
    } catch {
      return false;
    }
  }
};

export const getListUsers = async (id) => {
  if (TYPE == "DEV") {
    return [
      {
        amount: 0,
        nameSurname: "TestUser",
        photo: "string",
      },
      {
        amount: 100,
        nameSurname: "TestUser2",
        photo: "string",
      },
      {
        amount: 0,
        nameSurname: "TestUser3",
        photo: "string",
      },
      {
        amount: 0,
        nameSurname: "TestUser6",
        photo: "string",
      },
      {
        amount: 0,
        nameSurname: "5",
        photo: "string",
      },
      {
        amount: 0,
        nameSurname: "6",
        photo: "string",
      },
      {
        amount: 100,
        nameSurname: "7",
        photo: "string",
      },
      {
        amount: 0,
        nameSurname: "8",
        photo: "string",
      },
      {
        amount: 0,
        nameSurname: "9",
        photo: "string",
      },
      {
        amount: 0,
        nameSurname: "10",
        photo: "string",
      },
    ];
  } else {
    try {
      const response = await apiClient.get("pool_users/get/" + id);
      return response.data.poolUserDtoList;
    } catch {
      return false;
    }
  }
};

export const getUserInfo = async (id) => {
  if (TYPE == "DEV") {
    return {
      telegramId: "vladsasnyk",
      username: "Nick_name",
      balance: 250,
      currentBallId: 1,
      currentPlayerId: 1,
      counterFriend: 0,
      energy: 5,
      email: null,
      phone: null,
      dailyBonus: 1,
      dailyBonusAvailable: false,
      dailyBonusUnlock: "2024-11-14T15:02:21",
      telegramBonus: false,
      admin: false,
    };
  } else {
    try {
      const response = await apiClient.get("user/" + id + "/{uniqueLink}");
      if (response) {
        return response.data;
      } else {
        return "error";
      }
    } catch {
      return "error";
    }
  }
};

export const updateUserName = async (id, name) => {
  try {
    const response = await apiClient.put(
      "user/update/nickname/" + id,
      '"' + name + '"',
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response) {
      return true;
    }
  } catch (err) {
    return false;
  }
};

export const updateBalance = async (id, clicks) => {
  try {
    const response = await apiClient.put(
      "user/update/balance/" + id,
      '"' + clicks + '"',
    );
    return response.data;
  } catch (err) {
    return false;
  }
};

export const getBoughtPlayers = async (id) => {
  if (TYPE == "DEV") {
    return true;
  }

  try {
    const response = await apiClient.get("user/players/" + id);
    return response.data;
  } catch {
    return false;
  }
};

export const getBoughtBalls = async (id) => {
  if (TYPE == "DEV") {
    return true;
  }

  try {
    const response = await apiClient.get("user/balls/" + id);
    return response.data;
  } catch {
    return false;
  }
};

export const selectPlayer = async (id, idPlayer) => {
  try {
    const response = await apiClient.put(
      URL + "user/player/update/" + id,
      '"' + idPlayer + '"',
    );
    return response;
  } catch {
    return false;
  }
};
export const buyNewPlayer = async (id, idPlayer) => {
  try {
    const response = await apiClient.post(
      "user/players/buy/" + id,
      '"' + idPlayer + '"',
    );
    return response;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const selectBall = async (id, idBall) => {
  try {
    const response = await apiClient.put(
      URL + "user/balls/update/" + id,
      '"' + idBall + '"',
    );
    return response;
  } catch {
    return false;
  }
};
export const buyNewBall = async (id, idBall) => {
  try {
    const response = await apiClient.post(
      "user/balls/buy/" + id,
      '"' + idBall + '"',
    );
    return response;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getCurrency = async () => {
  if (TYPE == "DEV") {
    return [
      {
        country: "ARS",
        value: 1100,
      },
      {
        country: "USD",
        value: 1,
      },
      {
        country: "COP",
        value: 4300,
      },
      {
        country: "CLP",
        value: 1010,
      },
      {
        country: "MXN",
        value: 21.3,
      },
    ];
  } else {
    try {
      const response = await apiClient.get("currency/all");
      return response.data;
    } catch {
      return false;
    }
  }
};

export const checkPromo = async (id, promo) => {
  try {
    const response = await apiClient.post(
      "user/use_promo/" + id,
      '"' + promo + '"',
    );
    return response;
  } catch (err) {
    console.log(err);
    return false;
  }
  // return true;
};

export const checkChannel = async (type, id) => {
  // if (!type) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(false);
  //     }, 3000);
  //   });
  // }
  try {
    const status = await apiClient.post("user/channel/" + id);
    if (status) {
      const response = await apiClient.post("user/bonus/" + id);
      return response;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export const dailyBonusUse = async (id) => {
  try {
    const response = await apiClient.get("user/bonus/" + id);
    return response;
  } catch {
    return false;
  }
};

export const getCards = async () => {
  try {
    const response = await apiClient.get("details/all");
    return response.data;
  } catch {
    throw new Error("error fetching data");
  }
};

export const sendPhoto = async (formData, sum, stage, country) => {
  try {
    const response = await apiClient.post(
      "user/sendImage/" +
        TG_ID +
        "?sum=" +
        sum +
        "&stage=" +
        stage +
        "&country=" +
        country,
      formData,
    );
    if (response) {
      return true;
    }
  } catch {
    return false;
  }
};

export const checkPaymanetStatus = async () => {
  try {
    const response = await apiClient.get("user/sendImage/getStatus/" + TG_ID);
    if (response) {
      return response.data;
    } else {
      console.log("test");
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getUrlLink = async () => {
  try {
    const response = await apiClient.get(URL + "user/referal/" + TG_ID);
    if (response) {
      return response.data;
    }
  } catch {
    return false;
  }
};

export const getBonusForCom = async (sum) => {
  console.log(sum);
  try {
    const response = await apiClient.post("user/balance/" + TG_ID, sum);
    if (response) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};
