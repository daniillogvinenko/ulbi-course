import { User } from "@/entities/User";
import { selectByTestId } from "cypress/helpers/selectByTestId";

describe("Пользователь заходит на страницу пользователя", () => {
    beforeEach(() => {
        cy.visit("");
        cy.login().then((data: User) => {
            cy.visit(`profile/${data.id}`);
        });
    });
    it("Успешная загрузка профиля", () => {
        cy.get(selectByTestId("ProfileCard.firstname")).should("have.value", "TEST");
    });
    it("И редактирует его", () => {});
});
