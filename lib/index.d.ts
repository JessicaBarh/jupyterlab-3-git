import { JupyterFrontEndPlugin } from '@jupyterlab/application';
import { IGitExtension } from './tokens';
export { Git, IGitExtension } from './tokens';
/**
 * The default running sessions extension.
 */
declare const plugin: JupyterFrontEndPlugin<IGitExtension>;
/**
 * Export the plugin as default.
 */
export default plugin;
