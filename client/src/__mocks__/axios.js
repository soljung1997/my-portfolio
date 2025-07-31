const mockAxios = {
  create: jest.fn(() => mockAxios),
  get: jest.fn(() => Promise.resolve({ data: [] })),
  interceptors: {
    request: {
      use: jest.fn(),
    },
  },
};

export default mockAxios;
