/// <reference types="cypress" />
import dadosCheckoutPage from '../support/page_objects/dadosCheckout.page'
const dadosCheckout = require('../fixtures/dadosCheckout.json');

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        //acessar a minha conta
        cy.visit('minha-conta')
        // Realizar login com os dados da fixture perfil, e metodos do comando login
        cy.fixture('perfil').then(dados => {
            cy.login(dados.usuario, dados.senha)
        })
    });


    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        // adcionando produtos ao carrinho

        cy.produtos('Ajax Full-Zip Sweatshirt', 'XL', 'Blue')

        cy.produtos('Argus All-Weather Tank', 'S', 'Gray')

        cy.produtos('Arcadio Gym Short', '34', 'Black')

        cy.produtos('Aether Gym Pant', '32', 'Brown')


        //Validar quantidade adcionada ao carrinho
        var qnt = 4
        //cy.get('.dropdown-toggle > .mini-cart-items').should('contain', qnt)

        //Ir para Checkout
        cy.checkout();

        
        //Preencher dados do checkout, arquivo json + page objects
            dadosCheckoutPage.dadosCheckout(
                dadosCheckout.pais,
                dadosCheckout.uf,
                dadosCheckout.cep
            )
           

        //Validar se o pedido foi realizado com sucesso
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')

    });
})