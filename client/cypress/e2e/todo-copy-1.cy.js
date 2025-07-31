describe('Public App Entry Point', () => {
  const baseUrl = 'https://my-portfolio-czuk.vercel.app';

  it('loads the home page successfully', () => {
    cy.visit(baseUrl); // Just visit the public landing page
    cy.contains('Welcome'); // or any public text you show
  });
});
