import { CellDiffModel, NotebookDiffModel } from 'nbdime/lib/diff/model';
import * as React from 'react';
import { IDiffProps } from './Diff';
export interface ICellDiffProps {
    cellChunk: CellDiffModel[];
    mimeType: string;
}
/**
 * A React component which renders the diff is a single Notebook cell.
 *
 * This uses the NBDime PhosporJS CellDiffWidget internally. To get around the
 * PhosporJS <=> ReactJS barrier, it uses React Refs(https://reactjs.org/docs/refs-and-the-dom.html)
 *
 * During component render, a Ref is created for the ReactDOM and after the component
 * is mounted, the PhosporJS widget is created and attached to the Ref.
 */
export declare class CellDiff extends React.Component<ICellDiffProps> {
    private unAddedOrRemovedRef;
    private addedRef;
    private removedRef;
    private renderMimeRegistry;
    constructor(props: ICellDiffProps);
    componentDidMount(): void;
    render(): JSX.Element;
}
export interface INBDiffState {
    nbdModel: NotebookDiffModel;
    errorMessage: string;
}
/**
 * A React component to render the diff of a single Notebook file.
 *
 * 1. It calls the `/nbdime/api/gitdiff` API on the server to get the diff model
 * 2. Renders the Diff header
 * 3. For each cell, invokes the CellDiff component
 */
export declare class NBDiff extends React.Component<IDiffProps, INBDiffState> {
    constructor(props: IDiffProps);
    componentDidMount(): void;
    render(): JSX.Element;
    /**
     * Based on the Diff Context , calls the server API with the revant parameters
     * to
     * @param diffContext the context in which to perform the diff
     */
    private performDiff;
}
