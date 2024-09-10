export type CodeSample = 'c' | 'python' | 'rust' | 'go' | 'javascript' | 'java' | 'bash';

export interface AppSettings {
  outputFormat: string;
  codeSample: CodeSample;
  juniorDevMode: boolean;
  partyMode: boolean;
}