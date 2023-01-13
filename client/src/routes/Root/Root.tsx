import { useAuth } from "../../context/auth.context"

export default function Root() {
    const auth = useAuth()
    console.log(auth.user)
    return (
        <div>
            <h1>Hello {auth?.user}</h1>
        </div>
    )
}