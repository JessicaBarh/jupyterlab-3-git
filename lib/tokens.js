import { ServerConnection } from '@jupyterlab/services';
import { Token } from '@lumino/coreutils';
export const EXTENSION_ID = 'jupyter.extensions.git_plugin';
export const IGitExtension = new Token(EXTENSION_ID);
export var Git;
(function (Git) {
    /**
     * A wrapped error for a fetch response.
     */
    class GitResponseError extends ServerConnection.ResponseError {
        /**
         * Create a new response error.
         */
        constructor(response, message = `Invalid response: ${response.status} ${response.statusText}`, traceback = '', json = {}) {
            super(response, message);
            this.traceback = traceback; // traceback added in mother class in 2.2.x
            this._json = json;
        }
        /**
         * The error response JSON body
         */
        get json() {
            return this._json;
        }
    }
    Git.GitResponseError = GitResponseError;
    class NotInRepository extends Error {
        constructor() {
            super('Not in a Git Repository');
        }
    }
    Git.NotInRepository = NotInRepository;
})(Git || (Git = {}));
/**
 * Log message severity.
 */
export var Level;
(function (Level) {
    Level[Level["SUCCESS"] = 10] = "SUCCESS";
    Level[Level["INFO"] = 20] = "INFO";
    Level[Level["RUNNING"] = 30] = "RUNNING";
    Level[Level["WARNING"] = 40] = "WARNING";
    Level[Level["ERROR"] = 50] = "ERROR";
})(Level || (Level = {}));
//# sourceMappingURL=tokens.js.map