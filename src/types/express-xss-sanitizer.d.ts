declare module 'express-xss-sanitizer' {
    import { RequestHandler } from 'express'

    interface XssSanitizerOptions {
        allowedTags?: string[]
        allowedAttributes?: Record<string, string[]>
        allowedSchemes?: string[]
    }

    export function xss(options?: XssSanitizerOptions): RequestHandler
}
