// src/app/resume/ClientResumePage.tsx
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// ← Your secret passphrase
const DEFAULT_PASS = 'amara';

async function deriveKey(pass: string, salt: Uint8Array) {
  const enc = new TextEncoder();
  const base = await crypto.subtle.importKey(
    'raw',
    enc.encode(pass),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100_000, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function encryptText(plaintext: string) {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(DEFAULT_PASS, salt);
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plaintext));
  return {
    ciphertext: Buffer.from(ct).toString('base64'),
    iv: Buffer.from(iv).toString('base64'),
    salt: Buffer.from(salt).toString('base64'),
  };
}

async function decryptText(data: { ciphertext: string; iv: string; salt: string }) {
  const dec = new TextDecoder();
  const saltArr = Uint8Array.from(atob(data.salt), (c) => c.charCodeAt(0));
  const ivArr = Uint8Array.from(atob(data.iv),   (c) => c.charCodeAt(0));
  const ctArr = Uint8Array.from(atob(data.ciphertext), (c) => c.charCodeAt(0));
  const key   = await deriveKey(DEFAULT_PASS, saltArr);
  const pt    = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivArr }, key, ctArr);
  return dec.decode(pt);
}

export default function ClientResumePage() {
  const [authorized,  setAuthorized]  = useState(false);
  const [gatePass,    setGatePass]    = useState('');
  const [text,        setText]        = useState('');
  const [resume,      setResume]      = useState('');
  const [loading,     setLoading]     = useState(false);
  const [decrypting,  setDecrypting]  = useState(false);
  const [createdLink, setCreatedLink] = useState<string | null>(null);
  const [history,     setHistory]     = useState<string[]>([]);

  const params = useSearchParams();
  const router = useRouter();
  const idParam = params.get('id');

  // Load history after unlock
  useEffect(() => {
    if (!authorized) return;
    const stored = localStorage.getItem('resumeHistory');
    if (stored) {
      try { setHistory(JSON.parse(stored)); } catch {}
    }
  }, [authorized]);

  // Fetch & decrypt when ?id= present
  useEffect(() => {
    if (!authorized || !idParam) return;
    setDecrypting(true);
    fetch(`/api/resume?id=${idParam}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(decryptText)
      .then(setResume)
      .catch(() => setResume('❌ Could not decrypt'))
      .finally(() => setDecrypting(false));
  }, [authorized, idParam]);

  const createResume = async () => {
    setLoading(true);
    const payload = await encryptText(text);
    const res = await fetch('/api/resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const { id } = await res.json();
    const link = `${window.location.origin}/resume?id=${id}`;
    setCreatedLink(link);

    const newHist = [id, ...history.filter((h) => h !== id)].slice(0, 10);
    setHistory(newHist);
    localStorage.setItem('resumeHistory', JSON.stringify(newHist));
    setLoading(false);
  };

  const copyAll  = () => navigator.clipboard.writeText(idParam ? resume : text);
  const copyLink = () => createdLink && navigator.clipboard.writeText(createdLink);

  // Passcode gate
  if (!authorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-16">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-4 text-center">Enter Access Code</h2>
          <input
            type="password"
            placeholder="Passcode"
            value={gatePass}
            onChange={(e) => setGatePass(e.target.value)}
            className="w-full border rounded p-2 mb-4"
          />
          <button
            onClick={() => gatePass === DEFAULT_PASS && setAuthorized(true)}
            disabled={!gatePass}
            className="w-full py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700"
          >
            Unlock
          </button>
        </div>
      </div>
    );
  }

  // Main UI
  return (
    <div className="max-w-xl mx-auto mt-16 bg-white shadow rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        {idParam ? 'View Secure Resume' : 'Create Secure Resume'}
      </h2>

      {/* recent history */}
      {!idParam && history.length > 0 && (
        <div className="space-y-2">
          <p className="font-medium">Recent Resumes:</p>
          <div className="flex flex-wrap gap-2">
            {history.map((h) => (
              <button
                key={h}
                onClick={() => router.push(`/resume?id=${h}`)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-mono text-sm"
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* view mode */}
      {idParam ? (
        decrypting ? (
          <p className="italic text-center">Decrypting…</p>
        ) : (
          <>
            <textarea
              readOnly
              value={resume}
              rows={10}
              className="w-full border rounded p-3 font-mono text-sm"
            />
            <button
              onClick={copyAll}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Copy Decrypted
            </button>
          </>
        )
      ) : (
        /* create mode */
        <>
          <textarea
            placeholder="Enter your resume here…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            className="w-full border rounded p-3 font-mono text-sm"
          />
          {createdLink ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">🎉 Your secure link:</p>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={createdLink}
                  className="flex-1 border rounded p-2 font-mono text-sm"
                />
                <button
                  onClick={copyLink}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Copy Link
                </button>
                <a
                  href={createdLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Open
                </a>
              </div>
              <button
                onClick={() => {
                  setCreatedLink(null);
                  setText('');
                }}
                className="text-sm text-red-500 hover:underline"
              >
                New Resume
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={createResume}
                disabled={loading || !text.trim()}
                className="flex-1 py-2 bg-green-600 text-white rounded disabled:opacity-50 hover:bg-green-700"
              >
                {loading ? 'Encrypting…' : 'Create & Encrypt'}
              </button>
              <button
                onClick={copyAll}
                disabled={!text.trim()}
                className="flex-1 py-2 bg-gray-600 text-white rounded disabled:opacity-50 hover:bg-gray-700"
              >
                Copy Locally
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
