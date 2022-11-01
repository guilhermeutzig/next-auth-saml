import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { identityProvider } from "../../../lib/identityProvider";
import { serviceProvider } from "../../../lib/serviceProvider";

console.log("nextauth 1 passou");

export default NextAuth({
  providers: [
    Providers.Credentials({
      id: "saml",
      name: "SAML",
      authorize: async ({ samlBody }) => {
        samlBody = JSON.parse(decodeURIComponent(samlBody));

        const postAssert = (identityProvider, samlBody) =>
          new Promise((resolve, reject) => {
            serviceProvider.post_assert(
              identityProvider,
              {
                request_body: samlBody,
              },
              (error, response) => {
                if (error) {
                  reject(error);
                }

                console.log("nextauth 2 passou");
                resolve(response);
              }
            );
          });

        try {
          const { user } = await postAssert(identityProvider, samlBody);
          console.log("nextauth 3 passou");
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: (token, user) => {
      if (user) {
        return {
          user,
        };
      }

      return token;
    },
    session: (session, { user }) => {
      return {
        ...session,
        user,
      };
    },
  },
});
