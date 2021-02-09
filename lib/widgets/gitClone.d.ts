import { FileBrowser } from '@jupyterlab/filebrowser';
import { CommandRegistry } from '@lumino/commands';
import { IGitExtension } from '../tokens';
export declare function addCloneButton(model: IGitExtension, filebrowser: FileBrowser, commands: CommandRegistry): void;
