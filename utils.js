import { redirect } from "react-router-dom"

export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname
    const isLoggedIn = localStorage.getItem("loggedin")
  
    if (!isLoggedIn) {   
        console.log("redirect")     
        const res =   redirect(`/login?message=You must login first.&redirectTo=${pathname}`)
        res.body = true
        throw res
    }
    return null
}





export function fakeLogOut(){
    localStorage.removeItem("loggedin")
} 