import axios from "axios";

import { identityProvider } from "../../../../lib/identityProvider";
import { serviceProvider } from "../../../../lib/serviceProvider";

console.log("saml 1 passou");

export default async (req, res) => {
  if (req.method === "POST") {
    const { data, headers } = await axios.get("/api/auth/csrf", {
      baseURL: "https://next-auth-saml-tlry.vercel.app",
    });
    console.log("saml 2 passou");
    const { csrfToken } = data;

    const encodedSAMLBody = encodeURIComponent(JSON.stringify(req.body));

    res.setHeader("set-cookie", headers["set-cookie"] ?? "");
    console.log("saml 3 passou");
    return res.send(
      `<html>
        <body>
          <form action="/api/auth/callback/saml" method="POST">
            <input type="hidden" name="csrfToken" value="${csrfToken}"/>
            <input type="hidden" name="samlBody" value="${encodedSAMLBody}"/>
          </form>
          <script>
            document.forms[0].submit();
          </script>
        </body>
      </html>`
    );
  }

  console.log("saml 4 passou");

  const createLoginRequestUrl = (identityProvider, options = {}) =>
    new Promise((resolve, reject) => {
      serviceProvider.create_login_request_url(
        identityProvider,
        options,
        (error, loginUrl) => {
          if (error) {
            reject(error);
          }
          resolve(loginUrl);
        }
      );
    });

  console.log("saml 5 passou");

  try {
    const loginUrl = await createLoginRequestUrl(identityProvider);
    console.log("saml 6 passou");
    return res.redirect(loginUrl);
  } catch (error) {
    console.error(error);
    console.log("saml 7 passou");
    return res.sendStatus(500);
  }
};
