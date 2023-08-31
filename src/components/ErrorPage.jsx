import { useRouteError } from "react-router-dom"

export default function ErrorPage(){
    const error = useRouteError()
    return (
        <div className="error-container">
        <h1>{error.message}</h1>
        <pre>{error.status} - {error.statusText}</pre>
        </div>
    )
}