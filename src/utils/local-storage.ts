// Function to set key and value in browser local storage
const set = (key: string, value: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, value);
};

// Function to get local storage value from key
const get = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

// Function to delete local storage value from key
const del = (key: string) => {
  return localStorage.removeItem(key);
};

export const LocalStorageUtils = {
  set,
  get,
  del,
};
