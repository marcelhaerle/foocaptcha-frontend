/**
 * Load the captcha from the internal api.
 * @param type {String} the type, e.g. 'chars' or 'equation'
 * @returns {Promise<{src: *, id: *}>}
 */
export const loadCaptcha = (type) => {
  return fetch(`/api/${type}`)
    .then(response => response.json())
    .then(json => {
      return {
        id: json.id,
        src: json.src
      }
    });
};
