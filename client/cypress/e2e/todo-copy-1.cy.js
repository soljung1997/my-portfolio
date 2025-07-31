describe('Public App Entry Point', () => {
  const baseUrl = 'https://my-portfolio-czuk-4v9myhqrn-solomons-projects-7c694625.vercel.app';

  it('loads the home page successfully', () => {
    cy.visit(baseUrl); // Just visit the public landing page
    cy.contains('Welcome'); // or any public text you show
  });
});
