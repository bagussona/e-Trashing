export var token = null || 'token tidak ditemukan';

export const saveToken = (newToken) => {
  token = newToken;

  return token;
}

export const deleteToken = () => {
  token = null || 'token tidak ditemukan';
}