import { Widget } from '@lumino/widgets';
/**
 * The UI for the form fields shown within the Clone modal.
 */
export declare class GitCloneForm extends Widget {
    /**
     * Create a redirect form.
     */
    constructor();
    /**
     * Returns the input value.
     */
    getValue(): string;
    private static createFormNode;
}
