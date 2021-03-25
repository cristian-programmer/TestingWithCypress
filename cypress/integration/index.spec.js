/// <reference types="cypress" />
const URL = "https://www.saucedemo.com/";

const login = () =>{
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
} 

describe("SUIT TEST", () => {
    beforeEach(() => {
        cy.visit(URL)
        login();
    });


    it.skip("should sort products by name Z - A", () => {
        
        cy.get(".product_sort_container").select("za");
    });

    it.skip("should sort products by name A - Z", () => {
       
        cy.get(".product_sort_container").select("az");
    });

    it.skip("should add products to the cart", () => {
      
        cy.get(".inventory_item button").eq(0).click();
        cy.get(".fa-layers-counter.shopping_cart_badge").should("have.text", "1");
        cy.get(".inventory_item button").eq(1).click();
        cy.get(".fa-layers-counter.shopping_cart_badge").should("have.text", "2");
        cy.get(".inventory_item button").eq(2).click();
        cy.get(".fa-layers-counter.shopping_cart_badge").should("have.text", "3");
    });

    it.skip("should remove products to the cart", ()=>{
        
        cy.get(":nth-child(4) > .pricebar > .btn_primary").click();
        cy.get(".fa-layers-counter.shopping_cart_badge").should("have.text", "1");
        cy.get(":nth-child(4) > .pricebar > .btn_secondary").click();
        cy.get(".fa-layers-counter.shopping_cart_badge").should("have.length", "0");
    });

    it("shoud remove products to the cart part in other view", () => {
        cy.get(".inventory_item button").eq(0).click();
        cy.get(".fa-layers-counter.shopping_cart_badge").should("have.text", "1");
        cy.get(".inventory_item button").eq(1).click();
        cy.get(".fa-layers-counter.shopping_cart_badge").should("have.text", "2");
        cy.get(".inventory_item button").eq(2).click();
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


});