// Cookie'max age: 365 days
const COOKIE_MAX_AGE = 60*60*24*365;

export function decodeCookie() {
    return document.cookie
        .split(';')
        .reduce((res, c) => {
            const [key, val] = c.trim().split('=').map(decodeURIComponent);
            const allNumbers = str => /^\d+$/.test(str);
            try {
                return Object.assign(res, { [key]: allNumbers(val) ?  val : JSON.parse(val) })
            } catch (e) {
                return Object.assign(res, { [key]: val })
            }
        }, {});
}

export function encodeCookie({ key, value, domain, path = '/'}) {
    let finalCookieValue = `${key}=${encodeURIComponent(value)};max-age=${COOKIE_MAX_AGE}`;
    if (_isHttps()) finalCookieValue += ';secure';
    if (domain) finalCookieValue += `;domain=${domain}`;
    if (path) finalCookieValue += `;path=${path}`;
    document.cookie = finalCookieValue;
}

function _isHttps() {
    return window.location.protocol === 'https:';
}