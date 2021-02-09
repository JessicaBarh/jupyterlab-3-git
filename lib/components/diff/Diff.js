import { PathExt } from '@jupyterlab/coreutils';
import * as React from 'react';
import { NBDiff } from './NbDiff';
import { PlainTextDiff } from './PlainTextDiff';
/**
 * A registry which maintains mappings of file extension to diff provider components.
 */
const DIFF_PROVIDER_REGISTRY = {
    '.ipynb': NBDiff
};
/**
 * Determines if a given file is supported for diffs.
 *
 * @param path the file path
 */
export function isDiffSupported(path) {
    return PathExt.extname(path).toLocaleLowerCase() in DIFF_PROVIDER_REGISTRY;
}
/**
 * The parent diff component which maintains a registry of various diff providers.
 * Based on the extension of the file, it delegates to the relevant diff provider.
 */
export function Diff(props) {
    const fileExtension = PathExt.extname(props.path).toLocaleLowerCase();
    if (fileExtension in DIFF_PROVIDER_REGISTRY) {
        const DiffProvider = DIFF_PROVIDER_REGISTRY[fileExtension];
        return React.createElement(DiffProvider, Object.assign({}, props));
    }
    else {
        // Fallback to plain text diff
        try {
            return React.createElement(PlainTextDiff, Object.assign({}, props));
        }
        catch (error) {
            console.log(`Unable to render diff view for ${props.path}:\n${error}`);
            return null;
        }
    }
}
const renderMimeContext = React.createContext(null);
export const RenderMimeProvider = renderMimeContext.Provider;
export const RenderMimeConsumer = renderMimeContext.Consumer;
//# sourceMappingURL=Diff.js.map