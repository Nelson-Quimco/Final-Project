import Cookies from "js-cookie";

export const setCookie = (key: string, value: string, options = {}) => {
  Cookies.set(key, value, { expires: 0.5, ...options });
};

export const getCookie = (key: string) => {
  return Cookies.get(key);
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
