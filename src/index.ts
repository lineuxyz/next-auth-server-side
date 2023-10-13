import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { destroyCookie, parseCookies } from "nookies";

export interface TokenFailedProps {
  destinationUrl: string;
  isPermanent: boolean;
  statusCode: 301 | 302 | 303 | 307 | 308;
}

export interface RequestFailedProps {
  destinationUrl: string;
  isPermanent: boolean;
  statusCode: 301 | 302 | 303 | 307 | 308;
}

/**
 * Configuration options for the `serverSideAuthenticated` function.
 */
export interface ConfigProps {
  /** Name of the cookie that contains the token. */
  cookieName: string;
  /** Configuration for redirection when token retrieval fails. */
  tokenFailed?: TokenFailedProps;
  /** Configuration for redirection when a request fails. */
  requestFailed?: RequestFailedProps;
}

/**
 * Wrapper function for authenticated server-side rendering in Next.js.
 * 
 * @param fn - The original `getServerSideProps` function.
 * @param config - Configuration options for handling authentication and redirection.
 * 
 * @returns A new `getServerSideProps` function with authentication and error handling.
 */

export function serverSideAuthenticated<P extends { [key: string]: unknown }>(
  fn: GetServerSideProps<P>,
  { cookieName, requestFailed, tokenFailed }: ConfigProps
): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies[cookieName];
    if (!token) {
      return {
        redirect: {
          destination: tokenFailed?.destinationUrl ?? '/',
          permanent: tokenFailed?.isPermanent ?? false,
          statusCode: tokenFailed?.statusCode,
        },
      };
    }

    try {
      return await fn(ctx);
    } catch (error) {
      destroyCookie(ctx, cookieName);
      return {
        redirect: {
          destination: requestFailed?.destinationUrl ?? '/',
          permanent: requestFailed?.isPermanent ?? false,
          statusCode: requestFailed?.statusCode,
        },
      };
    }
  };
}
