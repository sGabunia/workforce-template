import fetches from './fetches';

export const api = fetches.create({
  baseURL: 'https://d04e306d8e776f5e.mokky.dev/',
  headers: {
    'Content-Type': 'application/json'
  }
});
