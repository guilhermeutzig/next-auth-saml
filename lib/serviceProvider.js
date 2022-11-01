import fs from "fs-extra";
import path from "path";
import { ServiceProvider } from "saml2-js";

const directory = path.resolve(process.cwd(), "certs");
const private_key = path.join(directory, "key.pem");
const certificate = path.join(directory, "cert.pem");

console.log("private_key", private_key);
console.log("certificate", certificate);

export const serviceProvider = new ServiceProvider({
  entity_id: "sso_test",
  private_key: fs.readFileSync(private_key).toString(),
  certificate: fs.readFileSync(certificate).toString(),
  assert_endpoint: "https://next-auth-saml-tlry.vercel.app/api/auth/login/saml",
  allow_unencrypted_assertion: true,
});
