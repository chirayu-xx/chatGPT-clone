export { default } from "next-auth/middleware"

export const config = { matcher: ["/chat/:id*", "/"]}
// matcher: ["/chat/:id*", "/"],