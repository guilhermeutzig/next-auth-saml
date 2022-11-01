import fs from "fs-extra";
import { IdentityProvider } from "saml2-js";

console.log(fs.readFileSync("certs/idp_key.pem").toString());

export const identityProvider = new IdentityProvider({
  sso_login_url: "https://sso.jumpcloud.com/saml2/sso_test",
  certificates: [fs.readFileSync("certs/idp_key.pem").toString()],
});
