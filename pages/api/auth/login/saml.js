import axios from "axios";

export default async (req, res) => {
  res.send("here");

  // const createLoginRequestUrl = (identityProvider, options = {}) =>
  //   new Promise((resolve, reject) => {
  //     serviceProvider.create_login_request_url(
  //       identityProvider,
  //       options,
  //       (error, loginUrl) => {
  //         if (error) {
  //           reject(error);
  //         }
  //         resolve(loginUrl);
  //       }
  //     );
  //   });

  // try {
  //   const loginUrl = await createLoginRequestUrl(identityProvider);
  //   return res.redirect(loginUrl);
  // } catch (error) {
  //   console.error(error);
  //   return res.sendStatus(500);
  // }
};
