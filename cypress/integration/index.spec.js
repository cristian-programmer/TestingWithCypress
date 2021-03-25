/// <reference types="cypress" />
const URL = "https://www.saucedemo.com/";

const login = () =>{
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
}

const logout = () => {
    cy.get("#react-burger-menu-btn").click();
    cy.get('#logout_sidebar_link').click();
}

const addProducstoToCart = () => {
    cy.get(".inventory_item button").eq(0).click();
    cy.get(".inventory_item button").eq(1).click();
    cy.get(".inventory_item button").eq(2).click();

    cy.get(".fa-layers-counter.shopping_cart_badge").should("have.text", "3");
}

describe("SUIT TEST", () => {
    beforeEach(() => {
        cy.visit(URL)
        login();
    });


    it("should sort products by name Z - A", () => {
        cy.get(".product_sort_container").select("za");
        cy.get(".inventory_item_name").first().should("have.text", "Test.allTheThings() T-Shirt (Red)");
    });

    it("should sort products by name A - Z", () => {
       
        cy.get(".product_sort_container").select("az");
        cy.get(".inventory_item_name").first().should("have.text", "Sauce Labs Backpack");
    });

    it("should add products to the cart", () => {
        addProducstoToCart();
        cy.get(".fa-layers-counter.shopping_cart_badge").should("have.text", "3");
    });

    it("should remove products to the cart", ()=>{
        
        cy.get(":nth-child(4) > .pricebar > .btn_primary").click();
        cy.get(".fa-layers-counter.shopping_cart_badge").should("have.text", "1");
        cy.get(":nth-child(4) > .pricebar > .btn_secondary").click();
        cy.get(".fa-layers-counter.shopping_cart_badge").should("have.length", "0");
    });

    it("shoud remove products to the cart part in other view", () => {
        addProducstoToCart();
        cy.get(".fa-layers-counter.shopping_cart_badge").should("have.text", "3");
        cy.get(".svg-inline--fa").click();
        cy.get(".item_pricebar > .btn_secondary").eq(0).click();
        cy.get(".item_pricebar > .btn_secondary").eq(1).click();
        cy.get(".item_pricebar > .btn_secondary").eq(0).click(); 
        /** The reason to click on a 0 position again is because when deleting an html element the positions rotate
         * that means that as this is the last element deleted, it is in position 0 since only this one remains.
        **/
        cy.get(".fa-layers-counter.shopping_cart_badge").should("have.length", "0");
    });

    it("should complete checkout", () => {
        addProducstoToCart();
        cy.get(".svg-inline--fa").click();
        cy.get("a.btn_action").click();
        cy.get('[data-test=firstName]').type("Juan");
        cy.get('[data-test=lastName]').type("Rafael");
        cy.get('[data-test=postalCode]').type("ABC34E4");
        cy.get('.btn_primary').click();
        cy.get(".summary_subtotal_label").should("have.text", "Item total: $55.97");
        
        // Thanks you page
        cy.get('.btn_action').click();
        cy.get('.complete-text').should("have.text", "Your order has been dispatched, and will arrive just as fast as the pony can get there!");
    });

    afterEach(() => {
        logout();
    });

});