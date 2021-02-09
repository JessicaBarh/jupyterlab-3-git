import { Git } from './tokens';
/** Get the filename from a path */
export declare function extractFilename(path: string): string;
export declare function decodeStage(x: string, y: string): Git.Status;
/**
 * Returns a promise which resolves after a specified duration.
 *
 * @param ms - duration (in milliseconds)
 * @returns a promise
 */
export declare function sleep(ms: number): Promise<unknown>;
