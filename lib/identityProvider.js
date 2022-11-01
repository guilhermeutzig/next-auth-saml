import fs from "fs-extra";
import { IdentityProvider } from "saml2-js";

const directory = path.resolve(process.cwd(), "certs");
const idp_key = path.join(directory, "idp_key.pem");

export const identityProvider = new IdentityProvider({
  sso_login_url: "https://sso.jumpcloud.com/saml2/sso_test",
  certificates: [fs.readFileSync(idp_key).toString()],
});
