export const MockForm = ({ children, ...props }: { children: JSX.Element}) => {
    <form {...props}>
        {children}
    </form>
}