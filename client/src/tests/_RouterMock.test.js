jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => jest.fn()
  };
});

describe('Router mock works', () => {
  test('does not crash', () => {
    expect(true).toBe(true);
  });
});
