"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverSideAuthenticated = void 0;
const nookies_1 = require("nookies");
/**
 * Wrapper function for authenticated server-side rendering in Next.js.
 *
 * @param fn - The original `getServerSideProps` function.
 * @param config - Configuration options for handling authentication and redirection.
 *
 * @returns A new `getServerSideProps` function with authentication and error handling.
 */
function serverSideAuthenticated(fn, { cookieName, requestFailed, tokenFailed }) {
    return (ctx) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const cookies = (0, nookies_1.parseCookies)(ctx);
        const token = cookies[cookieName];
        if (!token) {
            return {
                redirect: {
                    destination: (_a = tokenFailed === null || tokenFailed === void 0 ? void 0 : tokenFailed.destinationUrl) !== null && _a !== void 0 ? _a : '/',
                    permanent: (_b = tokenFailed === null || tokenFailed === void 0 ? void 0 : tokenFailed.isPermanent) !== null && _b !== void 0 ? _b : false,
                    statusCode: tokenFailed === null || tokenFailed === void 0 ? void 0 : tokenFailed.statusCode,
                },
            };
        }
        try {
            return yield fn(ctx);
        }
        catch (error) {
            (0, nookies_1.destroyCookie)(ctx, cookieName);
            return {
                redirect: {
                    destination: (_c = requestFailed === null || requestFailed === void 0 ? void 0 : requestFailed.destinationUrl) !== null && _c !== void 0 ? _c : '/',
                    permanent: (_d = requestFailed === null || requestFailed === void 0 ? void 0 : requestFailed.isPermanent) !== null && _d !== void 0 ? _d : false,
                    statusCode: requestFailed === null || requestFailed === void 0 ? void 0 : requestFailed.statusCode,
                },
            };
        }
    });
}
exports.serverSideAuthenticated = serverSideAuthenticated;
