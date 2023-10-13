import { GetServerSideProps } from "next";
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
export interface ConfigProps {
    cookieName: string;
    tokenFailed?: TokenFailedProps;
    requestFailed?: RequestFailedProps;
}
export declare function serverSideAuthenticated<P extends {
    [key: string]: unknown;
}>(fn: GetServerSideProps<P>, { cookieName, requestFailed, tokenFailed }: ConfigProps): GetServerSideProps;
