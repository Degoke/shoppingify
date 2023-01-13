import { cleanup, render } from "@testing-library/react"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import { afterEach, vi } from 'vitest'
import { AuthContext, AuthProvider } from "../context/auth.context"

afterEach(() => {
    cleanup()
})

// vi.mock('react-router-dom', async () => {
//     const actual = await vi.importActual('react-router-dom') as any
//     const useRouteError = vi.fn() 
//     const useNavigate = vi.fn()
//     const useLocation = vi.fn()
//     const useSubmit = vi.fn()
//     const Form = ({ children, ...props }: { children: React.ReactElement}) => {
//         <form {...props}>
//             {children}
//         </form>
//     }

//     return {
//         ...actual,
//         useRouteError,
//         useNavigate,
//         useLocation,
//         useSubmit,
//         Form
//     }
// })

const customRender = (ui: React.ReactElement, options: any = {}) => {
    render(<AuthContext.Provider value={options.authContextValues}>
            {ui}
        </AuthContext.Provider>, {
        wrapper: ({ children }) => children, ...options
    })
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
export { customRender as render }