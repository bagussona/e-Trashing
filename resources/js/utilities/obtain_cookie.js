/** Obtain Cookie based on given name Function */
const getCookieValue = (name) => (
  document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)

const getCookie = (cookie_name) => {
  const cookie = getCookieValue(cookie_name);

  return cookie || 'tidak ditemukan';
}

export { getCookie, getCookieValue };
/** End of Function */