import { ParsedInstruction } from '@solana/web3.js';

const PROTOCOLS = [
  { name: 'Jupiter', programIds: ['JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4', 'JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB'] },
  { name: 'Raydium', programIds: ['675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8', '4ckmDgGzLYLyWsi1N7eae3j4iTjH7WJxgYtxghhNp9oU', '9KEPoZmtHUrBbhWN1v1KWLMkkvwY6WLtAVUCPRtRjP4z', 'RVKd61ztZW9GdKzvKQC5bQKBjnjDgf7q5pY5kEm1iof'] }, // Raydium program ID
  { name: 'Orca', programIds: ['whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc', 'nQn3kYJYt6QK1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1', 'nDEXnBZmzYAM2FA1QW5L6p4xYPz5fTTHZcBv9RtZRH6', '82yxjeMsbaUR9zdc8J6r2t9KWg4hCoJjYK6WGsYRnQoS'] }, //  Orca program ID
  { name: 'Saber', programIds: ['SSwpkEEcbUqx4vtoEByFjSkhKdCT862DNVb52nZg1UZ'] }
];

export function detectProtocol(instructions: ParsedInstruction[]): string {
  for (const protocol of PROTOCOLS) {
    if (instructions.some((ix) => protocol.programIds.includes(ix.programId.toString()))) {
      return protocol.name;
    }
  }
  return 'Others';
} 