const API = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = (url, options = {}) =>
  fetch(`${API}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
