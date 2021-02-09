import { PathExt } from '@jupyterlab/coreutils';
/** Get the filename from a path */
export function extractFilename(path) {
    if (path[path.length - 1] === '/') {
        return path;
    }
    else {
        return PathExt.basename(path);
    }
}
export function decodeStage(x, y) {
    // If file is untracked
    if (x === '?' && y === '?') {
        return 'untracked';
    }
    else {
        // If file is staged
        if (x !== ' ') {
            return y !== ' ' ? 'partially-staged' : 'staged';
        }
        // If file is unstaged but tracked
        if (y !== ' ') {
            return 'unstaged';
        }
    }
    return null;
}
/**
 * Returns a promise which resolves after a specified duration.
 *
 * @param ms - duration (in milliseconds)
 * @returns a promise
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//# sourceMappingURL=utils.js.map