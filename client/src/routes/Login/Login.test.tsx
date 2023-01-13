import { render, screen, userEvent } from "../../utils/test-utils"
import Login from "./Login"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import routesConfig from "../routes.config"

const authContextValues = {
    user: "one"
}

describe("login page tests", () => {
    const router = createMemoryRouter(routesConfig, {
        initialEntries: ['/login']
    })

    it("snapshot test", () => {
        render(
            <RouterProvider router={router} />,
            { authContextValues }
        )

        expect(screen).toMatchSnapshot()
    })

    it("should render login page", () => {
        render(
            <RouterProvider router={router} />,
            { authContextValues }
        )
        expect(screen.getByRole("heading")).toHaveTextContent(/login/i)
    })

    it("email input should have correct input", async () => {
        render(
            <RouterProvider router={router} />,
            { authContextValues }
        )

        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()

        await userEvent.type(screen.getByPlaceholderText(/email/i), "test@email.com")

        expect(screen.getByPlaceholderText(/email/i)).toHaveValue("test@email.com")
    })

    it("password input should have correct value", async () => {
        render(
            <RouterProvider router={router} />,
            { authContextValues }
        )

        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()

        await userEvent.type(screen.getByPlaceholderText(/password/i), "password")

        expect(screen.getByPlaceholderText(/password/i)).toHaveValue("password")
    })
})