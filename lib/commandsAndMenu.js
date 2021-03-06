import { Dialog, InputDialog, ReactWidget, showDialog, showErrorMessage } from '@jupyterlab/apputils';
import { PathExt } from '@jupyterlab/coreutils';
import { Menu } from '@lumino/widgets';
import * as React from 'react';
import { Diff, isDiffSupported, RenderMimeProvider } from './components/diff/Diff';
import { getRefValue } from './components/diff/model';
import { AUTH_ERROR_MESSAGES } from './git';
import { logger } from './logger';
import { diffIcon } from './style/icons';
import { Level } from './tokens';
import { GitCredentialsForm } from './widgets/CredentialsBox';
import { GitCloneForm } from './widgets/GitCloneForm';
const RESOURCES = [
    {
        text: 'Set Up Remotes',
        url: 'https://www.atlassian.com/git/tutorials/setting-up-a-repository'
    },
    {
        text: 'Git Documentation',
        url: 'https://git-scm.com/doc'
    }
];
/**
 * Git operations requiring authentication
 */
var Operation;
(function (Operation) {
    Operation["Clone"] = "Clone";
    Operation["Pull"] = "Pull";
    Operation["Push"] = "Push";
})(Operation || (Operation = {}));
/**
 * The command IDs used by the git plugin.
 */
export var CommandIDs;
(function (CommandIDs) {
    CommandIDs.gitUI = 'git:ui';
    CommandIDs.gitTerminalCommand = 'git:terminal-command';
    CommandIDs.gitInit = 'git:init';
    CommandIDs.gitOpenUrl = 'git:open-url';
    CommandIDs.gitToggleSimpleStaging = 'git:toggle-simple-staging';
    CommandIDs.gitToggleDoubleClickDiff = 'git:toggle-double-click-diff';
    CommandIDs.gitAddRemote = 'git:add-remote';
    CommandIDs.gitClone = 'git:clone';
    CommandIDs.gitOpenGitignore = 'git:open-gitignore';
    CommandIDs.gitPush = 'git:push';
    CommandIDs.gitPull = 'git:pull';
    // Context menu commands
    CommandIDs.gitFileDiff = 'git:context-diff';
    CommandIDs.gitFileDiscard = 'git:context-discard';
    CommandIDs.gitFileDelete = 'git:context-delete';
    CommandIDs.gitFileOpen = 'git:context-open';
    CommandIDs.gitFileUnstage = 'git:context-unstage';
    CommandIDs.gitFileStage = 'git:context-stage';
    CommandIDs.gitFileTrack = 'git:context-track';
    CommandIDs.gitIgnore = 'git:context-ignore';
    CommandIDs.gitIgnoreExtension = 'git:context-ignoreExtension';
})(CommandIDs || (CommandIDs = {}));
/**
 * Add the commands for the git extension.
 */
export function addCommands(app, model, fileBrowser, settings, renderMime, translator) {
    const { commands, shell } = app;
    const trans = translator.load('jupyterlab');
    /**
     * Add open terminal in the Git repository
     */
    commands.addCommand(CommandIDs.gitTerminalCommand, {
        label: trans.__('Open Git Repository in Terminal'),
        caption: trans.__('Open a New Terminal to the Git Repository'),
        execute: async (args) => {
            const main = (await commands.execute('terminal:create-new', args));
            try {
                if (model.pathRepository !== null) {
                    const terminal = main.content;
                    terminal.session.send({
                        type: 'stdin',
                        content: [`cd "${model.pathRepository.split('"').join('\\"')}"\n`]
                    });
                }
                return main;
            }
            catch (e) {
                console.error(e);
                main.dispose();
            }
        },
        isEnabled: () => model.pathRepository !== null
    });
    /** Add open/go to git interface command */
    commands.addCommand(CommandIDs.gitUI, {
        label: trans.__('Git Interface'),
        caption: trans.__('Go to Git user interface'),
        execute: () => {
            try {
                shell.activateById('jp-git-sessions');
            }
            catch (err) {
                console.error('Fail to open Git tab.');
            }
        }
    });
    /** Add git init command */
    commands.addCommand(CommandIDs.gitInit, {
        label: trans.__('Initialize a Repository'),
        caption: trans.__('Create an empty Git repository or reinitialize an existing one'),
        execute: async () => {
            const currentPath = fileBrowser.model.path;
            const result = await showDialog({
                title: 'Initialize a Repository',
                body: 'Do you really want to make this directory a Git Repo?',
                buttons: [Dialog.cancelButton(), Dialog.warnButton({ label: 'Yes' })]
            });
            if (result.button.accept) {
                logger.log({
                    message: 'Initializing...',
                    level: Level.RUNNING
                });
                try {
                    await model.init(currentPath);
                    model.pathRepository = currentPath;
                    logger.log({
                        message: 'Git repository initialized.',
                        level: Level.SUCCESS
                    });
                }
                catch (error) {
                    console.error('Encountered an error when initializing the repository. Error: ', error);
                    logger.log({
                        message: 'Failed to initialize the Git repository',
                        level: Level.ERROR,
                        error
                    });
                }
            }
        },
        isEnabled: () => model.pathRepository === null
    });
    /** Open URL externally */
    commands.addCommand(CommandIDs.gitOpenUrl, {
        label: args => args['text'],
        execute: args => {
            const url = args['url'];
            window.open(url);
        }
    });
    /** add toggle for simple staging */
    commands.addCommand(CommandIDs.gitToggleSimpleStaging, {
        label: 'Simple staging',
        isToggled: () => !!settings.composite['simpleStaging'],
        execute: args => {
            settings.set('simpleStaging', !settings.composite['simpleStaging']);
        }
    });
    /** add toggle for double click opens diffs */
    commands.addCommand(CommandIDs.gitToggleDoubleClickDiff, {
        label: 'Double click opens diff',
        isToggled: () => !!settings.composite['doubleClickDiff'],
        execute: args => {
            settings.set('doubleClickDiff', !settings.composite['doubleClickDiff']);
        }
    });
    /** Command to add a remote Git repository */
    commands.addCommand(CommandIDs.gitAddRemote, {
        label: 'Add Remote Repository',
        caption: 'Add a Git remote repository',
        isEnabled: () => model.pathRepository !== null,
        execute: async (args) => {
            if (model.pathRepository === null) {
                console.warn('Not in a Git repository. Unable to add a remote.');
                return;
            }
            let url = args['url'];
            const name = args['name'];
            if (!url) {
                const result = await InputDialog.getText({
                    title: 'Add a remote repository',
                    placeholder: 'Remote Git repository URL'
                });
                if (result.button.accept) {
                    url = result.value;
                }
            }
            if (url) {
                try {
                    await model.addRemote(url, name);
                }
                catch (error) {
                    console.error(error);
                    showErrorMessage('Error when adding remote repository', error);
                }
            }
        }
    });
    /** Add git clone command */
    commands.addCommand(CommandIDs.gitClone, {
        label: 'Clone a Repository',
        caption: 'Clone a repository from a URL',
        isEnabled: () => model.pathRepository === null,
        execute: async () => {
            const result = await showDialog({
                title: 'Clone a repo',
                body: new GitCloneForm(),
                focusNodeSelector: 'input',
                buttons: [Dialog.cancelButton(), Dialog.okButton({ label: 'CLONE' })]
            });
            if (result.button.accept && result.value) {
                logger.log({
                    level: Level.RUNNING,
                    message: 'Cloning...'
                });
                try {
                    const details = await Private.showGitOperationDialog(model, Operation.Clone, { path: fileBrowser.model.path, url: result.value });
                    logger.log({
                        message: 'Successfully cloned',
                        level: Level.SUCCESS,
                        details
                    });
                    await fileBrowser.model.refresh();
                }
                catch (error) {
                    console.error('Encountered an error when cloning the repository. Error: ', error);
                    logger.log({
                        message: 'Failed to clone',
                        level: Level.ERROR,
                        error
                    });
                }
            }
        }
    });
    /** Add git open gitignore command */
    commands.addCommand(CommandIDs.gitOpenGitignore, {
        label: 'Open .gitignore',
        caption: 'Open .gitignore',
        isEnabled: () => model.pathRepository !== null,
        execute: async () => {
            await model.ensureGitignore();
        }
    });
    /** Add git push command */
    commands.addCommand(CommandIDs.gitPush, {
        label: trans.__('Push to Remote'),
        caption: trans.__('Push code to remote repository'),
        isEnabled: () => model.pathRepository !== null,
        execute: async () => {
            logger.log({
                level: Level.RUNNING,
                message: 'Pushing...'
            });
            try {
                const details = await Private.showGitOperationDialog(model, Operation.Push);
                logger.log({
                    message: 'Successfully pushed',
                    level: Level.SUCCESS,
                    details
                });
            }
            catch (error) {
                console.error('Encountered an error when pushing changes. Error: ', error);
                logger.log({
                    message: 'Failed to push',
                    level: Level.ERROR,
                    error
                });
            }
        }
    });
    /** Add git pull command */
    commands.addCommand(CommandIDs.gitPull, {
        label: 'Pull from Remote',
        caption: 'Pull latest code from remote repository',
        isEnabled: () => model.pathRepository !== null,
        execute: async () => {
            logger.log({
                level: Level.RUNNING,
                message: 'Pulling...'
            });
            try {
                const details = await Private.showGitOperationDialog(model, Operation.Pull);
                logger.log({
                    message: 'Successfully pulled',
                    level: Level.SUCCESS,
                    details
                });
            }
            catch (error) {
                console.error('Encountered an error when pulling changes. Error: ', error);
                logger.log({
                    message: 'Failed to pull',
                    level: Level.ERROR,
                    error
                });
            }
        }
    });
    /* Context menu commands */
    commands.addCommand(CommandIDs.gitFileOpen, {
        label: 'Open',
        caption: 'Open selected file',
        execute: async (args) => {
            const file = args;
            const { x, y, to } = file;
            if (x === 'D' || y === 'D') {
                await showErrorMessage('Open File Failed', 'This file has been deleted!');
                return;
            }
            try {
                if (to[to.length - 1] !== '/') {
                    commands.execute('docmanager:open', {
                        path: model.getRelativeFilePath(to)
                    });
                }
                else {
                    console.log('Cannot open a folder here');
                }
            }
            catch (err) {
                console.error(`Fail to open ${to}.`);
            }
        }
    });
    commands.addCommand(CommandIDs.gitFileDiff, {
        label: 'Diff',
        caption: 'Diff selected file',
        execute: args => {
            const { context, filePath, isText, status } = args;
            let diffContext = context;
            if (!diffContext) {
                const specialRef = status === 'staged' ? 'INDEX' : 'WORKING';
                diffContext = {
                    currentRef: { specialRef },
                    previousRef: { gitRef: 'HEAD' }
                };
            }
            if (isDiffSupported(filePath) || isText) {
                const id = `nbdiff-${filePath}-${getRefValue(diffContext.currentRef)}`;
                const mainAreaItems = shell.widgets('main');
                let mainAreaItem = mainAreaItems.next();
                while (mainAreaItem) {
                    if (mainAreaItem.id === id) {
                        shell.activateById(id);
                        break;
                    }
                    mainAreaItem = mainAreaItems.next();
                }
                if (!mainAreaItem) {
                    const serverRepoPath = model.getRelativeFilePath();
                    const nbDiffWidget = ReactWidget.create(React.createElement(RenderMimeProvider, { value: renderMime },
                        React.createElement(Diff, { path: filePath, diffContext: diffContext, topRepoPath: serverRepoPath })));
                    nbDiffWidget.id = id;
                    nbDiffWidget.title.label = PathExt.basename(filePath);
                    nbDiffWidget.title.icon = diffIcon;
                    nbDiffWidget.title.closable = true;
                    nbDiffWidget.addClass('jp-git-diff-parent-diff-widget');
                    shell.add(nbDiffWidget, 'main');
                    shell.activateById(nbDiffWidget.id);
                }
            }
            else {
                showErrorMessage('Diff Not Supported', `Diff is not supported for ${PathExt.extname(filePath).toLocaleLowerCase()} files.`);
            }
        }
    });
    commands.addCommand(CommandIDs.gitFileStage, {
        label: 'Stage',
        caption: 'Stage the changes of selected file',
        execute: async (args) => {
            const selectedFile = args;
            await model.add(selectedFile.to);
        }
    });
    commands.addCommand(CommandIDs.gitFileTrack, {
        label: 'Track',
        caption: 'Start tracking selected file',
        execute: async (args) => {
            const selectedFile = args;
            await model.add(selectedFile.to);
        }
    });
    commands.addCommand(CommandIDs.gitFileUnstage, {
        label: 'Unstage',
        caption: 'Unstage the changes of selected file',
        execute: async (args) => {
            const selectedFile = args;
            if (selectedFile.x !== 'D') {
                await model.reset(selectedFile.to);
            }
        }
    });
    commands.addCommand(CommandIDs.gitFileDelete, {
        label: 'Delete',
        caption: 'Delete this file',
        execute: async (args) => {
            const file = args;
            const result = await showDialog({
                title: 'Delete File',
                body: (React.createElement("span", null,
                    "Are you sure you want to permanently delete",
                    React.createElement("b", null, file.to),
                    "? This action cannot be undone.")),
                buttons: [Dialog.cancelButton(), Dialog.warnButton({ label: 'Delete' })]
            });
            if (result.button.accept) {
                try {
                    await app.commands.execute('docmanager:delete-file', {
                        path: model.getRelativeFilePath(file.to)
                    });
                }
                catch (reason) {
                    showErrorMessage(`Deleting ${file.to} failed.`, reason, [
                        Dialog.warnButton({ label: 'DISMISS' })
                    ]);
                }
            }
        }
    });
    commands.addCommand(CommandIDs.gitFileDiscard, {
        label: 'Discard',
        caption: 'Discard recent changes of selected file',
        execute: async (args) => {
            const file = args;
            const result = await showDialog({
                title: 'Discard changes',
                body: (React.createElement("span", null,
                    "Are you sure you want to permanently discard changes to",
                    ' ',
                    React.createElement("b", null, file.to),
                    "? This action cannot be undone.")),
                buttons: [
                    Dialog.cancelButton(),
                    Dialog.warnButton({ label: 'Discard' })
                ]
            });
            if (result.button.accept) {
                try {
                    if (file.status === 'staged' || file.status === 'partially-staged') {
                        await model.reset(file.to);
                    }
                    if (file.status === 'unstaged' ||
                        (file.status === 'partially-staged' && file.x !== 'A')) {
                        // resetting an added file moves it to untracked category => checkout will fail
                        await model.checkout({ filename: file.to });
                    }
                }
                catch (reason) {
                    showErrorMessage(`Discard changes for ${file.to} failed.`, reason, [
                        Dialog.warnButton({ label: 'DISMISS' })
                    ]);
                }
            }
        }
    });
    commands.addCommand(CommandIDs.gitIgnore, {
        label: () => 'Ignore this file (add to .gitignore)',
        caption: () => 'Ignore this file (add to .gitignore)',
        execute: async (args) => {
            const selectedFile = args;
            if (selectedFile) {
                await model.ignore(selectedFile.to, false);
            }
        }
    });
    commands.addCommand(CommandIDs.gitIgnoreExtension, {
        label: args => {
            const selectedFile = args;
            return `Ignore ${PathExt.extname(selectedFile.to)} extension (add to .gitignore)`;
        },
        caption: 'Ignore this file extension (add to .gitignore)',
        execute: async (args) => {
            const selectedFile = args;
            if (selectedFile) {
                const extension = PathExt.extname(selectedFile.to);
                if (extension.length > 0) {
                    const result = await showDialog({
                        title: 'Ignore file extension',
                        body: `Are you sure you want to ignore all ${extension} files within this git repository?`,
                        buttons: [
                            Dialog.cancelButton(),
                            Dialog.okButton({ label: 'Ignore' })
                        ]
                    });
                    if (result.button.label === 'Ignore') {
                        await model.ignore(selectedFile.to, true);
                    }
                }
            }
        },
        isVisible: args => {
            const selectedFile = args;
            const extension = PathExt.extname(selectedFile.to);
            return extension.length > 0;
        }
    });
}
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
export function createGitMenu(commands) {
    const menu = new Menu({ commands });
    menu.title.label = 'Git';
    [
        CommandIDs.gitInit,
        CommandIDs.gitClone,
        CommandIDs.gitPush,
        CommandIDs.gitPull,
        CommandIDs.gitAddRemote,
        CommandIDs.gitTerminalCommand
    ].forEach(command => {
        menu.addItem({ command });
    });
    menu.addItem({ type: 'separator' });
    menu.addItem({ command: CommandIDs.gitToggleSimpleStaging });
    menu.addItem({ command: CommandIDs.gitToggleDoubleClickDiff });
    menu.addItem({ type: 'separator' });
    menu.addItem({ command: CommandIDs.gitOpenGitignore });
    menu.addItem({ type: 'separator' });
    const tutorial = new Menu({ commands });
    tutorial.title.label = ' Help ';
    RESOURCES.map(args => {
        tutorial.addItem({
            args,
            command: CommandIDs.gitOpenUrl
        });
    });
    menu.addItem({ type: 'submenu', submenu: tutorial });
    return menu;
}
/* eslint-disable no-inner-declarations */
var Private;
(function (Private) {
    /**
     * Handle Git operation that may require authentication.
     *
     * @private
     * @param model - Git extension model
     * @param operation - Git operation name
     * @param args - Git operation arguments
     * @param authentication - Git authentication information
     * @param retry - Is this operation retried?
     * @returns Promise for displaying a dialog
     */
    async function showGitOperationDialog(model, operation, args, authentication, retry = false) {
        try {
            let result;
            // the Git action
            switch (operation) {
                case Operation.Clone:
                    // eslint-disable-next-line no-case-declarations
                    const { path, url } = args;
                    result = await model.clone(path, url, authentication);
                    break;
                case Operation.Pull:
                    result = await model.pull(authentication);
                    break;
                case Operation.Push:
                    result = await model.push(authentication);
                    break;
                default:
                    result = { code: -1, message: 'Unknown git command' };
                    break;
            }
            return result.message;
        }
        catch (error) {
            if (AUTH_ERROR_MESSAGES.some(errorMessage => error.message.indexOf(errorMessage) > -1)) {
                // If the error is an authentication error, ask the user credentials
                const credentials = await showDialog({
                    title: 'Git credentials required',
                    body: new GitCredentialsForm('Enter credentials for remote repository', retry ? 'Incorrect username or password.' : '')
                });
                if (credentials.button.accept) {
                    // Retry the operation if the user provides its credentials
                    return await showGitOperationDialog(model, operation, args, credentials.value, true);
                }
            }
            // Throw the error if it cannot be handled or
            // if the user did not accept to provide its credentials
            throw error;
        }
    }
    Private.showGitOperationDialog = showGitOperationDialog;
})(Private || (Private = {}));
/* eslint-enable no-inner-declarations */
//# sourceMappingURL=commandsAndMenu.js.map