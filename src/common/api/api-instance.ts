import fetches from './fetches';

export const api = fetches.create({
  baseURL: 'http://localhost:31299/api/'
});
