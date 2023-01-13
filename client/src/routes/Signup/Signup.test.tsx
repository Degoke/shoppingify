import { render, screen, userEvent } from "../../utils/test-utils"
import Signup from "./Signup"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import routesConfig from "../routes.config"

const authContextValues = {
    user: "one"
}


describe("signup page tests", () => {
    const router = createMemoryRouter(routesConfig, {
        initialEntries: ['/signup']
    })

    it("snapshot test", () => {
        render(
            <RouterProvider router={router} />,
            { authContextValues }
        )

        expect(screen).toMatchSnapshot()
    })
    
    it("should render signup page", () => {
        render(
            <RouterProvider router={router} />,
            { authContextValues }
        )

        expect(screen.getByRole("heading")).toHaveTextContent(/signup/i)
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