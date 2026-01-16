/** @type {import('mock-config-server').FlatMockServerConfig} */
const flatMockServerConfig = [
  {
    baseUrl: '/api',
    cors: {
      origin: /localhost/,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
    },
    database: {
      data: './data.json'
    }
  }
];

export default flatMockServerConfig;
