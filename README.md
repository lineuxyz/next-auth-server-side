# next-auth-server-side: SSR Authentication Helper

`Next auth server side` is a library designed to facilitate server-side rendered authentication with Next.js. It helps developers handle authentication tokens, catch request errors, and manage redirections seamlessly.

## Installation

To install the library:

#### NPM

```
npm install @lineuxyz/next-auth-server-side --save
```
#### Yarn

```
yarn add @lineuxyz/next-auth-server-side --save
```

## Usage

Here's a practical example of how to use the library:

```typescript
import { serverSideAuthenticated } from "@lineuxyz/next-auth-server-side";

export const getServerSideProps = serverSideAuthenticated(
  async () => {
    const response = await axios.get('/your-path')
    return { props: { yourData: response } };
  },
  {
    cookieName: "your-cookie-name",
    // Other configuration options...
  }
);
```

## Configuration Properties

<table border="1" cellspacing="0" cellpadding="5">
    <thead>
        <tr>
            <th>Property Name</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>cookieName</td>
            <td>Yes</td>
            <td>Name of the cookie that contains the token.</td>
        </tr>
        <tr>
            <td>tokenFailed</td>
            <td>No</td>
            <td>Configuration for redirection when token retrieval fails. Details below.</td>
        </tr>
        <tr>
            <td>requestFailed</td>
            <td>No</td>
            <td>Configuration for redirection when a request fails. Details below.</td>
        </tr>
    </tbody>
</table>

### tokenFailed & requestFailed Details

<table border="1" cellspacing="0" cellpadding="5">
    <thead>
        <tr>
            <th>Property Name</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>destinationUrl</td>
            <td>/</td>
            <td>Redirect URL.</td>
        </tr>
        <tr>
            <td>isPermanent</td>
            <td>false</td>
            <td>Whether the redirection is permanent.</td>
        </tr>
        <tr>
            <td>statusCode</td>
            <td>-</td>
            <td>HTTP status code for redirection (e.g., `302`).</td>
        </tr>
    </tbody>
</table>

## Contributing

We welcome contributions from developers! If you'd like to contribute, here's how you can get started:

1. **Fork the Repository**: Fork the `@lineuxyz/next-auth-server-side` repository to your own GitHub account.
2. **Clone the Forked Repository**: Clone your fork locally on your machine.
3. **Install Dependencies**: Navigate to the project root and run `npm install` or `yarn add`.
4. **Make Your Changes**: Implement your features or fixes.
5. **Test Your Changes**: Ensure that your changes do not introduce any bugs.
6. **Submit a Pull Request**: Once done, push your changes to your fork on GitHub and submit a pull request.

## License

[MIT](LICENSE)
