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
function serverSideAuthenticated(fn, { cookieName, requestFailed, tokenFailed }) {
    return (ctx) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const cookies = (0, nookies_1.parseCookies)(ctx);
        const token = cookies[cookieName];
        // if (!token) {
        //   return {
        //     redirect: {
        //       destination: tokenFailed?.destinationUrl ?? '/',
        //       permanent: tokenFailed?.isPermanent ?? false,
        //       statusCode: tokenFailed?.statusCode,
        //     },
        //   };
        // }
        console.log(token, 'token');
        console.log(fn, 'fn');
        try {
            console.log('Caiu no await');
            return yield fn(ctx);
        }
        catch (error) {
            console.log(error, 'error catch in lib');
            (0, nookies_1.destroyCookie)(ctx, cookieName);
            return {
                redirect: {
                    destination: (_a = requestFailed === null || requestFailed === void 0 ? void 0 : requestFailed.destinationUrl) !== null && _a !== void 0 ? _a : '/',
                    permanent: (_b = requestFailed === null || requestFailed === void 0 ? void 0 : requestFailed.isPermanent) !== null && _b !== void 0 ? _b : false,
                    statusCode: requestFailed === null || requestFailed === void 0 ? void 0 : requestFailed.statusCode,
                },
            };
        }
    });
}
exports.serverSideAuthenticated = serverSideAuthenticated;
