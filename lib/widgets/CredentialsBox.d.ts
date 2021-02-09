import { Dialog } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
import { Git } from '../tokens';
/**
 * The UI for the credentials form
 */
export declare class GitCredentialsForm extends Widget implements Dialog.IBodyWidget<Git.IAuth> {
    constructor(textContent?: string, warningContent?: string);
    private createBody;
    /**
     * Returns the input value.
     */
    getValue(): Git.IAuth;
    private _user;
    private _password;
}
