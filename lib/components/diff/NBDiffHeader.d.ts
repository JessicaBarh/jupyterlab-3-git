/// <reference types="react" />
import { IDiffContext } from './model';
export interface INBDiffHeaderProps {
    path: string;
    diffContext: IDiffContext;
}
/**
 * A React component to render the header which shows metadata around the diff
 * being rendered. Shows the path to the file and the previous and current ref
 * being used for the diff.
 */
export declare function NBDiffHeader(props: INBDiffHeaderProps): JSX.Element;
