// src/utils/dateFormatter.js
export const formatDateForSQL = (date: any) => {
  const pad = (num: number) => (num < 10 ? `0${num}` : num);

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero-indexed in JavaScript
  const day = pad(date.getDate());

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  // Return in 'YYYY-MM-DD HH:MM:SS' format
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// src/utils/dateFormatter.js
export const formatDateNormal = (date: any) => {
  const options = { year: "numeric", month: "long", day: "2-digit" };
  return date.toLocaleString("en-US", options);
};
