describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
		const user = {
			name: 'Johann Osnaya',
			username: 'JohannOsnaya',
			password: 'nolesabes'
		}
		const otheruser = {
			name: 'Admin',
			username: 'root',
			password: 'admin'
		}
		cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, user)
		cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, otheruser)
		cy.visit('')
	})

	it('login from can be opened', function() {
		cy.contains('log in').click()
		cy.contains('username')
	})

	it('user can log in', function() {
		cy.contains('log in').click()
		cy.contains('username')
		cy.contains('username').find('input').type('JohannOsnaya')
		cy.contains('password').find('input').type('nolesabes')
		cy.contains('login').click()

		cy.contains('Johann Osnaya logged')
	})

	it('cant log in with wrong credentials', function() {
		cy.contains('log in').click()
		cy.contains('username').find('input').type('JohannOsnaya')
		cy.contains('password').find('input').type('wrong')
		cy.contains('login').click()

		cy.get('.ErrorMessage').contains('Wrong credentials')
		cy.get('.ErrorMessage').should('have.css', 'color', 'rgb(255, 0, 0)')
	})

	describe('when logged in', function() {
		beforeEach(function() {
			cy.login( { username: 'JohannOsnaya', password:'nolesabes' } )
		})

		it('can create a note', function() {
			cy.contains('Create blog').click()
			cy.get('#Title').type('The Breakfast Club')
			cy.get('#Author').type('Ana Briseida')
			cy.get('#Url').type('www.twitter.com')
			cy.get('#createBlog').click()
			cy.get('.SuccessMessage').should('include.text', 'The Breakfast Club')
			cy.get('.showDivTest').contains('The Breakfast Club')
		})

		describe('can like a blog', function() {
			beforeEach(function() {
				cy.createBlog({
					title: 'The Breakfast Club',
					author: 'Ana Briseida',
					url: 'www.twitter.com',
					likes: 1
				})
				cy.createBlog({
					title: 'Sharks',
					author: 'Johann Osnaya',
					url: 'www.google.com',
					likes: 0
				})
			})

			it('can like a post', function () {
				cy.contains('The Breakfast Club').contains('show').click()
				cy.get('.testDiv').contains('like').click()
				cy.get('.testDiv').contains('2')
			})

			it('the creator of the blog can delete it', function() {
				cy.contains('The Breakfast Club').contains('show').click()
				cy.get('.testDiv').contains('remove').click()
			})

			it('only the creator can see the remove button', function() {
				cy.login({ username: 'root', password: 'admin' })
				cy.contains('The Breakfast Club').contains('show').click()
				cy.get('.testDiv').should('not.contain','remove')

			})

			it('the blogs are presented with the most liked at the star and the less liked at the end', function () {
				cy.get('.showDivTest').eq(0).should('contain', 'The Breakfast Club')
				cy.get('.showDivTest').eq(1).should('contain', 'Sharks')
			})
		})
	})

})