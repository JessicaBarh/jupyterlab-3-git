import * as React from 'react';
/**
 * Interface describing component properties.
 */
export interface ICommitBoxProps {
    /**
     * Boolean indicating whether files currently exist which have changes to commit.
     */
    hasFiles: boolean;
    /**
     * Callback to invoke in order to commit changes.
     *
     * @param msg - commit message
     * @returns a promise which commits changes
     */
    onCommit: (msg: string) => Promise<void>;
}
/**
 * Interface describing component state.
 */
export interface ICommitBoxState {
    /**
     * Commit message summary.
     */
    summary: string;
    /**
     * Commit message description.
     */
    description: string;
}
/**
 * React component for entering a commit message.
 */
export declare class CommitBox extends React.Component<ICommitBoxProps, ICommitBoxState> {
    /**
     * Returns a React component for entering a commit message.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props: ICommitBoxProps);
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render(): React.ReactElement;
    /**
     * Callback invoked upon clicking a commit message submit button.
     *
     * @param event - event object
     */
    private _onCommitClick;
    /**
     * Callback invoked upon updating a commit message description.
     *
     * @param event - event object
     */
    private _onDescriptionChange;
    /**
     * Callback invoked upon updating a commit message summary.
     *
     * @param event - event object
     */
    private _onSummaryChange;
    /**
     * Callback invoked upon a `'keypress'` event when entering a commit message summary.
     *
     * ## Notes
     *
     * -   Prevents triggering a `'submit'` action when hitting the `ENTER` key while entering a commit message summary.
     *
     * @param event - event object
     */
    private _onSummaryKeyPress;
    /**
     * Resets component state (e.g., in order to re-initialize the commit message input box).
     */
    private _reset;
}
