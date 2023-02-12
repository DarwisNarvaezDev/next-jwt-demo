import { expect } from "chai"

describe('usersOnlySpec', () => {

  const home = 'http://localhost:3000/'
  const userOnlyButton = '[id=usersOnlyButton]'
  const userOnlyHeading = '[id=UserFormHeading]'
  const logoutButton = '[id=logoutButton]'
  const cookiesKey = {
    refresh: `${'JwtNextDemo'}RefreshToken`,
    access: `${'JwtNextDemo'}AccessToken`
  }
  const mockAuthInfo = [
    { key: "Access Token", value: "Example" },
    { key: "Refresh Token", value: "Example" },
    { key: "User", value: "Example@example.com" },
    { key: "Hash", value: "Hash" },
    { key: "Joined", value: "000/000/000" },
]

  it('Should redirect to login if the auth cookies are not set', () => {
    cy.visit(home)
    cy.getCookie(cookiesKey.access).should('not.exist')
    cy.getCookie(cookiesKey.refresh).should('not.exist')
    cy.get(userOnlyButton).click()
    cy.get(userOnlyHeading).contains('Login')
  });
  
  it('Should display error in login if the user try to breach', () => {
    cy.visit(home)
    cy.get(userOnlyButton).click()
    cy.url().should('include', 'autherror=true')
  })

  it('Should redirect to \'/user/refresh\' when the refresh token cookie is set', () => {
    cy.visit(home)
    cy.setCookie(cookiesKey.refresh, 'Test')
    cy.get(userOnlyButton).click()
    cy.url().should('include', '/refresh')
  })
  
  it('Should view usersOnly section if the access token is set', ()=>{
    cy.visit(home)
    cy.setCookie(cookiesKey.access, 'Test')
    cy.setCookie(cookiesKey.refresh, 'Test')
    // Stub the 'getSessionData' response within component
    cy.intercept(
      {
        method: 'GET',
        url: '/api/user/getsessiondata'
      },
      mockAuthInfo
    ).as('getSessionData')
    cy.get(userOnlyButton).click()
    cy.url().should('include', '/usersonly')
  })

  it('Should revoke the tokens when user hit \'logout\' button', ()=>{
    cy.visit(home)
    cy.setCookie(cookiesKey.access, 'Test')
    cy.setCookie(cookiesKey.refresh, 'Test')
    // Stub the 'getSessionData' response within component
    cy.intercept(
      {
        method: 'GET',
        url: '/api/user/getsessiondata'
      },
      mockAuthInfo
    ).as('getSessionData')
    cy.get(userOnlyButton).click()
    cy.url().should('include', '/usersonly')
    cy.get(logoutButton).click()
    cy.getCookie(cookiesKey.access).should('not.exist')
    cy.getCookie(cookiesKey.refresh).should('not.exist')
  })


  it('Should redirect to index page when user hit logout', ()=>{
    cy.visit(home)
    cy.setCookie(cookiesKey.access, 'Test')
    cy.setCookie(cookiesKey.refresh, 'Test')
    // Stub the 'getSessionData' response within component
    cy.intercept(
      {
        method: 'GET',
        url: '/api/user/getsessiondata'
      },
      mockAuthInfo
    ).as('getSessionData')
    cy.get(userOnlyButton).click()
    cy.url().should('include', '/usersonly')
    cy.get(logoutButton).click()
    cy.url().should('include', home);
  })

})