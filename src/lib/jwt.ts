/**
 * Web Crypto JWT Implementation
 * Ringan, cepat, kompatibel 100% dengan Node.js dan Next.js Edge Runtime (middleware)
 * Tanpa external dependencies dan bebas dari modul Node.js yang tidak didukung Edge.
 */

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(str: string): Uint8Array {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSignedToken(
  payload: Record<string, any>,
  secret: string,
  expiresInSeconds = 86400
): Promise<string> {
  const enc = new TextEncoder();
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const fullPayload = { ...payload, exp, iat: Math.floor(Date.now() / 1000) };

  const headerPart = base64UrlEncode(enc.encode(JSON.stringify(header)));
  const payloadPart = base64UrlEncode(enc.encode(JSON.stringify(fullPayload)));
  const signingInput = `${headerPart}.${payloadPart}`;

  const key = await getHmacKey(secret);
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(signingInput)
  );
  const signaturePart = base64UrlEncode(new Uint8Array(signatureBuffer));

  return `${signingInput}.${signaturePart}`;
}

export async function verifySignedToken<T = Record<string, any>>(
  token: string,
  secret: string
): Promise<T | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerPart, payloadPart, signaturePart] = parts;
    const signingInput = `${headerPart}.${payloadPart}`;
    const enc = new TextEncoder();

    const key = await getHmacKey(secret);
    const signatureBytes = base64UrlDecode(signaturePart);

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes as unknown as BufferSource,
      enc.encode(signingInput)
    );

    if (!isValid) return null;

    const payloadJson = new TextDecoder().decode(base64UrlDecode(payloadPart));
    const payload = JSON.parse(payloadJson);

    // Cek kadaluarsa
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
      return null;
    }

    return payload as T;
  } catch {
    return null;
  }
}
