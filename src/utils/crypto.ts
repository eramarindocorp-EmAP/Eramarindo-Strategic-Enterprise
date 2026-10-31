/**
 * End-to-End Cryptography Engine using Web Crypto API (AES-GCM 256-bit & SHA-256)
 */

export interface EncryptedPayload {
  ciphertext: string; // Base64
  iv: string; // Base64
  salt: string; // Base64
  hash: string; // SHA-256 digest
  timestamp: number;
}

// Helper: ArrayBuffer to Base64
export function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Helper: Base64 to ArrayBuffer
export function base64ToBuffer(base64: string): ArrayBuffer {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// Generate SHA-256 checksum for audit & tamper-proof verification
export async function generateSHA256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Derive AES-GCM Key from passphrase or master secret
async function deriveKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as unknown as BufferSource,
      iterations: 100000,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

// Encrypt plain text using AES-256-GCM
export async function encryptData(plainText: string, secretKey: string = 'EMAP-ENTERPRISE-VAULT-2026'): Promise<EncryptedPayload> {
  const encoder = new TextEncoder();
  const encodedText = encoder.encode(plainText);

  // Generate random 16-byte salt and 12-byte IV for AES-GCM
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const cryptoKey = await deriveKey(secretKey, salt);

  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    cryptoKey,
    encodedText
  );

  const hash = await generateSHA256(plainText);

  return {
    ciphertext: bufferToBase64(encryptedBuffer),
    iv: bufferToBase64(iv.buffer),
    salt: bufferToBase64(salt.buffer),
    hash,
    timestamp: Date.now(),
  };
}

// Decrypt ciphertext using AES-256-GCM
export async function decryptData(payload: EncryptedPayload, secretKey: string = 'EMAP-ENTERPRISE-VAULT-2026'): Promise<string> {
  try {
    const salt = new Uint8Array(base64ToBuffer(payload.salt));
    const iv = new Uint8Array(base64ToBuffer(payload.iv));
    const ciphertext = base64ToBuffer(payload.ciphertext);

    const cryptoKey = await deriveKey(secretKey, salt);

    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      cryptoKey,
      ciphertext
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  } catch (error) {
    throw new Error('Gagal mendekripsi data: Kunci sandi tidak valid atau data rusak.');
  }
}
