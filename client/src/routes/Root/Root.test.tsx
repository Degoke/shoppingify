import { render, screen } from "../../utils/test-utils"
import Root from "./Root"

const authContextValues = {
    user: "one"
}

describe('Root tests', () => {
    it('Should render', () => {
        render(<Root />, { authContextValues })
        expect(screen.getByText(/one/i)).toBeInTheDocument()
    })
})