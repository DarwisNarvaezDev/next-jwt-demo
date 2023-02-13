import { cookiesKey, home, loginButton, loginEmail, loginPassword, mockAuthInfo, userOnlyButton, userOnlyHeading } from "./CypressGlobasl"

describe('loginViewSpec', () => {

    it('Should go to dynamic view, serving the login form', () => {
        cy.visit(home)
        cy.get(userOnlyButton).click()
        cy.get(userOnlyHeading).contains('Login')
        cy.get(loginButton).should('contain', 'Login')
    })

    it('Should redirect to usersOnly automatically when the access token is set on browser', () => {
        cy.visit(home)
        cy.setCookie(cookiesKey.access, 'Test')
        cy.get(loginButton).click()
        // Stub the 'getSessionData' response within component
        cy.intercept(
            {
                method: 'GET',
                url: '/api/user/getsessiondata'
            },
            mockAuthInfo
        ).as('getSessionData')
        cy.url().should('include', '/usersonly')
    })

    it('Should redirect to \'/user/refresh\' when access refresh token is set on browser', () => {
        cy.visit(home)
        cy.setCookie(cookiesKey.refresh, 'Test')
        cy.get(loginButton).click()
        cy.url().should('include', '/refresh')
    })

    it( 'Should deny form submission if email is not valid', ()=>{
        cy.visit(home)
        cy.get(loginButton).click()
        cy.get(loginEmail).type('test').type('{enter}')
        cy.get('[id=UserForm-feedback]').should('have.text', 'Please check the form inputs')
    } )

    it( 'Should deny form submission if password is not valid', ()=>{
        cy.visit(home)
        cy.get(loginButton).click()
        cy.get(loginPassword).type('test').type('{enter}')
        cy.get('[id=UserForm-feedback]').should('have.text', 'Please check the form inputs')
    } )

    it( 'Form don\'t complain if user submits a valid username and password ', ()=>{
        cy.visit(home)
        cy.get(loginButton).click()
        cy.get(loginEmail).type('test@test.com').type('{enter}')
        cy.get(loginPassword).type('1234567').type('{enter}')
        cy.get('[id=UserForm-feedback]').should('not.exist')
    })

    it('Form submits correctly and redirects to users only area if username and password are correct', () => {
        cy.visit(home)
        cy.get(loginButton).click()
        // Intercept 'signin' request
        cy.intercept(
            {
                method: 'POST',
                url: '/api/user/signin',
            },
            { accessToken: 'Test', message: 'Hey' },
        ).as('SignIn')
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
        cy.get(loginEmail).type('test@test.com')
        cy.get(loginPassword).type('1234567').type('{enter}')
        cy.url().should('include', 'usersonly')
    })

})