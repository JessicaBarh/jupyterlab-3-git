import * as React from 'react';
import { IDiffProps } from './Diff';
export interface IPlainTextDiffState {
    errorMessage: string;
}
/**
 * A React component to render the diff of a plain text file
 *
 * 1. It calls the `diffcontent` API on the server to get the previous and current content
 * 2. Renders the content using CodeMirror merge addon
 */
export declare class PlainTextDiff extends React.Component<IDiffProps, IPlainTextDiffState> {
    constructor(props: IDiffProps);
    componentDidMount(): void;
    render(): JSX.Element;
    /**
     * Based on the Diff Context , calls the server API with the relevant parameters
     * to
     * @param diffContext the context in which to perform the diff
     */
    private _performDiff;
    /**
     * Creates and adds a diff viewer to the DOM with given content
     *
     * @param prevContent the raw value of the previous content
     * @param currContent the raw value of the current content
     */
    private _addDiffViewer;
    private _mergeViewRef;
}
