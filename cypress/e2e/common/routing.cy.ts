import { selectByTestId } from "../../helpers/selectByTestId";

describe("Роутинг", () => {
    describe("Пользователь НЕ авторизован", () => {
        it("Переход на главную", () => {
            cy.visit("/");
            cy.get(selectByTestId("MainPage")).should("exist");
        });
        it("Переход открывает страницу профиля", () => {
            cy.visit("/profile/1");
            // должен произойти редирект на главную
            cy.get(selectByTestId("MainPage")).should("exist");
        });
        it("Переход открывает несуществующий маршрут", () => {
            cy.visit("/prof26262");
            cy.get(selectByTestId("NotFoundPage")).should("exist");
        });
    });
    describe("Пользователь авторизован", () => {
        beforeEach(() => {
            cy.login("admin", "123");
        });
        it("Переход открывает страницу профиля", () => {
            cy.visit("/profile/1");
            // должен произойти редирект на главную
            cy.get(selectByTestId("ProfilePage")).should("exist");
        });
        it("Переход на страницу со списком статей", () => {
            cy.visit("/articles");
            // должен произойти редирект на главную
            cy.get(selectByTestId("ArticlesPage")).should("exist");
        });
    });
});
