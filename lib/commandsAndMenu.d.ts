import { JupyterFrontEnd } from '@jupyterlab/application';
import { FileBrowser } from '@jupyterlab/filebrowser';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { CommandRegistry } from '@lumino/commands';
import { Menu } from '@lumino/widgets';
import { GitExtension } from './model';
import { ITranslator } from '@jupyterlab/translation';
/**
 * The command IDs used by the git plugin.
 */
export declare namespace CommandIDs {
    const gitUI = "git:ui";
    const gitTerminalCommand = "git:terminal-command";
    const gitInit = "git:init";
    const gitOpenUrl = "git:open-url";
    const gitToggleSimpleStaging = "git:toggle-simple-staging";
    const gitToggleDoubleClickDiff = "git:toggle-double-click-diff";
    const gitAddRemote = "git:add-remote";
    const gitClone = "git:clone";
    const gitOpenGitignore = "git:open-gitignore";
    const gitPush = "git:push";
    const gitPull = "git:pull";
    const gitFileDiff = "git:context-diff";
    const gitFileDiscard = "git:context-discard";
    const gitFileDelete = "git:context-delete";
    const gitFileOpen = "git:context-open";
    const gitFileUnstage = "git:context-unstage";
    const gitFileStage = "git:context-stage";
    const gitFileTrack = "git:context-track";
    const gitIgnore = "git:context-ignore";
    const gitIgnoreExtension = "git:context-ignoreExtension";
}
/**
 * Add the commands for the git extension.
 */
export declare function addCommands(app: JupyterFrontEnd, model: GitExtension, fileBrowser: FileBrowser, settings: ISettingRegistry.ISettings, renderMime: IRenderMimeRegistry, translator: ITranslator): void;
/**
 * Adds commands and menu items.
 *
 * @private
 * @param app - Jupyter front end
 * @param gitExtension - Git extension instance
 * @param fileBrowser - file browser instance
 * @param settings - extension settings
 * @returns menu
 */
export declare function createGitMenu(commands: CommandRegistry): Menu;
