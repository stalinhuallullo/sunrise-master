import { createHash } from 'crypto';

function hash(string: string) {
  return createHash('sha256').update(string).digest('hex');
}

export const fetchSunlight = (url: string, token: any, host: any) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.api+json',
      'X-Sunrise-Signature': hash(`${token}-application/vnd.api+json-${host}`)
    },
    credentials: 'include',
    body: JSON.stringify({ data: { token } })
  }).then((r) => { 
    return r.json();
  });
