import jwt, { JwtPayload } from "jsonwebtoken";
import crypto from "crypto";

// Generate P-521 key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", { namedCurve: "P-521" });

const PRIVATE_KEY = privateKey.export({ type: "pkcs8", format: "pem" });
const PUBLIC_KEY = publicKey.export({ type: "spki", format: "pem" });

// Sign JWT
export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, PRIVATE_KEY, { algorithm: "ES512", expiresIn: "1h" });
};

// Verify JWT
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, PUBLIC_KEY, { algorithms: ["ES512"] }) as JwtPayload;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null;
  }
};
