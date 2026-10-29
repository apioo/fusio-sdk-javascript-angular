/// <reference lib="webworker" />

addEventListener('message', async ({ data }) => {
  const { salt, targetChallenge, maxNumber } = data;
  const encoder = new TextEncoder();

  let solution: number | null = null;

  for (let i = 0; i <= maxNumber; i++) {
    const bytes = encoder.encode(salt + i);
    const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (hashHex === targetChallenge) {
      solution = i;
      break;
    }
  }

  postMessage({ solution });
});
