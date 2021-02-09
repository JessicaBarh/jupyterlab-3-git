import * as React from 'react';
import { ListChildComponentProps } from 'react-window';
import { Git } from '../tokens';
/**
 * Git stage component properties
 */
export interface IGitStageProps {
    /**
     * Actions component to display at the far right of the stage
     */
    actions: React.ReactElement;
    /**
     * Is this group collapsible
     */
    collapsible?: boolean;
    /**
     * Files in the group
     */
    files: Git.IStatusFile[];
    /**
     * Group title
     */
    heading: string;
    /**
     * HTML element height
     */
    height: number;
    /**
     * Row renderer
     */
    rowRenderer: (props: ListChildComponentProps) => JSX.Element;
}
export declare const GitStage: React.FunctionComponent<IGitStageProps>;
