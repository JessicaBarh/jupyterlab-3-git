(self["webpackChunk_jupyterlab_git"] = self["webpackChunk_jupyterlab_git"] || []).push([["lib_index_js-webpack_sharing_consume_default_jupyterlab_codeeditor-webpack_sharing_consume_de-d384f5"],{

/***/ "./lib/commandsAndMenu.js":
/*!********************************!*\
  !*** ./lib/commandsAndMenu.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommandIDs": () => /* binding */ CommandIDs,
/* harmony export */   "addCommands": () => /* binding */ addCommands,
/* harmony export */   "createGitMenu": () => /* binding */ createGitMenu
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_diff_Diff__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/diff/Diff */ "./lib/components/diff/Diff.js");
/* harmony import */ var _components_diff_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/diff/model */ "./lib/components/diff/model.js");
/* harmony import */ var _git__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./git */ "./lib/git.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./logger */ "./lib/logger.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./style/icons */ "./lib/style/icons.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tokens */ "./lib/tokens.js");
/* harmony import */ var _widgets_CredentialsBox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./widgets/CredentialsBox */ "./lib/widgets/CredentialsBox.js");
/* harmony import */ var _widgets_GitCloneForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./widgets/GitCloneForm */ "./lib/widgets/GitCloneForm.js");












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
var CommandIDs;
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
function addCommands(app, model, fileBrowser, settings, renderMime, translator) {
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
            const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: 'Initialize a Repository',
                body: 'Do you really want to make this directory a Git Repo?',
                buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton(), _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: 'Yes' })]
            });
            if (result.button.accept) {
                _logger__WEBPACK_IMPORTED_MODULE_4__.logger.log({
                    message: 'Initializing...',
                    level: _tokens__WEBPACK_IMPORTED_MODULE_5__.Level.RUNNING
                });
                try {
                    await model.init(currentPath);
                    model.pathRepository = currentPath;
                    _logger__WEBPACK_IMPORTED_MODULE_4__.logger.log({
                        message: 'Git repository initialized.',
                        level: _tokens__WEBPACK_IMPORTED_MODULE_5__.Level.SUCCESS
                    });
                }
                catch (error) {
                    console.error('Encountered an error when initializing the repository. Error: ', error);
                    _logger__WEBPACK_IMPORTED_MODULE_4__.logger.log({
                        message: 'Failed to initialize the Git repository',
                        level: _tokens__WEBPACK_IMPORTED_MODULE_5__.Level.ERROR,
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
                const result = await _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.InputDialog.getText({
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
                    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)('Error when adding remote repository', error);
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
            const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: 'Clone a repo',
                body: new _widgets_GitCloneForm__WEBPACK_IMPORTED_MODULE_6__.GitCloneForm(),
                focusNodeSelector: 'input',
                buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton(), _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'CLONE' })]
            });
            if (result.button.accept && result.value) {
                _logger__WEBPACK_IMPORTED_MODULE_4__.logger.log({
                    level: _tokens__WEBPACK_IMPORTED_MODULE_5__.Level.RUNNING,
                    message: 'Cloning...'
                });
                try {
                    const details = await Private.showGitOperationDialog(model, Operation.Clone, { path: fileBrowser.model.path, url: result.value });
                    _logger__WEBPACK_IMPORTED_MODULE_4__.logger.log({
                        message: 'Successfully cloned',
                        level: _tokens__WEBPACK_IMPORTED_MODULE_5__.Level.SUCCESS,
                        details
                    });
                    await fileBrowser.model.refresh();
                }
                catch (error) {
                    console.error('Encountered an error when cloning the repository. Error: ', error);
                    _logger__WEBPACK_IMPORTED_MODULE_4__.logger.log({
                        message: 'Failed to clone',
                        level: _tokens__WEBPACK_IMPORTED_MODULE_5__.Level.ERROR,
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
            _logger__WEBPACK_IMPORTED_MODULE_4__.logger.log({
                level: _tokens__WEBPACK_IMPORTED_MODULE_5__.Level.RUNNING,
                message: 'Pushing...'
            });
            try {
                const details = await Private.showGitOperationDialog(model, Operation.Push);
                _logger__WEBPACK_IMPORTED_MODULE_4__.logger.log({
                    message: 'Successfully pushed',
                    level: _tokens__WEBPACK_IMPORTED_MODULE_5__.Level.SUCCESS,
                    details
                });
            }
            catch (error) {
                console.error('Encountered an error when pushing changes. Error: ', error);
                _logger__WEBPACK_IMPORTED_MODULE_4__.logger.log({
                    message: 'Failed to push',
                    level: _tokens__WEBPACK_IMPORTED_MODULE_5__.Level.ERROR,
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
            _logger__WEBPACK_IMPORTED_MODULE_4__.logger.log({
                level: _tokens__WEBPACK_IMPORTED_MODULE_5__.Level.RUNNING,
                message: 'Pulling...'
            });
            try {
                const details = await Private.showGitOperationDialog(model, Operation.Pull);
                _logger__WEBPACK_IMPORTED_MODULE_4__.logger.log({
                    message: 'Successfully pulled',
                    level: _tokens__WEBPACK_IMPORTED_MODULE_5__.Level.SUCCESS,
                    details
                });
            }
            catch (error) {
                console.error('Encountered an error when pulling changes. Error: ', error);
                _logger__WEBPACK_IMPORTED_MODULE_4__.logger.log({
                    message: 'Failed to pull',
                    level: _tokens__WEBPACK_IMPORTED_MODULE_5__.Level.ERROR,
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
                await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)('Open File Failed', 'This file has been deleted!');
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
            if ((0,_components_diff_Diff__WEBPACK_IMPORTED_MODULE_7__.isDiffSupported)(filePath) || isText) {
                const id = `nbdiff-${filePath}-${(0,_components_diff_model__WEBPACK_IMPORTED_MODULE_8__.getRefValue)(diffContext.currentRef)}`;
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
                    const nbDiffWidget = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_3__.createElement(_components_diff_Diff__WEBPACK_IMPORTED_MODULE_7__.RenderMimeProvider, { value: renderMime },
                        react__WEBPACK_IMPORTED_MODULE_3__.createElement(_components_diff_Diff__WEBPACK_IMPORTED_MODULE_7__.Diff, { path: filePath, diffContext: diffContext, topRepoPath: serverRepoPath })));
                    nbDiffWidget.id = id;
                    nbDiffWidget.title.label = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.basename(filePath);
                    nbDiffWidget.title.icon = _style_icons__WEBPACK_IMPORTED_MODULE_9__.diffIcon;
                    nbDiffWidget.title.closable = true;
                    nbDiffWidget.addClass('jp-git-diff-parent-diff-widget');
                    shell.add(nbDiffWidget, 'main');
                    shell.activateById(nbDiffWidget.id);
                }
            }
            else {
                (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)('Diff Not Supported', `Diff is not supported for ${_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.extname(filePath).toLocaleLowerCase()} files.`);
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
            const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: 'Delete File',
                body: (react__WEBPACK_IMPORTED_MODULE_3__.createElement("span", null,
                    "Are you sure you want to permanently delete",
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement("b", null, file.to),
                    "? This action cannot be undone.")),
                buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton(), _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: 'Delete' })]
            });
            if (result.button.accept) {
                try {
                    await app.commands.execute('docmanager:delete-file', {
                        path: model.getRelativeFilePath(file.to)
                    });
                }
                catch (reason) {
                    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(`Deleting ${file.to} failed.`, reason, [
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: 'DISMISS' })
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
            const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: 'Discard changes',
                body: (react__WEBPACK_IMPORTED_MODULE_3__.createElement("span", null,
                    "Are you sure you want to permanently discard changes to",
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement("b", null, file.to),
                    "? This action cannot be undone.")),
                buttons: [
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton(),
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: 'Discard' })
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
                    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(`Discard changes for ${file.to} failed.`, reason, [
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: 'DISMISS' })
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
            return `Ignore ${_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.extname(selectedFile.to)} extension (add to .gitignore)`;
        },
        caption: 'Ignore this file extension (add to .gitignore)',
        execute: async (args) => {
            const selectedFile = args;
            if (selectedFile) {
                const extension = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.extname(selectedFile.to);
                if (extension.length > 0) {
                    const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                        title: 'Ignore file extension',
                        body: `Are you sure you want to ignore all ${extension} files within this git repository?`,
                        buttons: [
                            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton(),
                            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'Ignore' })
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
            const extension = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.extname(selectedFile.to);
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
function createGitMenu(commands) {
    const menu = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Menu({ commands });
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
    const tutorial = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Menu({ commands });
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
            if (_git__WEBPACK_IMPORTED_MODULE_10__.AUTH_ERROR_MESSAGES.some(errorMessage => error.message.indexOf(errorMessage) > -1)) {
                // If the error is an authentication error, ask the user credentials
                const credentials = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                    title: 'Git credentials required',
                    body: new _widgets_CredentialsBox__WEBPACK_IMPORTED_MODULE_11__.GitCredentialsForm('Enter credentials for remote repository', retry ? 'Incorrect username or password.' : '')
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

/***/ }),

/***/ "./lib/components/ActionButton.js":
/*!****************************************!*\
  !*** ./lib/components/ActionButton.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActionButton": () => /* binding */ ActionButton
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/ActionButtonStyle */ "./lib/style/ActionButtonStyle.js");



/**
 * Action button component
 *
 * @param props Component properties
 */
const ActionButton = (props) => {
    const { disabled, className, title, onClick, icon } = props;
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { disabled: disabled, className: (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_2__.actionButtonStyle, className), title: title, onClick: onClick },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(icon.react, { elementPosition: "center", tag: "span" })));
};
//# sourceMappingURL=ActionButton.js.map

/***/ }),

/***/ "./lib/components/Alert.js":
/*!*********************************!*\
  !*** ./lib/components/Alert.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alert": () => /* binding */ Alert
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "webpack/sharing/consume/default/@material-ui/core/@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Portal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Portal */ "./node_modules/@material-ui/core/esm/Portal/Portal.js");
/* harmony import */ var _material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Slide */ "./node_modules/@material-ui/core/esm/Slide/Slide.js");
/* harmony import */ var _material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Snackbar */ "./node_modules/@material-ui/core/esm/Snackbar/Snackbar.js");
/* harmony import */ var _material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/lab/Alert */ "./node_modules/@material-ui/lab/esm/Alert/Alert.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);







/**
 * Returns a React component for "sliding-in" an alert.
 *
 * @private
 * @param props - component properties
 * @returns React element
 */
function SlideTransition(props) {
    return react__WEBPACK_IMPORTED_MODULE_2__.createElement(_material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_3__.default, Object.assign({}, props, { direction: "up" }));
}
/**
 * React component for rendering an alert.
 */
class Alert extends react__WEBPACK_IMPORTED_MODULE_2__.Component {
    /**
     * Returns a React component for rendering an alert.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Callback invoked upon clicking on an alert.
         *
         * @param event - event object
         */
        this._onClick = (event) => {
            if (this.props.onClick) {
                this.props.onClick(event);
                return;
            }
            this._onClose(event, 'click');
        };
        /**
         * Callback invoked upon closing an alert.
         *
         * @param event - event object
         * @param reason - reason why the callback was invoked
         */
        this._onClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            this.props.onClose(event);
        };
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        let duration = null;
        const severity = this.props.severity || 'info';
        if (severity === 'success') {
            duration = this.props.duration || 5000; // milliseconds
        }
        let action;
        if (this.props.error) {
            action = (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__.Button, { color: "inherit", size: "small", onClick: () => {
                    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)('Error', this.props.error);
                } }, "SHOW"));
        }
        else if (this.props.details) {
            action = (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__.Button, { color: "inherit", size: "small", onClick: () => {
                    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                        title: 'Detailed message',
                        body: this.props.details,
                        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'DISMISS' })]
                    });
                } }, "Details"));
        }
        return (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_material_ui_core_Portal__WEBPACK_IMPORTED_MODULE_4__.default, null,
            react__WEBPACK_IMPORTED_MODULE_2__.createElement(_material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_5__.default, { key: "git:alert", open: this.props.open, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right'
                }, autoHideDuration: duration, TransitionComponent: SlideTransition, onClick: this._onClick, onClose: this._onClose },
                react__WEBPACK_IMPORTED_MODULE_2__.createElement(_material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_6__.default, { action: action, variant: "filled", severity: severity }, this.props.message || '(missing message)'))));
    }
}
//# sourceMappingURL=Alert.js.map

/***/ }),

/***/ "./lib/components/BranchMenu.js":
/*!**************************************!*\
  !*** ./lib/components/BranchMenu.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BranchMenu": () => /* binding */ BranchMenu
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/List */ "./node_modules/@material-ui/core/esm/List/List.js");
/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/ListItem */ "./node_modules/@material-ui/core/esm/ListItem/ListItem.js");
/* harmony import */ var _material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/Clear */ "./node_modules/@material-ui/icons/Clear.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-window */ "webpack/sharing/consume/default/react-window/react-window");
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_window__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../style/ActionButtonStyle */ "./lib/style/ActionButtonStyle.js");
/* harmony import */ var _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../style/BranchMenu */ "./lib/style/BranchMenu.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens */ "./lib/tokens.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ActionButton */ "./lib/components/ActionButton.js");
/* harmony import */ var _NewBranchDialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./NewBranchDialog */ "./lib/components/NewBranchDialog.js");













const CHANGES_ERR_MSG = 'The current branch contains files with uncommitted changes. Please commit or discard these changes before switching to or creating another branch.';
const ITEM_HEIGHT = 24.8; // HTML element height for a single branch
const MIN_HEIGHT = 150; // Minimal HTML element height for the branches list
const MAX_HEIGHT = 400; // Maximal HTML element height for the branches list
/**
 * Callback invoked upon encountering an error when switching branches.
 *
 * @private
 * @param error - error
 * @param logger - the logger
 */
function onBranchError(error, logger) {
    if (error.message.includes('following files would be overwritten')) {
        // Empty log message to hide the executing alert
        logger.log({
            message: '',
            level: _tokens__WEBPACK_IMPORTED_MODULE_4__.Level.INFO
        });
        (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
            title: 'Unable to switch branch',
            body: (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "Your changes to the following files would be overwritten by switching:"),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_5__.default, null, error.message.split('\n').slice(1, -3).map(renderFileName)),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Please commit, stash, or discard your changes before you switch branches."))),
            buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'Dismiss' })]
        });
    }
    else {
        logger.log({
            level: _tokens__WEBPACK_IMPORTED_MODULE_4__.Level.ERROR,
            message: 'Failed to switch branch.',
            error
        });
    }
}
/**
 * Renders a file name.
 *
 * @private
 * @param filename - file name
 * @returns React element
 */
function renderFileName(filename) {
    return react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_6__.default, { key: filename }, filename);
}
/**
 * React component for rendering a branch menu.
 */
class BranchMenu extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    /**
     * Returns a React component for rendering a branch menu.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Renders a menu item.
         *
         * @param props Row properties
         * @returns React element
         */
        this._renderItem = (props) => {
            const { data, index, style } = props;
            const branch = data[index];
            const isActive = branch.name === this.props.currentBranch;
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_6__.default, { button: true, title: `Switch to branch: ${branch.name}`, className: (0,typestyle__WEBPACK_IMPORTED_MODULE_3__.classes)(_style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.listItemClass, isActive ? _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.activeListItemClass : null), onClick: this._onBranchClickFactory(branch.name), style: style },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_style_icons__WEBPACK_IMPORTED_MODULE_8__.branchIcon.react, { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.listItemIconClass, tag: "span" }),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.nameClass }, branch.name),
                !branch.is_remote_branch && !isActive && (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.trashIcon, title: 'Delete this branch locally', onClick: (event) => {
                        event.stopPropagation();
                        this._onDeleteBranch(branch.name);
                    } }))));
        };
        /**
         * Callback invoked upon a change to the menu filter.
         *
         * @param event - event object
         */
        this._onFilterChange = (event) => {
            this.setState({
                filter: event.target.value
            });
        };
        /**
         * Callback invoked to reset the menu filter.
         */
        this._resetFilter = () => {
            this.setState({
                filter: ''
            });
        };
        /**
         * Callback on delete branch name button
         *
         * @param branchName Branch name
         */
        this._onDeleteBranch = async (branchName) => {
            const acknowledgement = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: 'Delete branch',
                body: (react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null,
                    "Are you sure you want to permanently delete the branch",
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("b", null, branchName),
                    "?",
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("br", null),
                    "This action cannot be undone.")),
                buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton(), _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: 'Delete' })]
            });
            if (acknowledgement.button.accept) {
                try {
                    await this.props.model.deleteBranch(branchName);
                    await this.props.model.refreshBranch();
                }
                catch (error) {
                    console.error(`Failed to delete branch ${branchName}`, error);
                }
            }
        };
        /**
         * Callback invoked upon clicking a button to create a new branch.
         *
         * @param event - event object
         */
        this._onNewBranchClick = () => {
            if (!this.props.branching) {
                (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)('Creating a new branch is disabled', CHANGES_ERR_MSG);
                return;
            }
            this.setState({
                branchDialog: true
            });
        };
        /**
         * Callback invoked upon closing a dialog to create a new branch.
         */
        this._onNewBranchDialogClose = () => {
            this.setState({
                branchDialog: false
            });
        };
        this.state = {
            filter: '',
            branchDialog: false
        };
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.wrapperClass },
            this._renderFilter(),
            this._renderBranchList(),
            this._renderNewBranchDialog()));
    }
    /**
     * Renders a branch input filter.
     *
     * @returns React element
     */
    _renderFilter() {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.filterWrapperClass },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.filterClass },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.filterInputClass, type: "text", onChange: this._onFilterChange, value: this.state.filter, placeholder: "Filter", title: "Filter branch menu" }),
                this.state.filter ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.filterClearClass },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_11__.default, { titleAccess: "Clear the current filter", fontSize: "small", onClick: this._resetFilter }))) : null),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.newBranchButtonClass, type: "button", title: "Create a new branch", value: "New Branch", onClick: this._onNewBranchClick })));
    }
    /**
     * Renders a
     *
     * @returns React element
     */
    _renderBranchList() {
        // Perform a "simple" filter... (TODO: consider implementing fuzzy filtering)
        const filter = this.state.filter;
        const branches = this.props.branches.filter(branch => !filter || branch.name.includes(filter));
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_window__WEBPACK_IMPORTED_MODULE_2__.FixedSizeList, { height: Math.min(Math.max(MIN_HEIGHT, branches.length * ITEM_HEIGHT), MAX_HEIGHT), itemCount: branches.length, itemData: branches, itemKey: (index, data) => data[index].name, itemSize: ITEM_HEIGHT, style: { overflowX: 'hidden', paddingTop: 0, paddingBottom: 0 }, width: 'auto' }, this._renderItem));
    }
    /**
     * Renders a dialog for creating a new branch.
     *
     * @returns React element
     */
    _renderNewBranchDialog() {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_NewBranchDialog__WEBPACK_IMPORTED_MODULE_12__.NewBranchDialog, { currentBranch: this.props.currentBranch, branches: this.props.branches, logger: this.props.logger, open: this.state.branchDialog, model: this.props.model, onClose: this._onNewBranchDialogClose }));
    }
    /**
     * Returns a callback which is invoked upon clicking a branch name.
     *
     * @param branch - branch name
     * @returns callback
     */
    _onBranchClickFactory(branch) {
        const self = this;
        return onClick;
        /**
         * Callback invoked upon clicking a branch name.
         *
         * @private
         * @param event - event object
         * @returns promise which resolves upon attempting to switch branches
         */
        async function onClick() {
            if (!self.props.branching) {
                (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)('Switching branches is disabled', CHANGES_ERR_MSG);
                return;
            }
            const opts = {
                branchname: branch
            };
            self.props.logger.log({
                level: _tokens__WEBPACK_IMPORTED_MODULE_4__.Level.RUNNING,
                message: 'Switching branch...'
            });
            try {
                await self.props.model.checkout(opts);
            }
            catch (err) {
                return onBranchError(err, self.props.logger);
            }
            self.props.logger.log({
                level: _tokens__WEBPACK_IMPORTED_MODULE_4__.Level.SUCCESS,
                message: 'Switched branch.'
            });
        }
    }
}
//# sourceMappingURL=BranchMenu.js.map

/***/ }),

/***/ "./lib/components/CommitBox.js":
/*!*************************************!*\
  !*** ./lib/components/CommitBox.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommitBox": () => /* binding */ CommitBox
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_textarea_autosize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-textarea-autosize */ "webpack/sharing/consume/default/react-textarea-autosize/react-textarea-autosize");
/* harmony import */ var react_textarea_autosize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_textarea_autosize__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_CommitBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/CommitBox */ "./lib/style/CommitBox.js");



/**
 * React component for entering a commit message.
 */
class CommitBox extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    /**
     * Returns a React component for entering a commit message.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Callback invoked upon clicking a commit message submit button.
         *
         * @param event - event object
         */
        this._onCommitClick = () => {
            const msg = this.state.summary + '\n\n' + this.state.description + '\n';
            this.props.onCommit(msg);
            // NOTE: we assume here that committing changes always works and we can safely clear component state
            this._reset();
        };
        /**
         * Callback invoked upon updating a commit message description.
         *
         * @param event - event object
         */
        this._onDescriptionChange = (event) => {
            this.setState({
                description: event.target.value
            });
        };
        /**
         * Callback invoked upon updating a commit message summary.
         *
         * @param event - event object
         */
        this._onSummaryChange = (event) => {
            this.setState({
                summary: event.target.value
            });
        };
        this.state = {
            summary: '',
            description: ''
        };
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        const disabled = !(this.props.hasFiles && this.state.summary);
        const title = !this.props.hasFiles
            ? 'Disabled: No files are staged for commit'
            : !this.state.summary
                ? 'Disabled: No commit message summary'
                : 'Commit';
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", { className: _style_CommitBox__WEBPACK_IMPORTED_MODULE_2__.commitFormClass },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { className: _style_CommitBox__WEBPACK_IMPORTED_MODULE_2__.commitSummaryClass, type: "text", placeholder: "Summary (required)", title: "Enter a commit message summary (a single line, preferably less than 50 characters)", value: this.state.summary, onChange: this._onSummaryChange, onKeyPress: this._onSummaryKeyPress }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement((react_textarea_autosize__WEBPACK_IMPORTED_MODULE_1___default()), { className: _style_CommitBox__WEBPACK_IMPORTED_MODULE_2__.commitDescriptionClass, minRows: 5, placeholder: "Description", title: "Enter a commit message description", value: this.state.description, onChange: this._onDescriptionChange }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { className: _style_CommitBox__WEBPACK_IMPORTED_MODULE_2__.commitButtonClass, type: "button", title: title, value: "Commit", disabled: disabled, onClick: this._onCommitClick })));
    }
    /**
     * Callback invoked upon a `'keypress'` event when entering a commit message summary.
     *
     * ## Notes
     *
     * -   Prevents triggering a `'submit'` action when hitting the `ENTER` key while entering a commit message summary.
     *
     * @param event - event object
     */
    _onSummaryKeyPress(event) {
        if (event.which === 13) {
            event.preventDefault();
        }
    }
    /**
     * Resets component state (e.g., in order to re-initialize the commit message input box).
     */
    _reset() {
        this.setState({
            summary: '',
            description: ''
        });
    }
}
//# sourceMappingURL=CommitBox.js.map

/***/ }),

/***/ "./lib/components/Feedback.js":
/*!************************************!*\
  !*** ./lib/components/Feedback.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Feedback": () => /* binding */ Feedback
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tokens */ "./lib/tokens.js");
/* harmony import */ var _Alert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Alert */ "./lib/components/Alert.js");
/* harmony import */ var _SuspendModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SuspendModal */ "./lib/components/SuspendModal.js");




const LEVEL_TO_SEVERITY = new Map([
    [_tokens__WEBPACK_IMPORTED_MODULE_1__.Level.ERROR, 'error'],
    [_tokens__WEBPACK_IMPORTED_MODULE_1__.Level.WARNING, 'warning'],
    [_tokens__WEBPACK_IMPORTED_MODULE_1__.Level.SUCCESS, 'success'],
    [_tokens__WEBPACK_IMPORTED_MODULE_1__.Level.INFO, 'info'],
    [_tokens__WEBPACK_IMPORTED_MODULE_1__.Level.RUNNING, 'info']
]);
const VISUAL_DELAY = 1000; // in ms
/**
 * Component to handle logger user feedback
 */
class Feedback extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(props) {
        super(props);
        this.state = {
            blockUI: false,
            lastUpdate: Date.now() - VISUAL_DELAY,
            logStack: [],
            showAlert: false
        };
    }
    static getDerivedStateFromProps(props, state) {
        const latestLog = state.logStack[state.logStack.length - 1];
        const now = Date.now();
        if (props.log !== latestLog) {
            if (now - state.lastUpdate > VISUAL_DELAY) {
                state.logStack.shift();
            }
            if (latestLog && props.log.level > latestLog.level) {
                // Higher level takes over
                state.logStack.splice(0, 1, props.log);
                state.lastUpdate = now;
            }
            else {
                state.logStack.push(props.log);
            }
            state.blockUI = props.settings.composite['blockWhileCommandExecutes'];
            state.showAlert = true;
        }
        return state;
    }
    render() {
        if (this.state.logStack.length > 1) {
            setTimeout(() => {
                if (this.state.logStack.length > 1) {
                    this.setState({
                        blockUI: this.props.settings.composite['blockWhileCommandExecutes'],
                        logStack: this.state.logStack.slice(1),
                        lastUpdate: Date.now(),
                        showAlert: true
                    });
                }
            }, VISUAL_DELAY);
        }
        const log = this.state.logStack[0];
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_SuspendModal__WEBPACK_IMPORTED_MODULE_2__.SuspendModal, { open: this.state.blockUI &&
                    log.level === _tokens__WEBPACK_IMPORTED_MODULE_1__.Level.RUNNING &&
                    this.state.showAlert, onClick: () => {
                    this.setState({ blockUI: false });
                } }),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Alert__WEBPACK_IMPORTED_MODULE_3__.Alert, { details: log === null || log === void 0 ? void 0 : log.details, error: log === null || log === void 0 ? void 0 : log.error, open: this.state.showAlert, message: (log === null || log === void 0 ? void 0 : log.message) || this.props.log.message, severity: LEVEL_TO_SEVERITY.get((log === null || log === void 0 ? void 0 : log.level) || this.props.log.level), onClose: () => this.setState({ showAlert: false }) })));
    }
}
//# sourceMappingURL=Feedback.js.map

/***/ }),

/***/ "./lib/components/FileItem.js":
/*!************************************!*\
  !*** ./lib/components/FileItem.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STATUS_CODES": () => /* binding */ STATUS_CODES,
/* harmony export */   "FileItem": () => /* binding */ FileItem
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/FileItemStyle */ "./lib/style/FileItemStyle.js");
/* harmony import */ var _FilePath__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FilePath */ "./lib/components/FilePath.js");




// Git status codes https://git-scm.com/docs/git-status
const STATUS_CODES = {
    M: 'Modified',
    A: 'Added',
    D: 'Deleted',
    R: 'Renamed',
    C: 'Copied',
    U: 'Updated',
    '?': 'Untracked',
    '!': 'Ignored'
};
/**
 * Render the selection box in simple mode
 */
class GitMarkBox extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
    constructor() {
        super(...arguments);
        this._onClick = () => {
            // toggle will emit a markChanged signal
            this.props.model.toggleMark(this.props.fname);
            // needed if markChanged doesn't force an update of a parent
            this.forceUpdate();
        };
        this._onDoubleClick = (event) => {
            event.stopPropagation();
        };
    }
    render() {
        // idempotent, will only run once per file
        this.props.model.addMark(this.props.fname, this.props.stage !== 'untracked');
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { name: "gitMark", className: _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.gitMarkBoxStyle, type: "checkbox", checked: this.props.model.getMark(this.props.fname), onChange: this._onClick, onDoubleClick: this._onDoubleClick }));
    }
}
class FileItem extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
    _getFileChangedLabel(change) {
        return STATUS_CODES[change];
    }
    _getFileChangedLabelClass(change) {
        if (change === 'M') {
            return this.props.selected
                ? (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelStyle, _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelBrandStyle, _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.selectedFileChangedLabelStyle)
                : (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelStyle, _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelBrandStyle);
        }
        else {
            return this.props.selected
                ? (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelStyle, _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelInfoStyle, _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.selectedFileChangedLabelStyle)
                : (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelStyle, _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelInfoStyle);
        }
    }
    _getFileClass() {
        return this.props.selected
            ? (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileStyle, _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.selectedFileStyle)
            : _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileStyle;
    }
    render() {
        const { file } = this.props;
        const status_code = file.status === 'staged' ? file.x : file.y;
        const status = this._getFileChangedLabel(status_code);
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: this._getFileClass(), onClick: this.props.selectFile &&
                (() => this.props.selectFile(this.props.file)), onContextMenu: this.props.contextMenu &&
                (event => {
                    this.props.contextMenu(this.props.file, event);
                }), onDoubleClick: this.props.onDoubleClick, style: this.props.style, title: `${this.props.file.to} ● ${status}` },
            this.props.markBox && (react__WEBPACK_IMPORTED_MODULE_0__.createElement(GitMarkBox, { fname: this.props.file.to, stage: this.props.file.status, model: this.props.model })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_FilePath__WEBPACK_IMPORTED_MODULE_3__.FilePath, { filepath: this.props.file.to, filetype: this.props.file.type }),
            this.props.actions,
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: this._getFileChangedLabelClass(this.props.file.y) }, this.props.file.y === '?' ? 'U' : status_code)));
    }
}
//# sourceMappingURL=FileItem.js.map

/***/ }),

/***/ "./lib/components/FileList.js":
/*!************************************!*\
  !*** ./lib/components/FileList.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileList": () => /* binding */ FileList
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-virtualized-auto-sizer */ "webpack/sharing/consume/default/react-virtualized-auto-sizer/react-virtualized-auto-sizer");
/* harmony import */ var react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../commandsAndMenu */ "./lib/commandsAndMenu.js");
/* harmony import */ var _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../style/ActionButtonStyle */ "./lib/style/ActionButtonStyle.js");
/* harmony import */ var _style_FileListStyle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../style/FileListStyle */ "./lib/style/FileListStyle.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ActionButton */ "./lib/components/ActionButton.js");
/* harmony import */ var _diff_Diff__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./diff/Diff */ "./lib/components/diff/Diff.js");
/* harmony import */ var _FileItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FileItem */ "./lib/components/FileItem.js");
/* harmony import */ var _GitStage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./GitStage */ "./lib/components/GitStage.js");












class FileList extends react__WEBPACK_IMPORTED_MODULE_2__.Component {
    constructor(props) {
        super(props);
        /**
         * Open the context menu on the advanced view
         *
         * @param selectedFile The file on which the context menu is opened
         * @param event The click event
         */
        this.openContextMenu = (selectedFile, event) => {
            event.preventDefault();
            this.setState({
                selectedFile
            });
            const contextMenu = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Menu({ commands: this.props.commands });
            const commands = [_commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileOpen];
            switch (selectedFile.status) {
                case 'unstaged':
                    commands.push(_commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileStage, _commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileDiscard, _commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileDiff);
                    break;
                case 'untracked':
                    commands.push(_commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileTrack, _commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitIgnore, _commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitIgnoreExtension, _commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileDelete);
                    break;
                case 'staged':
                    commands.push(_commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileUnstage, _commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileDiff);
                    break;
            }
            commands.forEach(command => {
                if (command === _commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileDiff) {
                    contextMenu.addItem({
                        command,
                        args: {
                            filePath: selectedFile.to,
                            isText: !selectedFile.is_binary,
                            status: selectedFile.status
                        }
                    });
                }
                else {
                    contextMenu.addItem({ command, args: selectedFile });
                }
            });
            contextMenu.open(event.clientX, event.clientY);
        };
        /**
         * Open the context menu on the simple view
         *
         * @param selectedFile The file on which the context menu is opened
         * @param event The click event
         */
        this.openSimpleContextMenu = (selectedFile, event) => {
            event.preventDefault();
            const contextMenu = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Menu({ commands: this.props.commands });
            const commands = [_commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileOpen];
            switch (selectedFile.status) {
                case 'untracked':
                    commands.push(_commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitIgnore, _commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitIgnoreExtension, _commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileDelete);
                    break;
                default:
                    commands.push(_commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileDiscard, _commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileDiff);
                    break;
            }
            commands.forEach(command => {
                if (command === _commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileDiff) {
                    contextMenu.addItem({
                        command,
                        args: {
                            filePath: selectedFile.to,
                            isText: !selectedFile.is_binary,
                            status: selectedFile.status
                        }
                    });
                }
                else {
                    contextMenu.addItem({ command, args: selectedFile });
                }
            });
            contextMenu.open(event.clientX, event.clientY);
        };
        /** Reset all staged files */
        this.resetAllStagedFiles = async (event) => {
            event.stopPropagation();
            await this.props.model.reset();
        };
        /** Reset a specific staged file */
        this.resetStagedFile = async (file) => {
            await this.props.model.reset(file);
        };
        /** Add all unstaged files */
        this.addAllUnstagedFiles = async (event) => {
            event.stopPropagation();
            await this.props.model.addAllUnstaged();
        };
        /** Discard changes in all unstaged files */
        this.discardAllUnstagedFiles = async (event) => {
            event.stopPropagation();
            const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: 'Discard all changes',
                body: 'Are you sure you want to permanently discard changes to all files? This action cannot be undone.',
                buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton(), _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: 'Discard' })]
            });
            if (result.button.accept) {
                try {
                    await this.props.model.checkout();
                }
                catch (reason) {
                    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)('Discard all unstaged changes failed.', reason);
                }
            }
        };
        /** Discard changes in all unstaged and staged files */
        this.discardAllChanges = async (event) => {
            event.stopPropagation();
            const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: 'Discard all changes',
                body: 'Are you sure you want to permanently discard changes to all files? This action cannot be undone.',
                buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton(), _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: 'Discard' })]
            });
            if (result.button.accept) {
                try {
                    await this.props.model.resetToCommit();
                }
                catch (reason) {
                    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)('Discard all changes failed.', reason);
                }
            }
        };
        /** Add a specific unstaged file */
        this.addFile = async (...file) => {
            await this.props.model.add(...file);
        };
        /** Discard changes in a specific unstaged or staged file */
        this.discardChanges = async (file) => {
            await this.props.commands.execute(_commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileDiscard, file);
        };
        /** Add all untracked files */
        this.addAllUntrackedFiles = async (event) => {
            event.stopPropagation();
            await this.props.model.addAllUntracked();
        };
        this.addAllMarkedFiles = async () => {
            await this.addFile(...this.markedFiles.map(file => file.to));
        };
        this.updateSelectedFile = (file) => {
            this.setState({ selectedFile: file });
        };
        /**
         * Render a staged file
         *
         * Note: This is actually a React.FunctionComponent but defined as
         * a private method as it needs access to FileList properties.
         *
         * @param rowProps Row properties
         */
        this._renderStagedRow = (rowProps) => {
            const doubleClickDiff = this.props.settings.get('doubleClickDiff')
                .composite;
            const { data, index, style } = rowProps;
            const file = data[index];
            const openFile = () => {
                this.props.commands.execute(_commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileOpen, file);
            };
            const diffButton = this._createDiffButton(file);
            return (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_FileItem__WEBPACK_IMPORTED_MODULE_5__.FileItem, { actions: react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_6__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_7__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.openIcon, title: 'Open this file', onClick: openFile }),
                    diffButton,
                    react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_6__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_7__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.removeIcon, title: 'Unstage this change', onClick: () => {
                            this.resetStagedFile(file.to);
                        } })), file: file, contextMenu: this.openContextMenu, model: this.props.model, selected: this._isSelectedFile(file), selectFile: this.updateSelectedFile, onDoubleClick: doubleClickDiff
                    ? diffButton
                        ? () => this._openDiffView(file)
                        : () => undefined
                    : openFile, style: style }));
        };
        /**
         * Render a changed file
         *
         * Note: This is actually a React.FunctionComponent but defined as
         * a private method as it needs access to FileList properties.
         *
         * @param rowProps Row properties
         */
        this._renderChangedRow = (rowProps) => {
            const doubleClickDiff = this.props.settings.get('doubleClickDiff')
                .composite;
            const { data, index, style } = rowProps;
            const file = data[index];
            const openFile = () => {
                this.props.commands.execute(_commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileOpen, file);
            };
            const diffButton = this._createDiffButton(file);
            return (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_FileItem__WEBPACK_IMPORTED_MODULE_5__.FileItem, { actions: react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_6__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_7__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.openIcon, title: 'Open this file', onClick: openFile }),
                    diffButton,
                    react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_6__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_7__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.discardIcon, title: 'Discard changes', onClick: () => {
                            this.discardChanges(file);
                        } }),
                    react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_6__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_7__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.addIcon, title: 'Stage this change', onClick: () => {
                            this.addFile(file.to);
                        } })), file: file, contextMenu: this.openContextMenu, model: this.props.model, selected: this._isSelectedFile(file), selectFile: this.updateSelectedFile, onDoubleClick: doubleClickDiff
                    ? diffButton
                        ? () => this._openDiffView(file)
                        : () => undefined
                    : openFile, style: style }));
        };
        /**
         * Render a untracked file.
         *
         * Note: This is actually a React.FunctionComponent but defined as
         * a private method as it needs access to FileList properties.
         *
         * @param rowProps Row properties
         */
        this._renderUntrackedRow = (rowProps) => {
            const doubleClickDiff = this.props.settings.get('doubleClickDiff')
                .composite;
            const { data, index, style } = rowProps;
            const file = data[index];
            return (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_FileItem__WEBPACK_IMPORTED_MODULE_5__.FileItem, { actions: react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_6__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_7__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.openIcon, title: 'Open this file', onClick: () => {
                            this.props.commands.execute(_commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileOpen, file);
                        } }),
                    react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_6__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_7__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.addIcon, title: 'Track this file', onClick: () => {
                            this.addFile(file.to);
                        } })), file: file, contextMenu: this.openContextMenu, model: this.props.model, onDoubleClick: () => {
                    if (!doubleClickDiff) {
                        this.props.commands.execute(_commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileOpen, file);
                    }
                }, selected: this._isSelectedFile(file), selectFile: this.updateSelectedFile, style: style }));
        };
        /**
         * Render a modified file in simple mode.
         *
         * Note: This is actually a React.FunctionComponent but defined as
         * a private method as it needs access to FileList properties.
         *
         * @param rowProps Row properties
         */
        this._renderSimpleStageRow = (rowProps) => {
            const { data, index, style } = rowProps;
            const file = data[index];
            const doubleClickDiff = this.props.settings.get('doubleClickDiff')
                .composite;
            const openFile = () => {
                this.props.commands.execute(_commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileOpen, file);
            };
            // Default value for actions and double click
            let actions = (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_6__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_7__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.openIcon, title: 'Open this file', onClick: openFile }));
            let onDoubleClick = doubleClickDiff ? () => undefined : openFile;
            if (file.status === 'unstaged' || file.status === 'partially-staged') {
                const diffButton = this._createDiffButton(file);
                actions = (react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_6__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_7__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.openIcon, title: 'Open this file', onClick: openFile }),
                    diffButton,
                    react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_6__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_7__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.discardIcon, title: 'Discard changes', onClick: () => {
                            this.discardChanges(file);
                        } })));
                onDoubleClick = doubleClickDiff
                    ? diffButton
                        ? () => this._openDiffView(file)
                        : () => undefined
                    : openFile;
            }
            else if (file.status === 'staged') {
                const diffButton = this._createDiffButton(file);
                actions = (react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_6__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_7__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.openIcon, title: 'Open this file', onClick: openFile }),
                    diffButton,
                    react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_6__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_7__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.discardIcon, title: 'Discard changes', onClick: () => {
                            this.discardChanges(file);
                        } })));
                onDoubleClick = doubleClickDiff
                    ? diffButton
                        ? () => this._openDiffView(file)
                        : () => undefined
                    : openFile;
            }
            return (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_FileItem__WEBPACK_IMPORTED_MODULE_5__.FileItem, { actions: actions, file: file, markBox: true, model: this.props.model, onDoubleClick: onDoubleClick, contextMenu: this.openSimpleContextMenu, selectFile: this.updateSelectedFile, style: style }));
        };
        this.state = {
            selectedFile: null
        };
    }
    get markedFiles() {
        return this.props.files.filter(file => this.props.model.getMark(file.to));
    }
    /**
     * Render the modified files
     */
    render() {
        if (this.props.settings.composite['simpleStaging']) {
            return (react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", { className: _style_FileListStyle__WEBPACK_IMPORTED_MODULE_9__.fileListWrapperClass },
                react__WEBPACK_IMPORTED_MODULE_2__.createElement((react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_3___default()), { disableWidth: true }, ({ height }) => this._renderSimpleStage(this.props.files, height))));
        }
        else {
            const stagedFiles = [];
            const unstagedFiles = [];
            const untrackedFiles = [];
            this.props.files.forEach(file => {
                switch (file.status) {
                    case 'staged':
                        stagedFiles.push(file);
                        break;
                    case 'unstaged':
                        unstagedFiles.push(file);
                        break;
                    case 'untracked':
                        untrackedFiles.push(file);
                        break;
                    case 'partially-staged':
                        stagedFiles.push(Object.assign(Object.assign({}, file), { status: 'staged' }));
                        unstagedFiles.push(Object.assign(Object.assign({}, file), { status: 'unstaged' }));
                        break;
                    default:
                        break;
                }
            });
            return (react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", { className: _style_FileListStyle__WEBPACK_IMPORTED_MODULE_9__.fileListWrapperClass, onContextMenu: event => event.preventDefault() },
                react__WEBPACK_IMPORTED_MODULE_2__.createElement((react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_3___default()), { disableWidth: true }, ({ height }) => (react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null,
                    this._renderStaged(stagedFiles, height),
                    this._renderChanged(unstagedFiles, height),
                    this._renderUntracked(untrackedFiles, height))))));
        }
    }
    /**
     * Test if a file is selected
     * @param candidate file to test
     */
    _isSelectedFile(candidate) {
        if (this.state.selectedFile === null) {
            return false;
        }
        return (this.state.selectedFile.x === candidate.x &&
            this.state.selectedFile.y === candidate.y &&
            this.state.selectedFile.from === candidate.from &&
            this.state.selectedFile.to === candidate.to &&
            this.state.selectedFile.status === candidate.status);
    }
    /**
     * Render the staged files list.
     *
     * @param files The staged files
     * @param height The height of the HTML element
     */
    _renderStaged(files, height) {
        return (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_GitStage__WEBPACK_IMPORTED_MODULE_10__.GitStage, { actions: react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_6__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_7__.hiddenButtonStyle, disabled: files.length === 0, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.removeIcon, title: 'Unstage all changes', onClick: this.resetAllStagedFiles }), collapsible: true, files: files, heading: 'Staged', height: height, rowRenderer: this._renderStagedRow }));
    }
    /**
     * Render the changed files list
     *
     * @param files Changed files
     * @param height Height of the HTML element
     */
    _renderChanged(files, height) {
        const disabled = files.length === 0;
        return (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_GitStage__WEBPACK_IMPORTED_MODULE_10__.GitStage, { actions: react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_6__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_7__.hiddenButtonStyle, disabled: disabled, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.discardIcon, title: 'Discard All Changes', onClick: this.discardAllUnstagedFiles }),
                react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_6__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_7__.hiddenButtonStyle, disabled: disabled, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.addIcon, title: 'Stage all changes', onClick: this.addAllUnstagedFiles })), collapsible: true, heading: 'Changed', height: height, files: files, rowRenderer: this._renderChangedRow }));
    }
    /**
     * Render the untracked files list.
     *
     * @param files Untracked files
     * @param height Height of the HTML element
     */
    _renderUntracked(files, height) {
        return (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_GitStage__WEBPACK_IMPORTED_MODULE_10__.GitStage, { actions: react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_6__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_7__.hiddenButtonStyle, disabled: files.length === 0, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.addIcon, title: 'Track all untracked files', onClick: this.addAllUntrackedFiles }), collapsible: true, heading: 'Untracked', height: height, files: files, rowRenderer: this._renderUntrackedRow }));
    }
    /**
     * Render the modified files in simple mode.
     *
     * @param files Modified files
     * @param height Height of the HTML element
     */
    _renderSimpleStage(files, height) {
        return (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_GitStage__WEBPACK_IMPORTED_MODULE_10__.GitStage, { actions: react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_6__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_7__.hiddenButtonStyle, disabled: files.length === 0, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.discardIcon, title: 'Discard All Changes', onClick: this.discardAllChanges }), heading: 'Changed', height: height, files: files, rowRenderer: this._renderSimpleStageRow }));
    }
    /**
     * Creates a button element which, depending on the settings, is used
     * to either request a diff of the file, or open the file
     *
     * @param path File path of interest
     * @param currentRef the ref to diff against the git 'HEAD' ref
     */
    _createDiffButton(file) {
        return (((0,_diff_Diff__WEBPACK_IMPORTED_MODULE_11__.isDiffSupported)(file.to) || !file.is_binary) && (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_6__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_7__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.diffIcon, title: 'Diff this file', onClick: () => this._openDiffView(file) })));
    }
    /**
     * Returns a callback which opens a diff of the file
     *
     * @param file File to open diff for
     * @param currentRef the ref to diff against the git 'HEAD' ref
     */
    async _openDiffView(file) {
        try {
            await this.props.commands.execute(_commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitFileDiff, {
                filePath: file.to,
                isText: !file.is_binary,
                status: file.status
            });
        }
        catch (reason) {
            console.error(`Failed to open diff view for ${file.to}.\n${reason}`);
        }
    }
}
//# sourceMappingURL=FileList.js.map

/***/ }),

/***/ "./lib/components/FilePath.js":
/*!************************************!*\
  !*** ./lib/components/FilePath.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FilePath": () => /* binding */ FilePath
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_FilePathStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/FilePathStyle */ "./lib/style/FilePathStyle.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./lib/utils.js");




const FilePath = (props) => {
    const filename = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.extractFilename)(props.filepath);
    const folder = props.filepath
        .slice(0, props.filepath.length - filename.length)
        .replace(/^\/|\/$/g, ''); // Remove leading and trailing '/'
    const icon = props.filetype.icon || _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.fileIcon;
    return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_1__.createElement(icon.react, { className: _style_FilePathStyle__WEBPACK_IMPORTED_MODULE_3__.fileIconStyle, elementPosition: "center", tag: "span" }),
        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_FilePathStyle__WEBPACK_IMPORTED_MODULE_3__.fileLabelStyle },
            filename,
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_FilePathStyle__WEBPACK_IMPORTED_MODULE_3__.folderLabelStyle }, folder))));
};
//# sourceMappingURL=FilePath.js.map

/***/ }),

/***/ "./lib/components/GitPanel.js":
/*!************************************!*\
  !*** ./lib/components/GitPanel.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GitPanel": () => /* binding */ GitPanel
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Tab */ "./node_modules/@material-ui/core/esm/Tab/Tab.js");
/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Tabs */ "./node_modules/@material-ui/core/esm/Tabs/Tabs.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _commandsAndMenu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../commandsAndMenu */ "./lib/commandsAndMenu.js");
/* harmony import */ var _style_GitPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style/GitPanel */ "./lib/style/GitPanel.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens */ "./lib/tokens.js");
/* harmony import */ var _widgets_AuthorBox__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../widgets/AuthorBox */ "./lib/widgets/AuthorBox.js");
/* harmony import */ var _CommitBox__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./CommitBox */ "./lib/components/CommitBox.js");
/* harmony import */ var _FileList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./FileList */ "./lib/components/FileList.js");
/* harmony import */ var _HistorySideBar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./HistorySideBar */ "./lib/components/HistorySideBar.js");
/* harmony import */ var _Toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Toolbar */ "./lib/components/Toolbar.js");














/**
 * React component for rendering a panel for performing Git operations.
 */
class GitPanel extends react__WEBPACK_IMPORTED_MODULE_3__.Component {
    /**
     * Returns a React component for rendering a panel for performing Git operations.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        this.refreshBranch = async () => {
            const { currentBranch } = this.props.model;
            this.setState({
                branches: this.props.model.branches,
                currentBranch: currentBranch ? currentBranch.name : 'master'
            });
        };
        this.refreshHistory = async () => {
            if (this.props.model.pathRepository !== null) {
                // Get git log for current branch
                const logData = await this.props.model.log(this.props.settings.composite['historyCount']);
                let pastCommits = new Array();
                if (logData.code === 0) {
                    pastCommits = logData.commits;
                }
                this.setState({
                    pastCommits: pastCommits
                });
            }
        };
        /**
         * Refresh widget, update all content
         */
        this.refreshView = async () => {
            if (this.props.model.pathRepository !== null) {
                await this.refreshBranch();
                await this.refreshHistory();
            }
        };
        /**
         * Commits all marked files.
         *
         * @param message - commit message
         * @returns a promise which commits the files
         */
        this.commitMarkedFiles = async (message) => {
            this.props.logger.log({
                level: _tokens__WEBPACK_IMPORTED_MODULE_4__.Level.RUNNING,
                message: 'Staging files...'
            });
            await this.props.model.reset();
            await this.props.model.add(...this._markedFiles.map(file => file.to));
            await this.commitStagedFiles(message);
        };
        /**
         * Commits all staged files.
         *
         * @param message - commit message
         * @returns a promise which commits the files
         */
        this.commitStagedFiles = async (message) => {
            if (!message) {
                return;
            }
            const errorLog = {
                level: _tokens__WEBPACK_IMPORTED_MODULE_4__.Level.ERROR,
                message: 'Failed to commit changes.'
            };
            try {
                const res = await this._hasIdentity(this.props.model.pathRepository);
                if (!res) {
                    this.props.logger.log(errorLog);
                    return;
                }
                this.props.logger.log({
                    level: _tokens__WEBPACK_IMPORTED_MODULE_4__.Level.RUNNING,
                    message: 'Committing changes...'
                });
                await this.props.model.commit(message);
                this.props.logger.log({
                    level: _tokens__WEBPACK_IMPORTED_MODULE_4__.Level.SUCCESS,
                    message: 'Committed changes.'
                });
            }
            catch (error) {
                console.error(error);
                this.props.logger.log(Object.assign(Object.assign({}, errorLog), { error }));
            }
        };
        /**
         * Callback invoked upon changing the active panel tab.
         *
         * @param event - event object
         * @param tab - tab number
         */
        this._onTabChange = (event, tab) => {
            if (tab === 1) {
                this.refreshHistory();
            }
            this.setState({
                tab: tab
            });
        };
        this._previousRepoPath = null;
        this.state = {
            branches: [],
            currentBranch: '',
            files: [],
            nCommitsAhead: 0,
            nCommitsBehind: 0,
            pastCommits: [],
            repository: null,
            tab: 0
        };
    }
    /**
     * Callback invoked immediately after mounting a component (i.e., inserting into a tree).
     */
    componentDidMount() {
        const { model, settings } = this.props;
        model.repositoryChanged.connect((_, args) => {
            this.setState({
                repository: args.newValue
            });
            this.refreshView();
        }, this);
        model.statusChanged.connect(() => {
            this.setState({
                files: model.status.files,
                nCommitsAhead: model.status.ahead,
                nCommitsBehind: model.status.behind
            });
        }, this);
        model.headChanged.connect(async () => {
            await this.refreshBranch();
            if (this.state.tab === 1) {
                this.refreshHistory();
            }
        }, this);
        model.markChanged.connect(() => this.forceUpdate(), this);
        settings.changed.connect(this.refreshView, this);
    }
    componentWillUnmount() {
        // Clear all signal connections
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal.clearData(this);
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: _style_GitPanel__WEBPACK_IMPORTED_MODULE_5__.panelWrapperClass }, this.state.repository ? (react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null,
            this._renderToolbar(),
            this._renderMain())) : (this._renderWarning())));
    }
    /**
     * Renders a toolbar.
     *
     * @returns React element
     */
    _renderToolbar() {
        const disableBranching = Boolean(this.props.settings.composite['disableBranchWithChanges'] &&
            (this._hasUnStagedFile() || this._hasStagedFile()));
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_Toolbar__WEBPACK_IMPORTED_MODULE_6__.Toolbar, { currentBranch: this.state.currentBranch, branches: this.state.branches, branching: !disableBranching, commands: this.props.commands, logger: this.props.logger, model: this.props.model, nCommitsAhead: this.state.nCommitsAhead, nCommitsBehind: this.state.nCommitsBehind, repository: this.state.repository || '' }));
    }
    /**
     * Renders the main panel.
     *
     * @returns React element
     */
    _renderMain() {
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null,
            this._renderTabs(),
            this.state.tab === 1 ? this._renderHistory() : this._renderChanges()));
    }
    /**
     * Renders panel tabs.
     *
     * @returns React element
     */
    _renderTabs() {
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7__.default, { classes: {
                root: _style_GitPanel__WEBPACK_IMPORTED_MODULE_5__.tabsClass,
                indicator: _style_GitPanel__WEBPACK_IMPORTED_MODULE_5__.tabIndicatorClass
            }, value: this.state.tab, onChange: this._onTabChange },
            react__WEBPACK_IMPORTED_MODULE_3__.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_8__.default, { classes: {
                    root: _style_GitPanel__WEBPACK_IMPORTED_MODULE_5__.tabClass,
                    selected: _style_GitPanel__WEBPACK_IMPORTED_MODULE_5__.selectedTabClass
                }, title: "View changed files", label: "Changes", disableFocusRipple: true, disableRipple: true }),
            react__WEBPACK_IMPORTED_MODULE_3__.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_8__.default, { classes: {
                    root: _style_GitPanel__WEBPACK_IMPORTED_MODULE_5__.tabClass,
                    selected: _style_GitPanel__WEBPACK_IMPORTED_MODULE_5__.selectedTabClass
                }, title: "View commit history", label: "History", disableFocusRipple: true, disableRipple: true })));
    }
    /**
     * Renders a panel for viewing and committing file changes.
     *
     * @returns React element
     */
    _renderChanges() {
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_3__.createElement(_FileList__WEBPACK_IMPORTED_MODULE_9__.FileList, { files: this._sortedFiles, model: this.props.model, commands: this.props.commands, settings: this.props.settings }),
            this.props.settings.composite['simpleStaging'] ? (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_CommitBox__WEBPACK_IMPORTED_MODULE_10__.CommitBox, { hasFiles: this._markedFiles.length > 0, onCommit: this.commitMarkedFiles })) : (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_CommitBox__WEBPACK_IMPORTED_MODULE_10__.CommitBox, { hasFiles: this._hasStagedFile(), onCommit: this.commitStagedFiles }))));
    }
    /**
     * Renders a panel for viewing commit history.
     *
     * @returns React element
     */
    _renderHistory() {
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_HistorySideBar__WEBPACK_IMPORTED_MODULE_11__.HistorySideBar, { branches: this.state.branches, commits: this.state.pastCommits, model: this.props.model, commands: this.props.commands }));
    }
    /**
     * Renders a panel for prompting a user to find a Git repository.
     *
     * @returns React element
     */
    _renderWarning() {
        const path = this.props.filebrowser.path;
        const { commands } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: _style_GitPanel__WEBPACK_IMPORTED_MODULE_5__.warningTextClass },
                path ? (react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement("b", { title: path }, _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.basename(path)),
                    " is not")) : ('You are not currently in'),
                ' a Git repository. To use Git, navigate to a local repository, initialize a repository here, or clone an existing repository.'),
            react__WEBPACK_IMPORTED_MODULE_3__.createElement("button", { className: _style_GitPanel__WEBPACK_IMPORTED_MODULE_5__.repoButtonClass, onClick: () => commands.execute('filebrowser:toggle-main') }, "Open the FileBrowser"),
            react__WEBPACK_IMPORTED_MODULE_3__.createElement("button", { className: _style_GitPanel__WEBPACK_IMPORTED_MODULE_5__.repoButtonClass, onClick: () => commands.execute(_commandsAndMenu__WEBPACK_IMPORTED_MODULE_12__.CommandIDs.gitInit) }, "Initialize a Repository"),
            react__WEBPACK_IMPORTED_MODULE_3__.createElement("button", { className: _style_GitPanel__WEBPACK_IMPORTED_MODULE_5__.repoButtonClass, onClick: async () => {
                    await commands.execute(_commandsAndMenu__WEBPACK_IMPORTED_MODULE_12__.CommandIDs.gitClone);
                    await commands.execute('filebrowser:toggle-main');
                } }, "Clone a Repository")));
    }
    /**
     * Determines whether a user has a known Git identity.
     *
     * @param path - repository path
     * @returns a promise which returns a success status
     */
    async _hasIdentity(path) {
        // If the repository path changes, check the user identity
        if (path !== this._previousRepoPath) {
            try {
                const data = (await this.props.model.config());
                const options = data['options'];
                const keys = Object.keys(options);
                // If the user name or e-mail is unknown, ask the user to set it
                if (keys.indexOf('user.name') < 0 || keys.indexOf('user.email') < 0) {
                    const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                        title: 'Who is committing?',
                        body: new _widgets_AuthorBox__WEBPACK_IMPORTED_MODULE_13__.GitAuthorForm()
                    });
                    if (!result.button.accept) {
                        console.log('User refuses to set identity.');
                        return false;
                    }
                    const identity = result.value;
                    try {
                        await this.props.model.config({
                            'user.name': identity.name,
                            'user.email': identity.email
                        });
                    }
                    catch (error) {
                        if (error instanceof _tokens__WEBPACK_IMPORTED_MODULE_4__.Git.GitResponseError) {
                            console.log(error);
                            return false;
                        }
                        throw error;
                    }
                }
                this._previousRepoPath = path;
            }
            catch (error) {
                throw new Error('Failed to set your identity. ' + error.message);
            }
        }
        return Promise.resolve(true);
    }
    _hasStagedFile() {
        return this.state.files.some(file => file.status === 'staged' || file.status === 'partially-staged');
    }
    _hasUnStagedFile() {
        return this.state.files.some(file => file.status === 'unstaged' || file.status === 'partially-staged');
    }
    /**
     * List of marked files.
     */
    get _markedFiles() {
        return this._sortedFiles.filter(file => this.props.model.getMark(file.to));
    }
    /**
     * List of sorted modified files.
     */
    get _sortedFiles() {
        const { files } = this.state;
        files.sort((a, b) => a.to.localeCompare(b.to));
        return files;
    }
}
//# sourceMappingURL=GitPanel.js.map

/***/ }),

/***/ "./lib/components/GitStage.js":
/*!************************************!*\
  !*** ./lib/components/GitStage.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GitStage": () => /* binding */ GitStage
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-window */ "webpack/sharing/consume/default/react-window/react-window");
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_window__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/GitStageStyle */ "./lib/style/GitStageStyle.js");




const HEADER_HEIGHT = 34;
const ITEM_HEIGHT = 25;
const GitStage = (props) => {
    const [showFiles, setShowFiles] = react__WEBPACK_IMPORTED_MODULE_1__.useState(true);
    const nFiles = props.files.length;
    return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_3__.sectionFileContainerStyle },
        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_3__.sectionAreaStyle, onClick: () => {
                if (props.collapsible && nFiles > 0) {
                    setShowFiles(!showFiles);
                }
            } },
            props.collapsible && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_3__.changeStageButtonStyle }, showFiles && nFiles > 0 ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.caretDownIcon.react, null)) : (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.caretRightIcon.react, null)))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_3__.sectionHeaderLabelStyle }, props.heading),
            props.actions,
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_3__.sectionHeaderSizeStyle },
                "(",
                nFiles,
                ")")),
        showFiles && nFiles > 0 && (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_window__WEBPACK_IMPORTED_MODULE_2__.FixedSizeList, { height: Math.max(Math.min(props.height - HEADER_HEIGHT, nFiles * ITEM_HEIGHT), ITEM_HEIGHT), itemCount: nFiles, itemData: props.files, itemKey: (index, data) => data[index].to, itemSize: ITEM_HEIGHT, style: { overflowX: 'hidden' }, width: 'auto' }, props.rowRenderer))));
};
//# sourceMappingURL=GitStage.js.map

/***/ }),

/***/ "./lib/components/HistorySideBar.js":
/*!******************************************!*\
  !*** ./lib/components/HistorySideBar.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HistorySideBar": () => /* binding */ HistorySideBar
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_HistorySideBarStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/HistorySideBarStyle */ "./lib/style/HistorySideBarStyle.js");
/* harmony import */ var _PastCommitNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PastCommitNode */ "./lib/components/PastCommitNode.js");



/**
 * Returns a React component for displaying commit history.
 *
 * @param props - component properties
 * @returns React element
 */
const HistorySideBar = (props) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement("ol", { className: _style_HistorySideBarStyle__WEBPACK_IMPORTED_MODULE_1__.historySideBarStyle }, props.commits.map((commit) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_PastCommitNode__WEBPACK_IMPORTED_MODULE_2__.PastCommitNode, { key: commit.commit, commit: commit, branches: props.branches, model: props.model, commands: props.commands })))));
//# sourceMappingURL=HistorySideBar.js.map

/***/ }),

/***/ "./lib/components/NewBranchDialog.js":
/*!*******************************************!*\
  !*** ./lib/components/NewBranchDialog.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewBranchDialog": () => /* binding */ NewBranchDialog
/* harmony export */ });
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Dialog */ "./node_modules/@material-ui/core/esm/Dialog/Dialog.js");
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/DialogActions */ "./node_modules/@material-ui/core/esm/DialogActions/DialogActions.js");
/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/ListItem */ "./node_modules/@material-ui/core/esm/ListItem/ListItem.js");
/* harmony import */ var _material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/Clear */ "./node_modules/@material-ui/icons/Clear.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-window */ "webpack/sharing/consume/default/react-window/react-window");
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_window__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");
/* harmony import */ var _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/NewBranchDialog */ "./lib/style/NewBranchDialog.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../tokens */ "./lib/tokens.js");










const BRANCH_DESC = {
    current: 'The current branch. Pick this if you want to build on work done in this branch.',
    default: 'The default branch. Pick this if you want to start fresh from the default branch.'
};
const ITEM_HEIGHT = 27.5; // HTML element height for a single branch
const CURRENT_BRANCH_HEIGHT = 66.5; // HTML element height for the current branch with description
const HEIGHT = 200; // HTML element height for the branches list
/**
 * React component for rendering a dialog to create a new branch.
 */
class NewBranchDialog extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    /**
     * Returns a React component for rendering a branch menu.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Renders a branch menu item.
         *
         * @param props Row properties
         * @returns React element
         */
        this._renderItem = (props) => {
            const { data, index, style } = props;
            const branch = data[index];
            const isCurrent = branch.name === this.props.currentBranch;
            let isBold;
            let desc;
            if (isCurrent) {
                isBold = true;
                desc = BRANCH_DESC['current'];
            }
            return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_3__.default, { button: true, title: `Create a new branch based on: ${branch.name}`, className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.listItemClass, isCurrent ? _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.activeListItemClass : null), onClick: this._onBranchClickFactory(branch.name), style: style },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_style_icons__WEBPACK_IMPORTED_MODULE_5__.branchIcon.react, { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.listItemIconClass, tag: "span" }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.listItemContentClass },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.listItemTitleClass, isBold ? _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.listItemBoldTitleClass : null) }, branch.name),
                    desc ? react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.listItemDescClass }, desc) : null)));
        };
        /**
         * Callback invoked upon closing the dialog.
         *
         * @param event - event object
         */
        this._onClose = () => {
            this.props.onClose();
            this.setState({
                name: '',
                filter: '',
                error: ''
            });
        };
        /**
         * Callback invoked upon a change to the menu filter.
         *
         * @param event - event object
         */
        this._onFilterChange = (event) => {
            this._branchList.current.resetAfterIndex(0);
            this.setState({
                filter: event.target.value
            });
        };
        /**
         * Callback invoked to reset the menu filter.
         */
        this._resetFilter = () => {
            this._branchList.current.resetAfterIndex(0);
            this.setState({
                filter: ''
            });
        };
        /**
         * Callback invoked upon a change to the branch name input element.
         *
         * @param event - event object
         */
        this._onNameChange = (event) => {
            this.setState({
                name: event.target.value,
                error: ''
            });
        };
        /**
         * Callback invoked upon clicking a button to create a new branch.
         *
         * @param event - event object
         */
        this._onCreate = () => {
            // Create the branch:
            this._createBranch(this.state.name);
        };
        this._branchList = react__WEBPACK_IMPORTED_MODULE_0__.createRef();
        this.state = {
            name: '',
            base: props.currentBranch || '',
            filter: '',
            error: ''
        };
    }
    /**
     * Renders a dialog for creating a new branch.
     *
     * @returns React element
     */
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_6__.default, { classes: {
                paper: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.branchDialogClass
            }, open: this.props.open, onClose: this._onClose },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.titleWrapperClass },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.titleClass }, "Create a Branch"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.closeButtonClass },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_7__.default, { titleAccess: "Close this dialog", fontSize: "small", onClick: this._onClose }))),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.contentWrapperClass },
                this.state.error ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.errorMessageClass }, this.state.error)) : null,
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Name"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.nameInputClass, type: "text", onChange: this._onNameChange, value: this.state.name, placeholder: "", title: "Enter a branch name" }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Create branch based on..."),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.filterWrapperClass },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.filterClass },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.filterInputClass, type: "text", onChange: this._onFilterChange, value: this.state.filter, placeholder: "Filter", title: "Filter branch menu" }),
                        this.state.filter ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.filterClearClass },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_7__.default, { titleAccess: "Clear the current filter", fontSize: "small", onClick: this._resetFilter }))) : null)),
                this._renderItems()),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_8__.default, { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.actionsWrapperClass },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.buttonClass, _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.cancelButtonClass), type: "button", title: "Close this dialog without creating a new branch", value: "Cancel", onClick: this._onClose }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.buttonClass, _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.createButtonClass), type: "button", title: "Create a new branch", value: "Create Branch", onClick: this._onCreate, disabled: this.state.name === '' || this.state.error !== '' }))));
    }
    /**
     * Renders branch menu items.
     *
     * @returns array of React elements
     */
    _renderItems() {
        const current = this.props.currentBranch;
        // Perform a "simple" filter... (TODO: consider implementing fuzzy filtering)
        const filter = this.state.filter;
        const branches = this.props.branches
            .filter(branch => !filter || branch.name.includes(filter))
            .slice()
            .sort(comparator);
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_window__WEBPACK_IMPORTED_MODULE_1__.VariableSizeList, { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.listWrapperClass, height: HEIGHT, estimatedItemSize: ITEM_HEIGHT, itemCount: branches.length, itemData: branches, itemKey: (index, data) => data[index].name, itemSize: index => {
                const branch = branches[index];
                return branch.name === this.props.currentBranch
                    ? CURRENT_BRANCH_HEIGHT
                    : ITEM_HEIGHT;
            }, ref: this._branchList, style: { overflowX: 'hidden' }, width: 'auto' }, this._renderItem));
        /**
         * Comparator function for sorting branches.
         *
         * @private
         * @param a - first branch
         * @param b - second branch
         * @returns integer indicating sort order
         */
        function comparator(a, b) {
            if (a.name === current) {
                return -1;
            }
            else if (b.name === current) {
                return 1;
            }
            if (a.name === 'master') {
                return -1;
            }
            else if (b.name === 'master') {
                return 1;
            }
            if (a.name === 'main') {
                return -1;
            }
            else if (b.name === 'main') {
                return 1;
            }
            return 0;
        }
    }
    /**
     * Returns a callback which is invoked upon clicking a branch name.
     *
     * @param branch - branch name
     * @returns callback
     */
    _onBranchClickFactory(branch) {
        const self = this;
        return onClick;
        /**
         * Callback invoked upon clicking a branch name.
         *
         * @private
         * @param event - event object
         */
        function onClick() {
            self.setState({
                base: branch
            });
        }
    }
    /**
     * Creates a new branch.
     *
     * @param branch - branch name
     * @returns promise which resolves upon attempting to create a new branch
     */
    async _createBranch(branch) {
        const opts = {
            newBranch: true,
            branchname: branch
        };
        this.props.logger.log({
            level: _tokens__WEBPACK_IMPORTED_MODULE_9__.Level.RUNNING,
            message: 'Creating branch...'
        });
        try {
            await this.props.model.checkout(opts);
        }
        catch (err) {
            this.setState({
                error: err.message.replace(/^fatal:/, '')
            });
            this.props.logger.log({
                level: _tokens__WEBPACK_IMPORTED_MODULE_9__.Level.ERROR,
                message: 'Failed to create branch.'
            });
            return;
        }
        this.props.logger.log({
            level: _tokens__WEBPACK_IMPORTED_MODULE_9__.Level.SUCCESS,
            message: 'Branch created.'
        });
        // Close the branch dialog:
        this.props.onClose();
        // Reset the branch name and filter:
        this._branchList.current.resetAfterIndex(0);
        this.setState({
            name: '',
            filter: ''
        });
    }
}
//# sourceMappingURL=NewBranchDialog.js.map

/***/ }),

/***/ "./lib/components/PastCommitNode.js":
/*!******************************************!*\
  !*** ./lib/components/PastCommitNode.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PastCommitNode": () => /* binding */ PastCommitNode
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/PastCommitNode */ "./lib/style/PastCommitNode.js");
/* harmony import */ var _SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SinglePastCommitInfo */ "./lib/components/SinglePastCommitInfo.js");





/**
 * React component for rendering an individual commit.
 */
class PastCommitNode extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    /**
     * Returns a React component for rendering an individual commit.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Callback invoked upon clicking on an individual commit.
         *
         * @param event - event object
         */
        this._onCommitClick = () => {
            this.setState({
                expanded: !this.state.expanded
            });
        };
        this.state = {
            expanded: false
        };
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("li", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.commitWrapperClass, this.state.expanded ? _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.commitExpandedClass : null), onClick: this._onCommitClick },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.commitHeaderClass },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.commitHeaderItemClass }, this.props.commit.author),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.commitHeaderItemClass }, this.props.commit.commit.slice(0, 7)),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.commitHeaderItemClass }, this.props.commit.date),
                this.state.expanded ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.caretUpIcon.react, { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.iconButtonClass, tag: "span" })) : (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.caretDownIcon.react, { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.iconButtonClass, tag: "span" }))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.branchWrapperClass }, this._renderBranches()),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.commitBodyClass },
                this.props.commit.commit_msg,
                this.state.expanded && (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_4__.SinglePastCommitInfo, { commit: this.props.commit, model: this.props.model, commands: this.props.commands })))));
    }
    /**
     * Renders branch information.
     *
     * @returns array of React elements
     */
    _renderBranches() {
        const curr = this.props.commit.commit;
        const branches = [];
        for (let i = 0; i < this.props.branches.length; i++) {
            const branch = this.props.branches[i];
            if (branch.top_commit && branch.top_commit === curr) {
                branches.push(branch);
            }
        }
        return branches.map(this._renderBranch, this);
    }
    /**
     * Renders individual branch data.
     *
     * @param branch - branch data
     * @returns React element
     */
    _renderBranch(branch) {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, { key: branch.name },
            branch.is_current_branch && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.branchClass, _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.workingBranchClass) }, "working")),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.branchClass, branch.is_remote_branch ? _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.remoteBranchClass : _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.localBranchClass) }, branch.name)));
    }
}
//# sourceMappingURL=PastCommitNode.js.map

/***/ }),

/***/ "./lib/components/ResetRevertDialog.js":
/*!*********************************************!*\
  !*** ./lib/components/ResetRevertDialog.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResetRevertDialog": () => /* binding */ ResetRevertDialog
/* harmony export */ });
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Dialog */ "./node_modules/@material-ui/core/esm/Dialog/Dialog.js");
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/DialogActions */ "./node_modules/@material-ui/core/esm/DialogActions/DialogActions.js");
/* harmony import */ var _material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/icons/Clear */ "./node_modules/@material-ui/icons/Clear.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_textarea_autosize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-textarea-autosize */ "webpack/sharing/consume/default/react-textarea-autosize/react-textarea-autosize");
/* harmony import */ var react_textarea_autosize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_textarea_autosize__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/ResetRevertDialog */ "./lib/style/ResetRevertDialog.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../tokens */ "./lib/tokens.js");








/**
 * React component for rendering a dialog for resetting or reverting a single commit.
 */
class ResetRevertDialog extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    /**
     * Returns a React component for resetting or reverting a single commit.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Callback invoked upon updating a commit message summary.
         *
         * @param event - event object
         */
        this._onSummaryChange = (event) => {
            this.setState({
                summary: event.target.value
            });
        };
        /**
         * Callback invoked upon updating a commit message description.
         *
         * @param event - event object
         */
        this._onDescriptionChange = (event) => {
            this.setState({
                description: event.target.value
            });
        };
        /**
         * Callback invoked upon clicking on a dialog.
         *
         * @param event - event object
         */
        this._onClick = (event) => {
            event.stopPropagation();
        };
        /**
         * Callback invoked upon closing the dialog.
         *
         * @param event - event object
         */
        this._onClose = (event) => {
            event.stopPropagation();
            this.props.onClose();
            this._reset();
        };
        /**
         * Callback invoked upon clicking a button to reset or revert a commit.
         *
         * @param event - event object
         */
        this._onSubmit = async () => {
            this.setState({
                disabled: true
            });
            if (this.props.action === 'reset') {
                this._resetCommit(this.props.commit.commit);
            }
            else {
                this._revertCommit(this.props.commit.commit);
            }
            this._reset();
            this.props.onClose();
        };
        this.state = {
            summary: '',
            description: '',
            disabled: false
        };
    }
    /**
     * Renders a dialog.
     *
     * @returns React element
     */
    render() {
        const shortCommit = this.props.commit.commit.slice(0, 7);
        const isRevert = this.props.action === 'revert';
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_3__.default, { classes: {
                paper: _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.resetRevertDialogClass
            }, open: this.props.open, onClick: this._onClick, onClose: this._onClose },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.titleWrapperClass },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.titleClass }, isRevert ? 'Revert Changes' : 'Reset Changes'),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.closeButtonClass },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_5__.default, { titleAccess: "Close this dialog", fontSize: "small", onClick: this._onClose }))),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.contentWrapperClass },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, isRevert
                    ? "These changes will be reverted. Only commit if you're sure you're okay losing these changes."
                    : `All changes after commit ${shortCommit} will be gone forever (hard reset). Are you sure?`),
                isRevert ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.commitFormClass },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { className: _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.commitSummaryClass, type: "text", placeholder: this._defaultSummary(), title: "Enter a commit message summary (a single line, preferably less than 50 characters)", value: this.state.summary, onChange: this._onSummaryChange }),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement((react_textarea_autosize__WEBPACK_IMPORTED_MODULE_1___default()), { className: _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.commitDescriptionClass, minRows: 5, placeholder: this._defaultDescription(), title: "Enter a commit message description", value: this.state.description, onChange: this._onDescriptionChange }))) : null),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_6__.default, { className: _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.actionsWrapperClass },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { disabled: this.state.disabled, className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.buttonClass, _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.cancelButtonClass), type: "button", title: "Cancel changes", value: "Cancel", onClick: this._onClose }),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { disabled: this.state.disabled, className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.buttonClass, _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.submitButtonClass), type: "button", title: "Submit changes", value: "Submit", onClick: this._onSubmit }))));
    }
    /**
     * Reset the current branch on the provided commit
     *
     * @param hash Git commit hash
     */
    async _resetCommit(hash) {
        this.props.logger.log({
            level: _tokens__WEBPACK_IMPORTED_MODULE_7__.Level.RUNNING,
            message: 'Discarding changes...'
        });
        try {
            await this.props.model.resetToCommit(hash);
            this.props.logger.log({
                level: _tokens__WEBPACK_IMPORTED_MODULE_7__.Level.SUCCESS,
                message: 'Successfully discarded changes.'
            });
        }
        catch (error) {
            this.props.logger.log({
                level: _tokens__WEBPACK_IMPORTED_MODULE_7__.Level.ERROR,
                message: 'Failed to discard changes.',
                error: new Error(`Failed to discard changes after ${hash.slice(0, 7)}: ${error}`)
            });
        }
    }
    /**
     * Revert the provided commit.
     *
     * @param hash Git commit hash
     */
    async _revertCommit(hash) {
        this.props.logger.log({
            level: _tokens__WEBPACK_IMPORTED_MODULE_7__.Level.RUNNING,
            message: 'Reverting changes...'
        });
        try {
            await this.props.model.revertCommit(this._commitMessage(), hash);
            this.props.logger.log({
                level: _tokens__WEBPACK_IMPORTED_MODULE_7__.Level.SUCCESS,
                message: 'Successfully reverted changes.'
            });
        }
        catch (error) {
            this.props.logger.log({
                level: _tokens__WEBPACK_IMPORTED_MODULE_7__.Level.ERROR,
                message: 'Failed to revert changes.',
                error: new Error(`Failed to revert ${hash.slice(0, 7)}: ${error}`)
            });
        }
    }
    /**
     * Returns a default commit summary for reverting a commit.
     *
     * @returns default commit summary
     */
    _defaultSummary() {
        const summary = this.props.commit.commit_msg.split('\n')[0];
        return `Revert "${summary}"`;
    }
    /**
     * Returns a default commit description for reverting a commit.
     *
     * @returns default commit description
     */
    _defaultDescription() {
        return `This reverts commit ${this.props.commit.commit}`;
    }
    /**
     * Returns a commit message for reverting a commit.
     *
     * @returns commit message
     */
    _commitMessage() {
        const summary = this.state.summary || this._defaultSummary();
        const desc = this.state.description || this._defaultDescription();
        return summary + '\n\n' + desc + '\n';
    }
    /**
     * Resets component state.
     */
    _reset() {
        this.setState({
            summary: '',
            description: '',
            disabled: false
        });
    }
}
//# sourceMappingURL=ResetRevertDialog.js.map

/***/ }),

/***/ "./lib/components/SinglePastCommitInfo.js":
/*!************************************************!*\
  !*** ./lib/components/SinglePastCommitInfo.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SinglePastCommitInfo": () => /* binding */ SinglePastCommitInfo
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-window */ "webpack/sharing/consume/default/react-window/react-window");
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_window__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _commandsAndMenu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../commandsAndMenu */ "./lib/commandsAndMenu.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../logger */ "./lib/logger.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");
/* harmony import */ var _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style/SinglePastCommitInfo */ "./lib/style/SinglePastCommitInfo.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ActionButton */ "./lib/components/ActionButton.js");
/* harmony import */ var _diff_Diff__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./diff/Diff */ "./lib/components/diff/Diff.js");
/* harmony import */ var _FilePath__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FilePath */ "./lib/components/FilePath.js");
/* harmony import */ var _ResetRevertDialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ResetRevertDialog */ "./lib/components/ResetRevertDialog.js");












const ITEM_HEIGHT = 24; // File list item height
const MAX_VISIBLE_FILES = 20; // Maximal number of file display at once
/**
 * React component for rendering information about an individual commit.
 */
class SinglePastCommitInfo extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    /**
     * Returns a React component for information about an individual commit.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Renders a modified file.
         *
         * @param props Row properties
         * @returns React element
         */
        this._renderFile = (props) => {
            const { data, index, style } = props;
            const file = data[index];
            const path = file.modified_file_path;
            const flg = (0,_diff_Diff__WEBPACK_IMPORTED_MODULE_4__.isDiffSupported)(path) || !file.is_binary;
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("li", { className: _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.commitDetailFileClass, onClick: this._onDiffClickFactory(path, flg), style: style, title: path },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_FilePath__WEBPACK_IMPORTED_MODULE_6__.FilePath, { filepath: path, filetype: file.type }),
                flg ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_7__.ActionButton, { icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.diffIcon, title: "View file changes" })) : null));
        };
        /**
         * Callback invoked upon a clicking a button to revert changes.
         *
         * @param event - event object
         */
        this._onRevertClick = (event) => {
            event.stopPropagation();
            this.setState({
                resetRevertDialog: true,
                resetRevertAction: 'revert'
            });
        };
        /**
         * Callback invoked upon a clicking a button to reset changes.
         *
         * @param event - event object
         */
        this._onResetClick = (event) => {
            event.stopPropagation();
            this.setState({
                resetRevertDialog: true,
                resetRevertAction: 'reset'
            });
        };
        /**
         * Callback invoked upon closing a dialog to reset or revert changes.
         */
        this._onResetRevertDialogClose = () => {
            this.setState({
                resetRevertDialog: false
            });
        };
        this.state = {
            info: '',
            numFiles: '',
            insertions: '',
            deletions: '',
            modifiedFiles: [],
            loadingState: 'loading',
            resetRevertDialog: false,
            resetRevertAction: 'reset'
        };
    }
    /**
     * Callback invoked immediately after mounting a component (i.e., inserting into a tree).
     */
    async componentDidMount() {
        try {
            const log = await this.props.model.detailedLog(this.props.commit.commit);
            this.setState({
                info: log.modified_file_note,
                numFiles: log.modified_files_count,
                insertions: log.number_of_insertions,
                deletions: log.number_of_deletions,
                modifiedFiles: log.modified_files,
                loadingState: 'success'
            });
        }
        catch (err) {
            console.error(`Error while getting detailed log for commit ${this.props.commit.commit} and path ${this.props.model.pathRepository}`, err);
            this.setState({ loadingState: 'error' });
            return;
        }
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        if (this.state.loadingState === 'loading') {
            return react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, "...");
        }
        if (this.state.loadingState === 'error') {
            return react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, "Error loading commit data");
        }
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.commitClass },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.commitOverviewNumbersClass },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { title: "# Files Changed" },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.fileIcon.react, { className: _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.iconClass, tag: "span" }),
                        this.state.numFiles),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { title: "# Insertions" },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement(_style_icons__WEBPACK_IMPORTED_MODULE_8__.insertionsMadeIcon.react, { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_3__.classes)(_style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.iconClass, _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.insertionsIconClass), tag: "span" }),
                        this.state.insertions),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { title: "# Deletions" },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement(_style_icons__WEBPACK_IMPORTED_MODULE_8__.deletionsMadeIcon.react, { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_3__.classes)(_style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.iconClass, _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.deletionsIconClass), tag: "span" }),
                        this.state.deletions))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.commitDetailClass },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.commitDetailHeaderClass },
                    "Changed",
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_7__.ActionButton, { className: _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.actionButtonClass, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.discardIcon, title: "Revert changes introduced by this commit", onClick: this._onRevertClick }),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_7__.ActionButton, { className: _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.actionButtonClass, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.rewindIcon, title: "Discard changes introduced *after* this commit (hard reset)", onClick: this._onResetClick }),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement(_logger__WEBPACK_IMPORTED_MODULE_9__.LoggerContext.Consumer, null, logger => (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_10__.ResetRevertDialog, { open: this.state.resetRevertDialog, action: this.state.resetRevertAction, model: this.props.model, logger: logger, commit: this.props.commit, onClose: this._onResetRevertDialogClose })))),
                this.state.modifiedFiles.length > 0 && (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_window__WEBPACK_IMPORTED_MODULE_2__.FixedSizeList, { className: _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.fileListClass, height: Math.min(MAX_VISIBLE_FILES, this.state.modifiedFiles.length) *
                        ITEM_HEIGHT, innerElementType: "ul", itemCount: this.state.modifiedFiles.length, itemData: this.state.modifiedFiles, itemKey: (index, data) => data[index].modified_file_path, itemSize: ITEM_HEIGHT, style: { overflowX: 'hidden' }, width: 'auto' }, this._renderFile)))));
    }
    /**
     * Returns a callback to be invoked clicking a button to display a file diff.
     *
     * @param fpath - modified file path
     * @param bool - boolean indicating whether a displaying a diff is supported for this file path
     * @returns callback
     */
    _onDiffClickFactory(fpath, bool) {
        const self = this;
        if (bool) {
            return onShowDiff;
        }
        return onClick;
        /**
         * Callback invoked upon clicking a button to display a file diff.
         *
         * @private
         * @param event - event object
         */
        function onClick(event) {
            // Prevent the commit component from being collapsed:
            event.stopPropagation();
        }
        /**
         * Callback invoked upon clicking a button to display a file diff.
         *
         * @private
         * @param event - event object
         */
        async function onShowDiff(event) {
            // Prevent the commit component from being collapsed:
            event.stopPropagation();
            try {
                self.props.commands.execute(_commandsAndMenu__WEBPACK_IMPORTED_MODULE_11__.CommandIDs.gitFileDiff, {
                    filePath: fpath,
                    isText: bool,
                    context: {
                        previousRef: {
                            gitRef: self.props.commit.pre_commit
                        },
                        currentRef: {
                            gitRef: self.props.commit.commit
                        }
                    }
                });
            }
            catch (err) {
                console.error(`Failed to open diff view for ${fpath}.\n${err}`);
            }
        }
    }
}
//# sourceMappingURL=SinglePastCommitInfo.js.map

/***/ }),

/***/ "./lib/components/SuspendModal.js":
/*!****************************************!*\
  !*** ./lib/components/SuspendModal.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SuspendModal": () => /* binding */ SuspendModal
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Modal */ "./node_modules/@material-ui/core/esm/Modal/Modal.js");
/* harmony import */ var _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/CircularProgress */ "./node_modules/@material-ui/core/esm/CircularProgress/CircularProgress.js");
/* harmony import */ var _style_SuspendModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/SuspendModal */ "./lib/style/SuspendModal.js");




/**
 * React component for rendering a modal blocking UI interaction.
 */
class SuspendModal extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    /**
     * Returns a React component for rendering a modal.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Callback invoked upon clicking on a feedback modal.
         *
         * @param event - event object
         */
        this._onClick = (event) => {
            this.props.onClick && this.props.onClick(event);
        };
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Modal__WEBPACK_IMPORTED_MODULE_1__.default, { disableAutoFocus: true, disableEnforceFocus: true, open: this.props.open, onClick: this._onClick },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _style_SuspendModal__WEBPACK_IMPORTED_MODULE_2__.fullscreenProgressClass },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_3__.default, { color: "inherit" }))));
    }
}
//# sourceMappingURL=SuspendModal.js.map

/***/ }),

/***/ "./lib/components/TagMenu.js":
/*!***********************************!*\
  !*** ./lib/components/TagMenu.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TagMenu": () => /* binding */ TagMenu
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/List */ "./node_modules/@material-ui/core/esm/List/List.js");
/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/ListItem */ "./node_modules/@material-ui/core/esm/ListItem/ListItem.js");
/* harmony import */ var _material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/icons/Clear */ "./node_modules/@material-ui/icons/Clear.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-window */ "webpack/sharing/consume/default/react-window/react-window");
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_window__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_BranchMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../style/BranchMenu */ "./lib/style/BranchMenu.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens */ "./lib/tokens.js");









const CHANGES_ERR_MSG = 'The repository contains files with uncommitted changes. Please commit or discard these changes before switching to a tag.';
const ITEM_HEIGHT = 24.8; // HTML element height for a single branch
const MIN_HEIGHT = 150; // Minimal HTML element height for the tags list
const MAX_HEIGHT = 400; // Maximal HTML element height for the tags list
/**
 * Callback invoked upon encountering an error when switching tags.
 *
 * @private
 * @param error - error
 * @param logger - the logger
 */
function onTagError(error, logger) {
    if (error.message.includes('following files would be overwritten')) {
        // Empty log message to hide the executing alert
        logger.log({
            message: '',
            level: _tokens__WEBPACK_IMPORTED_MODULE_3__.Level.INFO
        });
        (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
            title: 'Unable to checkout tag',
            body: (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "Your changes to the following files would be overwritten by switching:"),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_4__.default, null, error.message.split('\n').slice(1, -3).map(renderFileName)),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Please commit, stash, or discard your changes before you checkout tags."))),
            buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'Dismiss' })]
        });
    }
    else {
        logger.log({
            level: _tokens__WEBPACK_IMPORTED_MODULE_3__.Level.ERROR,
            message: 'Failed to checkout tag.',
            error
        });
    }
}
/**
 * Renders a file name.
 *
 * @private
 * @param filename - file name
 * @returns React element
 */
function renderFileName(filename) {
    return react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_5__.default, { key: filename }, filename);
}
/**
 * React component for rendering a branch menu.
 */
class TagMenu extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    /**
     * Returns a React component for rendering a branch menu.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Renders a menu item.
         *
         * @param props Row properties
         * @returns React element
         */
        this._renderItem = (props) => {
            const { data, index, style } = props;
            const tag = data[index];
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_5__.default, { button: true, title: `Checkout to tag: ${tag}`, className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_6__.listItemClass, onClick: this._onTagClickFactory(tag), style: style },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_style_icons__WEBPACK_IMPORTED_MODULE_7__.tagIcon.react, { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_6__.listItemIconClass, tag: "span" }),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_6__.nameClass }, tag)));
        };
        /**
         * Callback invoked upon a change to the menu filter.
         *
         * @param event - event object
         */
        this._onFilterChange = (event) => {
            this.setState({
                filter: event.target.value
            });
        };
        /**
         * Callback invoked to reset the menu filter.
         */
        this._resetFilter = () => {
            this.setState({
                filter: ''
            });
        };
        this.state = {
            filter: '',
            tags: []
        };
    }
    componentDidMount() {
        this.props.model
            .tags()
            .then(response => {
            this.setState({
                tags: response.tags
            });
        })
            .catch(error => {
            console.error(error);
            this.setState({
                tags: []
            });
            (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)('Fail to get the tags.', error);
        });
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_6__.wrapperClass },
            this._renderFilter(),
            this._renderTagList()));
    }
    /**
     * Renders a branch input filter.
     *
     * @returns React element
     */
    _renderFilter() {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_6__.filterWrapperClass },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_6__.filterClass },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_6__.filterInputClass, type: "text", onChange: this._onFilterChange, value: this.state.filter, placeholder: "Filter", title: "Filter branch menu" }),
                this.state.filter ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_6__.filterClearClass },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_8__.default, { titleAccess: "Clear the current filter", fontSize: "small", onClick: this._resetFilter }))) : null)));
    }
    /**
     * Renders a
     *
     * @returns React element
     */
    _renderTagList() {
        // Perform a "simple" filter... (TODO: consider implementing fuzzy filtering)
        const filter = this.state.filter;
        const tags = this.state.tags.filter(tag => !filter || tag.includes(filter));
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_window__WEBPACK_IMPORTED_MODULE_2__.FixedSizeList, { height: Math.min(Math.max(MIN_HEIGHT, tags.length * ITEM_HEIGHT), MAX_HEIGHT), itemCount: tags.length, itemData: tags, itemKey: (index, data) => data[index], itemSize: ITEM_HEIGHT, style: { overflowX: 'hidden', paddingTop: 0, paddingBottom: 0 }, width: 'auto' }, this._renderItem));
    }
    /**
     * Returns a callback which is invoked upon clicking a tag.
     *
     * @param branch - tag
     * @returns callback
     */
    _onTagClickFactory(tag) {
        const self = this;
        return onClick;
        /**
         * Callback invoked upon clicking a tag.
         *
         * @private
         * @param event - event object
         * @returns promise which resolves upon attempting to switch tags
         */
        async function onClick() {
            if (!self.props.branching) {
                (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)('Checkout tags is disabled', CHANGES_ERR_MSG);
                return;
            }
            self.props.logger.log({
                level: _tokens__WEBPACK_IMPORTED_MODULE_3__.Level.RUNNING,
                message: 'Checking tag out...'
            });
            try {
                await self.props.model.checkoutTag(tag);
            }
            catch (err) {
                return onTagError(err, self.props.logger);
            }
            self.props.logger.log({
                level: _tokens__WEBPACK_IMPORTED_MODULE_3__.Level.SUCCESS,
                message: 'Tag checkout.'
            });
        }
    }
}
//# sourceMappingURL=TagMenu.js.map

/***/ }),

/***/ "./lib/components/Toolbar.js":
/*!***********************************!*\
  !*** ./lib/components/Toolbar.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Toolbar": () => /* binding */ Toolbar
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "webpack/sharing/consume/default/@material-ui/core/@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _commandsAndMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../commandsAndMenu */ "./lib/commandsAndMenu.js");
/* harmony import */ var _style_GitPanel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../style/GitPanel */ "./lib/style/GitPanel.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");
/* harmony import */ var _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../style/Toolbar */ "./lib/style/Toolbar.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tokens */ "./lib/tokens.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ActionButton */ "./lib/components/ActionButton.js");
/* harmony import */ var _BranchMenu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./BranchMenu */ "./lib/components/BranchMenu.js");
/* harmony import */ var _TagMenu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./TagMenu */ "./lib/components/TagMenu.js");













/**
 * React component for rendering a panel toolbar.
 */
class Toolbar extends react__WEBPACK_IMPORTED_MODULE_3__.Component {
    /**
     * Returns a React component for rendering a panel toolbar.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Callback invoked upon clicking a button to pull the latest changes.
         *
         * @param event - event object
         * @returns a promise which resolves upon pulling the latest changes
         */
        this._onPullClick = async () => {
            await this.props.commands.execute(_commandsAndMenu__WEBPACK_IMPORTED_MODULE_5__.CommandIDs.gitPull);
        };
        /**
         * Callback invoked upon clicking a button to push the latest changes.
         *
         * @param event - event object
         * @returns a promise which resolves upon pushing the latest changes
         */
        this._onPushClick = async () => {
            await this.props.commands.execute(_commandsAndMenu__WEBPACK_IMPORTED_MODULE_5__.CommandIDs.gitPush);
        };
        /**
         * Callback invoked upon clicking a button to change the current branch.
         *
         * @param event - event object
         */
        this._onBranchClick = () => {
            // Toggle the branch menu:
            this.setState({
                branchMenu: !this.state.branchMenu
            });
        };
        /**
         * Callback invoked upon clicking a button to refresh the model.
         *
         * @param event - event object
         * @returns a promise which resolves upon refreshing the model
         */
        this._onRefreshClick = async () => {
            this.props.logger.log({
                level: _tokens__WEBPACK_IMPORTED_MODULE_6__.Level.RUNNING,
                message: 'Refreshing...'
            });
            try {
                await this.props.model.refresh();
                this.props.logger.log({
                    level: _tokens__WEBPACK_IMPORTED_MODULE_6__.Level.SUCCESS,
                    message: 'Successfully refreshed.'
                });
            }
            catch (error) {
                console.error(error);
                this.props.logger.log({
                    level: _tokens__WEBPACK_IMPORTED_MODULE_6__.Level.ERROR,
                    message: 'Failed to refresh.',
                    error
                });
            }
        };
        this.state = {
            branchMenu: false,
            tab: 0
        };
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarClass },
            this._renderTopNav(),
            this._renderRepoMenu(),
            this._renderBranchMenu()));
    }
    /**
     * Renders the top navigation.
     *
     * @returns React element
     */
    _renderTopNav() {
        var _a;
        const activeBranch = this.props.branches.filter(branch => branch.is_current_branch);
        // FIXME whether the repository as a remote or not should be done through a call to `git remote`
        const hasRemote = this.props.branches.some(branch => branch.is_remote_branch);
        const hasUpstream = ((_a = activeBranch[0]) === null || _a === void 0 ? void 0 : _a.upstream) !== null;
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarNavClass },
            react__WEBPACK_IMPORTED_MODULE_3__.createElement("span", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.spacer }),
            react__WEBPACK_IMPORTED_MODULE_3__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__.Badge, { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.badgeClass, variant: "dot", invisible: !hasRemote || this.props.nCommitsBehind === 0, "data-test-id": "pull-badge" },
                react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_8__.ActionButton, { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarButtonClass, disabled: !hasRemote, icon: _style_icons__WEBPACK_IMPORTED_MODULE_9__.pullIcon, onClick: hasRemote ? this._onPullClick : undefined, title: hasRemote
                        ? 'Pull latest changes' +
                            (this.props.nCommitsBehind > 0
                                ? ` (behind by ${this.props.nCommitsBehind} commits)`
                                : '')
                        : 'No remote repository defined' })),
            react__WEBPACK_IMPORTED_MODULE_3__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__.Badge, { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.badgeClass, variant: "dot", invisible: !hasRemote || (this.props.nCommitsAhead === 0 && hasUpstream), "data-test-id": "push-badge" },
                react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_8__.ActionButton, { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarButtonClass, disabled: !hasRemote, icon: _style_icons__WEBPACK_IMPORTED_MODULE_9__.pushIcon, onClick: hasRemote ? this._onPushClick : undefined, title: hasRemote
                        ? hasUpstream
                            ? 'Push committed changes' +
                                (this.props.nCommitsAhead > 0
                                    ? ` (ahead by ${this.props.nCommitsAhead} commits)`
                                    : '')
                            : 'Publish branch'
                        : 'No remote repository defined' })),
            react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_8__.ActionButton, { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarButtonClass, icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.refreshIcon, onClick: this._onRefreshClick, title: 'Refresh the repository to detect local and remote changes' })));
    }
    /**
     * Renders a repository menu.
     *
     * @returns React element
     */
    _renderRepoMenu() {
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarMenuWrapperClass },
            react__WEBPACK_IMPORTED_MODULE_3__.createElement("button", { disabled: true, className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarMenuButtonClass, title: `Current repository: ${this.props.repository}` },
                react__WEBPACK_IMPORTED_MODULE_3__.createElement(_style_icons__WEBPACK_IMPORTED_MODULE_9__.desktopIcon.react, { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarMenuButtonIconClass }),
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarMenuButtonTitleWrapperClass },
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement("p", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarMenuButtonTitleClass }, "Current Repository"),
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement("p", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarMenuButtonSubtitleClass }, _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.basename(this.props.repository))))));
    }
    /**
     * Renders a branch menu.
     *
     * @returns React element
     */
    _renderBranchMenu() {
        if (!this.props.model.pathRepository) {
            return null;
        }
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarMenuWrapperClass },
            react__WEBPACK_IMPORTED_MODULE_3__.createElement("button", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_4__.classes)(_style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarMenuButtonClass, _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarMenuButtonEnabledClass), title: 'Manage branches and tags', onClick: this._onBranchClick },
                react__WEBPACK_IMPORTED_MODULE_3__.createElement(_style_icons__WEBPACK_IMPORTED_MODULE_9__.branchIcon.react, { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarMenuButtonIconClass }),
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarMenuButtonTitleWrapperClass },
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement("p", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarMenuButtonTitleClass }, "Current Branch"),
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement("p", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarMenuButtonSubtitleClass }, this.props.currentBranch || '')),
                this.state.branchMenu ? (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.caretUpIcon.react, { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarMenuButtonIconClass })) : (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.caretDownIcon.react, { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_7__.toolbarMenuButtonIconClass }))),
            this.state.branchMenu ? this._renderTabs() : null));
    }
    _renderTabs() {
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_3__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__.Tabs, { classes: {
                    root: _style_GitPanel__WEBPACK_IMPORTED_MODULE_10__.tabsClass,
                    indicator: _style_GitPanel__WEBPACK_IMPORTED_MODULE_10__.tabIndicatorClass
                }, value: this.state.tab, onChange: (event, tab) => {
                    this.setState({
                        tab: tab
                    });
                } },
                react__WEBPACK_IMPORTED_MODULE_3__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__.Tab, { classes: {
                        root: _style_GitPanel__WEBPACK_IMPORTED_MODULE_10__.tabClass,
                        selected: _style_GitPanel__WEBPACK_IMPORTED_MODULE_10__.selectedTabClass
                    }, title: "View branches", label: "Branches", disableFocusRipple: true, disableRipple: true }),
                react__WEBPACK_IMPORTED_MODULE_3__.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__.Tab, { classes: {
                        root: _style_GitPanel__WEBPACK_IMPORTED_MODULE_10__.tabClass,
                        selected: _style_GitPanel__WEBPACK_IMPORTED_MODULE_10__.selectedTabClass
                    }, title: "View tags", label: "Tags", disableFocusRipple: true, disableRipple: true })),
            this.state.tab === 0 ? this._renderBranches() : this._renderTags()));
    }
    _renderBranches() {
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_BranchMenu__WEBPACK_IMPORTED_MODULE_11__.BranchMenu, { currentBranch: this.props.currentBranch || '', branches: this.props.branches, branching: this.props.branching, logger: this.props.logger, model: this.props.model }));
    }
    _renderTags() {
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_TagMenu__WEBPACK_IMPORTED_MODULE_12__.TagMenu, { logger: this.props.logger, model: this.props.model, branching: this.props.branching }));
    }
}
//# sourceMappingURL=Toolbar.js.map

/***/ }),

/***/ "./lib/components/diff/Diff.js":
/*!*************************************!*\
  !*** ./lib/components/diff/Diff.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isDiffSupported": () => /* binding */ isDiffSupported,
/* harmony export */   "Diff": () => /* binding */ Diff,
/* harmony export */   "RenderMimeProvider": () => /* binding */ RenderMimeProvider,
/* harmony export */   "RenderMimeConsumer": () => /* binding */ RenderMimeConsumer
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _NbDiff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NbDiff */ "./lib/components/diff/NbDiff.js");
/* harmony import */ var _PlainTextDiff__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PlainTextDiff */ "./lib/components/diff/PlainTextDiff.js");




/**
 * A registry which maintains mappings of file extension to diff provider components.
 */
const DIFF_PROVIDER_REGISTRY = {
    '.ipynb': _NbDiff__WEBPACK_IMPORTED_MODULE_2__.NBDiff
};
/**
 * Determines if a given file is supported for diffs.
 *
 * @param path the file path
 */
function isDiffSupported(path) {
    return _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.extname(path).toLocaleLowerCase() in DIFF_PROVIDER_REGISTRY;
}
/**
 * The parent diff component which maintains a registry of various diff providers.
 * Based on the extension of the file, it delegates to the relevant diff provider.
 */
function Diff(props) {
    const fileExtension = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.extname(props.path).toLocaleLowerCase();
    if (fileExtension in DIFF_PROVIDER_REGISTRY) {
        const DiffProvider = DIFF_PROVIDER_REGISTRY[fileExtension];
        return react__WEBPACK_IMPORTED_MODULE_1__.createElement(DiffProvider, Object.assign({}, props));
    }
    else {
        // Fallback to plain text diff
        try {
            return react__WEBPACK_IMPORTED_MODULE_1__.createElement(_PlainTextDiff__WEBPACK_IMPORTED_MODULE_3__.PlainTextDiff, Object.assign({}, props));
        }
        catch (error) {
            console.log(`Unable to render diff view for ${props.path}:\n${error}`);
            return null;
        }
    }
}
const renderMimeContext = react__WEBPACK_IMPORTED_MODULE_1__.createContext(null);
const RenderMimeProvider = renderMimeContext.Provider;
const RenderMimeConsumer = renderMimeContext.Consumer;
//# sourceMappingURL=Diff.js.map

/***/ }),

/***/ "./lib/components/diff/NBDiffHeader.js":
/*!*********************************************!*\
  !*** ./lib/components/diff/NBDiffHeader.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NBDiffHeader": () => /* binding */ NBDiffHeader
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * A React component to render the header which shows metadata around the diff
 * being rendered. Shows the path to the file and the previous and current ref
 * being used for the diff.
 */
function NBDiffHeader(props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "jp-git-diff-header-path" }, props.path),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "jp-Diff-addremchunk jp-git-diff-header" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "jp-Diff-addedchunk" },
                "Current: ",
                getRefDisplayValue(props.diffContext.currentRef)),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "jp-Diff-removedchunk" },
                "Previous: ",
                getRefDisplayValue(props.diffContext.previousRef)))));
}
/**
 * Utility method to get a user-friendly display text for a given ref.
 */
function getRefDisplayValue(ref) {
    const SPECIAL_REFS = {
        WORKING: {
            displayName: 'Changed'
        },
        INDEX: {
            displayName: 'Staged'
        }
    };
    if ('specialRef' in ref) {
        return SPECIAL_REFS[ref.specialRef].displayName;
    }
    else {
        return ref.gitRef;
    }
}
//# sourceMappingURL=NBDiffHeader.js.map

/***/ }),

/***/ "./lib/components/diff/NbDiff.js":
/*!***************************************!*\
  !*** ./lib/components/diff/NbDiff.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CellDiff": () => /* binding */ CellDiff,
/* harmony export */   "NBDiff": () => /* binding */ NBDiff
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nbdime_lib_diff_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nbdime/lib/diff/model */ "./node_modules/nbdime/lib/diff/model/index.js");
/* harmony import */ var nbdime_lib_diff_model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nbdime_lib_diff_model__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nbdime_lib_diff_widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nbdime/lib/diff/widget */ "./node_modules/nbdime/lib/diff/widget/index.js");
/* harmony import */ var nbdime_lib_diff_widget__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nbdime_lib_diff_widget__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _git__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../git */ "./lib/git.js");
/* harmony import */ var _Diff__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Diff */ "./lib/components/diff/Diff.js");
/* harmony import */ var _NBDiffHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NBDiffHeader */ "./lib/components/diff/NBDiffHeader.js");







/**
 * A React component which renders the diff is a single Notebook cell.
 *
 * This uses the NBDime PhosporJS CellDiffWidget internally. To get around the
 * PhosporJS <=> ReactJS barrier, it uses React Refs(https://reactjs.org/docs/refs-and-the-dom.html)
 *
 * During component render, a Ref is created for the ReactDOM and after the component
 * is mounted, the PhosporJS widget is created and attached to the Ref.
 */
class CellDiff extends react__WEBPACK_IMPORTED_MODULE_3__.Component {
    constructor(props) {
        super(props);
        this.unAddedOrRemovedRef = react__WEBPACK_IMPORTED_MODULE_3__.createRef();
        this.addedRef = react__WEBPACK_IMPORTED_MODULE_3__.createRef();
        this.removedRef = react__WEBPACK_IMPORTED_MODULE_3__.createRef();
    }
    componentDidMount() {
        const chunk = this.props.cellChunk;
        if (chunk.length === 1 && !(chunk[0].added || chunk[0].deleted)) {
            const widget = new nbdime_lib_diff_widget__WEBPACK_IMPORTED_MODULE_2__.CellDiffWidget(chunk[0], this.renderMimeRegistry, this.props.mimeType);
            this.unAddedOrRemovedRef.current.appendChild(widget.node);
        }
        else {
            for (let j = 0; j < chunk.length; j++) {
                const cell = chunk[j];
                const ref = cell.deleted ? this.removedRef : this.addedRef;
                const widget = new nbdime_lib_diff_widget__WEBPACK_IMPORTED_MODULE_2__.CellDiffWidget(cell, this.renderMimeRegistry, this.props.mimeType);
                ref.current.appendChild(widget.node);
            }
        }
    }
    render() {
        const chunk = this.props.cellChunk;
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_Diff__WEBPACK_IMPORTED_MODULE_4__.RenderMimeConsumer, null, (value) => {
            this.renderMimeRegistry = value;
            return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, chunk.length === 1 && !(chunk[0].added || chunk[0].deleted) ? (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { ref: this.unAddedOrRemovedRef })) : (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: 'jp-Diff-addremchunk' },
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: 'jp-Diff-addedchunk', ref: this.addedRef }),
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: 'jp-Diff-removedchunk', ref: this.removedRef })))));
        }));
    }
}
/**
 * A React component to render the diff of a single Notebook file.
 *
 * 1. It calls the `/nbdime/api/gitdiff` API on the server to get the diff model
 * 2. Renders the Diff header
 * 3. For each cell, invokes the CellDiff component
 */
class NBDiff extends react__WEBPACK_IMPORTED_MODULE_3__.Component {
    constructor(props) {
        super(props);
        this.state = {
            nbdModel: undefined,
            errorMessage: undefined
        };
    }
    componentDidMount() {
        this.performDiff(this.props.diffContext);
    }
    render() {
        if (this.state.errorMessage !== undefined) {
            return (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("span", { className: "jp-git-diff-error" },
                    "Failed to fetch diff with error:",
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement("span", { className: "jp-git-diff-error-message" }, this.state.errorMessage))));
        }
        else if (this.state.nbdModel !== undefined) {
            const cellComponents = this.state.nbdModel.chunkedCells.map((cellChunk, index) => (react__WEBPACK_IMPORTED_MODULE_3__.createElement(CellDiff, { key: index, cellChunk: cellChunk, mimeType: this.state.nbdModel.mimetype })));
            return (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "jp-git-diff-Widget" },
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "jp-git-diff-root jp-mod-hideunchanged" },
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "jp-git-Notebook-diff" },
                        react__WEBPACK_IMPORTED_MODULE_3__.createElement(_NBDiffHeader__WEBPACK_IMPORTED_MODULE_5__.NBDiffHeader, Object.assign({}, this.props)),
                        cellComponents))));
        }
        else {
            return null;
        }
    }
    /**
     * Based on the Diff Context , calls the server API with the revant parameters
     * to
     * @param diffContext the context in which to perform the diff
     */
    performDiff(diffContext) {
        // Resolve what API parameter to call.
        let currentRefValue;
        if ('specialRef' in diffContext.currentRef) {
            currentRefValue = {
                special: diffContext.currentRef.specialRef
            };
        }
        else {
            currentRefValue = {
                git: diffContext.currentRef.gitRef
            };
        }
        (0,_git__WEBPACK_IMPORTED_MODULE_6__.requestAPI)('gitdiff', 'POST', {
            file_path: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.join(this.props.topRepoPath, this.props.path),
            ref_local: { git: diffContext.previousRef.gitRef },
            ref_remote: currentRefValue
        }, 'nbdime/api')
            .then((data) => {
            const base = data.base;
            const diff = data.diff;
            const nbdModel = new nbdime_lib_diff_model__WEBPACK_IMPORTED_MODULE_1__.NotebookDiffModel(base, diff);
            this.setState({
                nbdModel: nbdModel
            });
        })
            .catch(reason => {
            // Handle error
            this.setState({
                errorMessage: reason.message || 'Unknown error. Please check the server log.'
            });
        });
    }
}
//# sourceMappingURL=NbDiff.js.map

/***/ }),

/***/ "./lib/components/diff/PlainTextDiff.js":
/*!**********************************************!*\
  !*** ./lib/components/diff/PlainTextDiff.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlainTextDiff": () => /* binding */ PlainTextDiff
/* harmony export */ });
/* harmony import */ var _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/codemirror */ "webpack/sharing/consume/default/@jupyterlab/codemirror");
/* harmony import */ var _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _git__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../git */ "./lib/git.js");
/* harmony import */ var _mergeview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mergeview */ "./lib/components/diff/mergeview.js");




/**
 * A React component to render the diff of a plain text file
 *
 * 1. It calls the `diffcontent` API on the server to get the previous and current content
 * 2. Renders the content using CodeMirror merge addon
 */
class PlainTextDiff extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    constructor(props) {
        super(props);
        this.state = { errorMessage: null };
        this._mergeViewRef = react__WEBPACK_IMPORTED_MODULE_1__.createRef();
    }
    componentDidMount() {
        this._performDiff(this.props.diffContext);
    }
    render() {
        if (this.state.errorMessage !== null) {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: "jp-git-diff-error" },
                    "Failed to fetch diff with error:",
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: "jp-git-diff-error-message" }, this.state.errorMessage))));
        }
        else {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "jp-git-diff-Widget" },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "jp-git-diff-root" },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { ref: this._mergeViewRef, className: "jp-git-PlainText-diff" }))));
        }
    }
    /**
     * Based on the Diff Context , calls the server API with the relevant parameters
     * to
     * @param diffContext the context in which to perform the diff
     */
    _performDiff(diffContext) {
        // Resolve what API parameter to call.
        let currentRefValue;
        if ('specialRef' in diffContext.currentRef) {
            currentRefValue = {
                special: diffContext.currentRef.specialRef
            };
        }
        else {
            currentRefValue = {
                git: diffContext.currentRef.gitRef
            };
        }
        (0,_git__WEBPACK_IMPORTED_MODULE_2__.requestAPI)('diffcontent', 'POST', {
            filename: this.props.path,
            prev_ref: { git: diffContext.previousRef.gitRef },
            curr_ref: currentRefValue,
            top_repo_path: this.props.topRepoPath
        })
            .then(data => {
            this._addDiffViewer(data['prev_content'], data['curr_content']);
        })
            .catch(reason => {
            console.error(reason);
            // Handle error
            this.setState({
                errorMessage: reason.message || 'Unknown error. Please check the server log.'
            });
        });
    }
    /**
     * Creates and adds a diff viewer to the DOM with given content
     *
     * @param prevContent the raw value of the previous content
     * @param currContent the raw value of the current content
     */
    _addDiffViewer(prevContent, currContent) {
        const mode = _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_0__.Mode.findByFileName(this.props.path) || _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_0__.Mode.findBest(this.props.path);
        (0,_mergeview__WEBPACK_IMPORTED_MODULE_3__.mergeView)(this._mergeViewRef.current, {
            value: currContent,
            orig: prevContent,
            lineNumbers: true,
            mode: mode.mime,
            theme: 'jupyter',
            connect: 'align',
            collapseIdentical: true,
            revertButtons: false
        });
    }
}
//# sourceMappingURL=PlainTextDiff.js.map

/***/ }),

/***/ "./lib/components/diff/mergeview.js":
/*!******************************************!*\
  !*** ./lib/components/diff/mergeview.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GutterID": () => /* binding */ GutterID,
/* harmony export */   "mergeView": () => /* binding */ mergeView
/* harmony export */ });
/* harmony import */ var codemirror__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! codemirror */ "./node_modules/codemirror/lib/codemirror.js");
/* harmony import */ var codemirror__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(codemirror__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var diff_match_patch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! diff-match-patch */ "webpack/sharing/consume/default/diff-match-patch/diff-match-patch");
/* harmony import */ var diff_match_patch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(diff_match_patch__WEBPACK_IMPORTED_MODULE_1__);
// This code is based on the CodeMirror merge add-on
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE
// The linter must be relaxed on this imported file.
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable eqeqeq */
/* eslint-disable no-inner-declarations */
/* eslint-disable prefer-arrow-callback */


const GutterID = 'CodeMirror-patchgutter';
var DiffStatus;
(function (DiffStatus) {
    DiffStatus[DiffStatus["Equal"] = diff_match_patch__WEBPACK_IMPORTED_MODULE_1__.DIFF_EQUAL] = "Equal";
    DiffStatus[DiffStatus["Delete"] = diff_match_patch__WEBPACK_IMPORTED_MODULE_1__.DIFF_DELETE] = "Delete";
    DiffStatus[DiffStatus["Insert"] = diff_match_patch__WEBPACK_IMPORTED_MODULE_1__.DIFF_INSERT] = "Insert";
})(DiffStatus || (DiffStatus = {}));
const Pos = (codemirror__WEBPACK_IMPORTED_MODULE_0___default().Pos);
const svgNS = 'http://www.w3.org/2000/svg';
class DiffView {
    constructor(mv, type) {
        this.mv = mv;
        this.type = type;
        this.classes =
            type == 'left'
                ? {
                    chunk: 'CodeMirror-merge-l-chunk',
                    start: 'CodeMirror-merge-l-chunk-start',
                    end: 'CodeMirror-merge-l-chunk-end',
                    insert: 'CodeMirror-merge-l-inserted',
                    del: 'CodeMirror-merge-l-deleted',
                    connect: 'CodeMirror-merge-l-connect'
                }
                : {
                    chunk: 'CodeMirror-merge-r-chunk',
                    start: 'CodeMirror-merge-r-chunk-start',
                    end: 'CodeMirror-merge-r-chunk-end',
                    insert: 'CodeMirror-merge-r-inserted',
                    del: 'CodeMirror-merge-r-deleted',
                    connect: 'CodeMirror-merge-r-connect'
                };
    }
    init(pane, orig, options) {
        this.edit = this.mv.edit;
        (this.edit.state.diffViews || (this.edit.state.diffViews = [])).push(this);
        this.orig = codemirror__WEBPACK_IMPORTED_MODULE_0___default()(pane, Object.assign(Object.assign({}, options), { value: orig, readOnly: !this.mv.options.allowEditingOriginals }));
        if (this.mv.options.connect == 'align') {
            if (!this.edit.state.trackAlignable) {
                this.edit.state.trackAlignable = new TrackAlignable(this.edit);
            }
            this.orig.state.trackAlignable = new TrackAlignable(this.orig);
        }
        // @ts-ignore
        this.lockButton.title = this.edit.phrase('Toggle locked scrolling');
        this.orig.state.diffViews = [this];
        // @ts-ignore
        let classLocation = options.chunkClassLocation || 'background';
        if (Object.prototype.toString.call(classLocation) != '[object Array]') {
            classLocation = [classLocation];
        }
        this.classes.classLocation = classLocation;
        this.diff = getDiff(asString(orig), asString(options.value), this.mv.options.ignoreWhitespace);
        this.chunks = getChunks(this.diff);
        this.diffOutOfDate = this.dealigned = false;
        this.needsScrollSync = null;
        this.showDifferences = options.showDifferences !== false;
    }
    registerEvents(otherDv) {
        this.forceUpdate = DiffView.registerUpdate(this);
        DiffView.setScrollLock(this, true, false);
        DiffView.registerScroll(this, otherDv);
    }
    setShowDifferences(val) {
        val = val !== false;
        if (val != this.showDifferences) {
            this.showDifferences = val;
            this.forceUpdate('full');
        }
    }
    static setScrollLock(dv, val, action) {
        dv.lockScroll = val;
        if (val && action != false) {
            if (DiffView.syncScroll(dv, true)) {
                makeConnections(dv);
            }
        }
        // @ts-ignore
        (val ? (codemirror__WEBPACK_IMPORTED_MODULE_0___default().addClass) : (codemirror__WEBPACK_IMPORTED_MODULE_0___default().rmClass))(dv.lockButton, 'CodeMirror-merge-scrolllock-enabled');
    }
    static registerUpdate(dv) {
        const edit = { from: 0, to: 0, marked: [] };
        const orig = { from: 0, to: 0, marked: [] };
        let debounceChange;
        let updatingFast = false;
        function update(mode) {
            DiffView.updating = true;
            updatingFast = false;
            if (mode == 'full') {
                // @ts-ignore
                if (dv.svg) {
                    Private.clear(dv.svg);
                }
                // @ts-ignore
                if (dv.copyButtons) {
                    Private.clear(dv.copyButtons);
                }
                clearMarks(dv.edit, edit.marked, dv.classes);
                clearMarks(dv.orig, orig.marked, dv.classes);
                edit.from = edit.to = orig.from = orig.to = 0;
            }
            ensureDiff(dv);
            if (dv.showDifferences) {
                updateMarks(dv.edit, dv.diff, edit, DiffStatus.Insert, dv.classes);
                updateMarks(dv.orig, dv.diff, orig, DiffStatus.Delete, dv.classes);
            }
            if (dv.mv.options.connect == 'align') {
                alignChunks(dv);
            }
            makeConnections(dv);
            if (dv.needsScrollSync != null) {
                DiffView.syncScroll(dv, dv.needsScrollSync);
            }
            DiffView.updating = false;
        }
        function setDealign(fast) {
            if (DiffView.updating) {
                return;
            }
            dv.dealigned = true;
            set(fast);
        }
        function set(fast) {
            if (DiffView.updating || updatingFast) {
                return;
            }
            clearTimeout(debounceChange);
            if (fast === true) {
                updatingFast = true;
            }
            debounceChange = setTimeout(update, fast === true ? 20 : 250);
        }
        function change(_cm, change) {
            if (!dv.diffOutOfDate) {
                dv.diffOutOfDate = true;
                edit.from = edit.to = orig.from = orig.to = 0;
            }
            // Update faster when a line was added/removed
            setDealign(change.text.length - 1 != change.to.line - change.from.line);
        }
        function swapDoc() {
            dv.diffOutOfDate = true;
            dv.dealigned = true;
            update('full');
        }
        dv.edit.on('change', change);
        dv.orig.on('change', change);
        dv.edit.on('swapDoc', swapDoc);
        dv.orig.on('swapDoc', swapDoc);
        if (dv.mv.options.connect === 'align') {
            codemirror__WEBPACK_IMPORTED_MODULE_0___default().on(dv.edit.state.trackAlignable, 'realign', setDealign);
            codemirror__WEBPACK_IMPORTED_MODULE_0___default().on(dv.orig.state.trackAlignable, 'realign', setDealign);
        }
        dv.edit.on('viewportChange', function () {
            set(false);
        });
        dv.orig.on('viewportChange', function () {
            set(false);
        });
        update();
        return update;
    }
    static registerScroll(dv, otherDv) {
        dv.edit.on('scroll', function () {
            if (DiffView.syncScroll(dv, true)) {
                makeConnections(dv);
            }
        });
        dv.orig.on('scroll', function () {
            if (DiffView.syncScroll(dv, false)) {
                makeConnections(dv);
            }
            if (otherDv) {
                if (DiffView.syncScroll(otherDv, true)) {
                    makeConnections(otherDv);
                }
            }
        });
    }
    static syncScroll(dv, toOrig) {
        // Change handler will do a refresh after a timeout when diff is out of date
        if (dv.diffOutOfDate) {
            if (dv.lockScroll && dv.needsScrollSync == null) {
                dv.needsScrollSync = toOrig;
            }
            return false;
        }
        dv.needsScrollSync = null;
        if (!dv.lockScroll) {
            return true;
        }
        let editor;
        let other;
        const now = +new Date();
        if (toOrig) {
            editor = dv.edit;
            other = dv.orig;
        }
        else {
            editor = dv.orig;
            other = dv.edit;
        }
        // Don't take action if the position of this editor was recently set
        // (to prevent feedback loops)
        if (editor.state.scrollSetBy == dv &&
            (editor.state.scrollSetAt || 0) + 250 > now) {
            return false;
        }
        const sInfo = editor.getScrollInfo();
        let targetPos = 0;
        if (dv.mv.options.connect == 'align') {
            targetPos = sInfo.top;
        }
        else {
            const halfScreen = 0.5 * sInfo.clientHeight;
            const midY = sInfo.top + halfScreen;
            const mid = editor.lineAtHeight(midY, 'local');
            const around = chunkBoundariesAround(dv.chunks, mid, toOrig);
            const off = DiffView.getOffsets(editor, toOrig ? around.edit : around.orig);
            const offOther = DiffView.getOffsets(other, toOrig ? around.orig : around.edit);
            const ratio = (midY - off.top) / (off.bot - off.top);
            targetPos =
                offOther.top - halfScreen + ratio * (offOther.bot - offOther.top);
            let botDist;
            let mix;
            // Some careful tweaking to make sure no space is left out of view
            // when scrolling to top or bottom.
            if (targetPos > sInfo.top) {
                mix = sInfo.top / halfScreen;
                if (mix < 1) {
                    targetPos = targetPos * mix + sInfo.top * (1 - mix);
                }
            }
            else {
                botDist = sInfo.height - sInfo.clientHeight - sInfo.top;
                if (botDist < halfScreen) {
                    const otherInfo = other.getScrollInfo();
                    const botDistOther = otherInfo.height - otherInfo.clientHeight - targetPos;
                    if (botDistOther > botDist) {
                        mix = botDist / halfScreen;
                        if (mix < 1) {
                            targetPos =
                                targetPos * mix +
                                    (otherInfo.height - otherInfo.clientHeight - botDist) *
                                        (1 - mix);
                        }
                    }
                }
            }
        }
        other.scrollTo(sInfo.left, targetPos);
        other.state.scrollSetAt = now;
        other.state.scrollSetBy = dv;
        return true;
    }
    static getOffsets(editor, around) {
        let bot = around.after;
        if (bot == null) {
            // @ts-ignore
            bot = editor.lastLine() + 1;
        }
        return {
            top: editor.heightAtLine(around.before || 0, 'local'),
            bot: editor.heightAtLine(bot, 'local')
        };
    }
}
DiffView.updating = false;
function ensureDiff(dv) {
    if (dv.diffOutOfDate) {
        dv.diff = getDiff(dv.orig.getValue(), dv.edit.getValue(), dv.mv.options.ignoreWhitespace);
        dv.chunks = getChunks(dv.diff);
        dv.diffOutOfDate = false;
        codemirror__WEBPACK_IMPORTED_MODULE_0___default().signal(dv.edit, 'updateDiff', dv.diff);
    }
}
// Updating the marks for editor content
function removeClass(editor, line, classes) {
    const locs = classes.classLocation;
    for (let i = 0; i < locs.length; i++) {
        editor.removeLineClass(line, locs[i], classes.chunk);
        editor.removeLineClass(line, locs[i], classes.start);
        editor.removeLineClass(line, locs[i], classes.end);
    }
}
function isTextMarker(marker) {
    return 'clear' in marker;
}
function clearMarks(editor, arr, classes) {
    for (let i = 0; i < arr.length; ++i) {
        const mark = arr[i];
        if (isTextMarker(mark)) {
            mark.clear();
            // @ts-ignore
        }
        else if (mark.parent) {
            removeClass(editor, mark, classes);
        }
    }
    arr.length = 0;
    editor.clearGutter(GutterID);
}
// FIXME maybe add a margin around viewport to prevent too many updates
function updateMarks(editor, diff, state, type, classes) {
    const vp = editor.getViewport();
    editor.operation(function () {
        if (state.from == state.to ||
            vp.from - state.to > 20 ||
            state.from - vp.to > 20) {
            clearMarks(editor, state.marked, classes);
            markChanges(editor, diff, type, state.marked, vp.from, vp.to, classes);
            state.from = vp.from;
            state.to = vp.to;
        }
        else {
            if (vp.from < state.from) {
                markChanges(editor, diff, type, state.marked, vp.from, state.from, classes);
                state.from = vp.from;
            }
            if (vp.to > state.to) {
                markChanges(editor, diff, type, state.marked, state.to, vp.to, classes);
                state.to = vp.to;
            }
        }
    });
}
function addClass(editor, lineNr, classes, main, start, end) {
    const locs = classes.classLocation;
    // @ts-ignore
    const line = editor.getLineHandle(lineNr);
    for (let i = 0; i < locs.length; i++) {
        if (main) {
            editor.addLineClass(line, locs[i], classes.chunk);
        }
        if (start) {
            editor.addLineClass(line, locs[i], classes.start);
        }
        if (end) {
            editor.addLineClass(line, locs[i], classes.end);
        }
    }
    return line;
}
function makeGutter(isDelete) {
    const marker = document.createElement('div');
    marker.className = isDelete
        ? 'CodeMirror-patchgutter-delete'
        : 'CodeMirror-patchgutter-insert';
    return marker;
}
function markChanges(editor, diff, type, marks, from, to, classes) {
    let pos = Pos(0, 0);
    const top = Pos(from, 0);
    // @ts-ignore
    const bot = editor.clipPos(Pos(to - 1));
    const cls = type == DiffStatus.Delete ? classes.del : classes.insert;
    function markChunk(start, end) {
        const bfrom = Math.max(from, start);
        const bto = Math.min(to, end);
        for (let i = bfrom; i < bto; ++i) {
            marks.push(addClass(editor, i, classes, true, i == start, i == end - 1));
            editor.setGutterMarker(i, GutterID, makeGutter(type == DiffStatus.Delete));
        }
        // When the chunk is empty, make sure a horizontal line shows up
        if (start == end && bfrom == end && bto == end) {
            if (bfrom) {
                marks.push(addClass(editor, bfrom - 1, classes, false, false, true));
            }
            else {
                marks.push(addClass(editor, bfrom, classes, false, true, false));
            }
        }
    }
    let chunkStart = 0;
    let pending = false;
    for (let i = 0; i < diff.length; ++i) {
        const part = diff[i];
        const tp = part[0];
        const str = part[1];
        if (tp == DiffStatus.Equal) {
            const cleanFrom = pos.line + (startOfLineClean(diff, i) ? 0 : 1);
            moveOver(pos, str);
            const cleanTo = pos.line + (endOfLineClean(diff, i) ? 1 : 0);
            if (cleanTo > cleanFrom) {
                if (pending) {
                    markChunk(chunkStart, cleanFrom);
                    pending = false;
                }
                chunkStart = cleanTo;
            }
        }
        else {
            pending = true;
            if (tp == type) {
                const end = moveOver(pos, str, true);
                const a = Private.posMax(top, pos);
                const b = Private.posMin(bot, end);
                if (!Private.posEq(a, b)) {
                    // @ts-ignore
                    marks.push(editor.markText(a, b, { className: cls }));
                }
                pos = end;
            }
        }
    }
    if (pending) {
        markChunk(chunkStart, pos.line + 1);
    }
}
// Updating the gap between editor and original
function makeConnections(dv) {
    if (!dv.showDifferences) {
        return;
    }
    let w = 0;
    if (dv.svg) {
        Private.clear(dv.svg);
        w = dv.gap.offsetWidth;
        Private.attrs(dv.svg, 'width', w, 'height', dv.gap.offsetHeight);
    }
    if (dv.copyButtons) {
        Private.clear(dv.copyButtons);
    }
    const vpEdit = dv.edit.getViewport();
    const vpOrig = dv.orig.getViewport();
    const outerTop = dv.mv.wrap.getBoundingClientRect().top;
    const sTopEdit = outerTop -
        dv.edit.getScrollerElement().getBoundingClientRect().top +
        dv.edit.getScrollInfo().top;
    const sTopOrig = outerTop -
        dv.orig.getScrollerElement().getBoundingClientRect().top +
        dv.orig.getScrollInfo().top;
    for (let i = 0; i < dv.chunks.length; i++) {
        const ch = dv.chunks[i];
        if (ch.editFrom <= vpEdit.to &&
            ch.editTo >= vpEdit.from &&
            ch.origFrom <= vpOrig.to &&
            ch.origTo >= vpOrig.from) {
            drawConnectorsForChunk(dv, ch, sTopOrig, sTopEdit, w);
        }
    }
}
function getMatchingOrigLine(editLine, chunks) {
    let editStart = 0;
    let origStart = 0;
    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        if (chunk.editTo > editLine && chunk.editFrom <= editLine) {
            return null;
        }
        if (chunk.editFrom > editLine) {
            break;
        }
        editStart = chunk.editTo;
        origStart = chunk.origTo;
    }
    return origStart + (editLine - editStart);
}
// Combines information about chunks and widgets/markers to return
// an array of lines, in a single editor, that probably need to be
// aligned with their counterparts in the editor next to it.
function alignableFor(cm, chunks, isOrig) {
    const tracker = cm.state.trackAlignable;
    // @ts-ignore
    let start = cm.firstLine();
    let trackI = 0;
    const result = [];
    for (let i = 0;; i++) {
        const chunk = chunks[i];
        const chunkStart = !chunk ? 1e9 : isOrig ? chunk.origFrom : chunk.editFrom;
        for (; trackI < tracker.alignable.length; trackI += 2) {
            const n = tracker.alignable[trackI] + 1;
            if (n <= start) {
                continue;
            }
            if (n <= chunkStart) {
                result.push(n);
            }
            else {
                break;
            }
        }
        if (!chunk) {
            break;
        }
        result.push((start = isOrig ? chunk.origTo : chunk.editTo));
    }
    return result;
}
// Given information about alignable lines in two editors, fill in
// the result (an array of three-element arrays) to reflect the
// lines that need to be aligned with each other.
function mergeAlignable(result, origAlignable, chunks, setIndex) {
    let rI = 0;
    let origI = 0;
    let chunkI = 0;
    let diff = 0;
    outer: for (;; rI++) {
        const nextR = result[rI];
        const nextO = origAlignable[origI];
        if (!nextR && nextO == null) {
            break;
        }
        const rLine = nextR ? nextR[0] : 1e9;
        const oLine = nextO == null ? 1e9 : nextO;
        while (chunkI < chunks.length) {
            const chunk = chunks[chunkI];
            if (chunk.origFrom <= oLine && chunk.origTo > oLine) {
                origI++;
                rI--;
                continue outer;
            }
            if (chunk.editTo > rLine) {
                if (chunk.editFrom <= rLine) {
                    continue outer;
                }
                break;
            }
            diff += chunk.origTo - chunk.origFrom - (chunk.editTo - chunk.editFrom);
            chunkI++;
        }
        if (rLine == oLine - diff) {
            nextR[setIndex] = oLine;
            origI++;
        }
        else if (rLine < oLine - diff) {
            nextR[setIndex] = rLine + diff;
        }
        else {
            const record = [oLine - diff, null, null];
            record[setIndex] = oLine;
            result.splice(rI, 0, record);
            origI++;
        }
    }
}
function findAlignedLines(dv, other) {
    const alignable = alignableFor(dv.edit, dv.chunks, false);
    const result = [];
    if (other) {
        for (let i = 0, j = 0; i < other.chunks.length; i++) {
            const n = other.chunks[i].editTo;
            while (j < alignable.length && alignable[j] < n) {
                j++;
            }
            if (j == alignable.length || alignable[j] != n) {
                alignable.splice(j++, 0, n);
            }
        }
    }
    for (let i = 0; i < alignable.length; i++) {
        result.push([alignable[i], null, null]);
    }
    mergeAlignable(result, alignableFor(dv.orig, dv.chunks, true), dv.chunks, 1);
    if (other) {
        mergeAlignable(result, alignableFor(other.orig, other.chunks, true), other.chunks, 2);
    }
    return result;
}
function alignChunks(dv, force) {
    if (!dv.dealigned && !force) {
        return;
    }
    // @ts-ignore
    if (!dv.orig.curOp) {
        return dv.orig.operation(function () {
            alignChunks(dv, force);
        });
    }
    dv.dealigned = false;
    const other = dv.mv.left == dv ? dv.mv.right : dv.mv.left;
    if (other) {
        ensureDiff(other);
        other.dealigned = false;
    }
    const linesToAlign = findAlignedLines(dv, other);
    // Clear old aligners
    const aligners = dv.mv.aligners;
    for (let i = 0; i < aligners.length; i++) {
        aligners[i].clear();
    }
    aligners.length = 0;
    const cm = [dv.edit, dv.orig];
    const scroll = [];
    if (other) {
        cm.push(other.orig);
    }
    for (let i = 0; i < cm.length; i++) {
        scroll.push(cm[i].getScrollInfo().top);
    }
    for (let ln = 0; ln < linesToAlign.length; ln++) {
        alignLines(cm, linesToAlign[ln], aligners);
    }
    for (let i = 0; i < cm.length; i++) {
        cm[i].scrollTo(null, scroll[i]);
    }
}
function alignLines(cm, lines, aligners) {
    let maxOffset = 0;
    const offset = [];
    for (let i = 0; i < cm.length; i++) {
        if (lines[i] != null) {
            const off = cm[i].heightAtLine(lines[i], 'local');
            offset[i] = off;
            maxOffset = Math.max(maxOffset, off);
        }
    }
    for (let i = 0; i < cm.length; i++) {
        if (lines[i] != null) {
            const diff = maxOffset - offset[i];
            if (diff > 1) {
                aligners.push(padAbove(cm[i], lines[i], diff));
            }
        }
    }
}
function padAbove(cm, line, size) {
    let above = true;
    // @ts-ignore
    if (line > cm.lastLine()) {
        line--;
        above = false;
    }
    const elt = document.createElement('div');
    elt.className = 'CodeMirror-merge-spacer';
    elt.style.height = size + 'px';
    elt.style.minWidth = '1px';
    return cm.addLineWidget(line, elt, {
        // @ts-ignore
        height: size,
        above: above,
        mergeSpacer: true,
        handleMouseEvents: true
    });
}
function drawConnectorsForChunk(dv, chunk, sTopOrig, sTopEdit, w) {
    const flip = dv.type == 'left';
    const top = dv.orig.heightAtLine(chunk.origFrom, 'local', true) - sTopOrig;
    if (dv.svg) {
        let topLpx = top;
        let topRpx = dv.edit.heightAtLine(chunk.editFrom, 'local', true) - sTopEdit;
        if (flip) {
            const tmp = topLpx;
            topLpx = topRpx;
            topRpx = tmp;
        }
        let botLpx = dv.orig.heightAtLine(chunk.origTo, 'local', true) - sTopOrig;
        let botRpx = dv.edit.heightAtLine(chunk.editTo, 'local', true) - sTopEdit;
        if (flip) {
            const tmp = botLpx;
            botLpx = botRpx;
            botRpx = tmp;
        }
        const curveTop = ' C ' +
            w / 2 +
            ' ' +
            topRpx +
            ' ' +
            w / 2 +
            ' ' +
            topLpx +
            ' ' +
            (w + 2) +
            ' ' +
            topLpx;
        const curveBot = ' C ' +
            w / 2 +
            ' ' +
            botLpx +
            ' ' +
            w / 2 +
            ' ' +
            botRpx +
            ' -1 ' +
            botRpx;
        Private.attrs(dv.svg.appendChild(document.createElementNS(svgNS, 'path')), 'd', 'M -1 ' +
            topRpx +
            curveTop +
            ' L ' +
            (w + 2) +
            ' ' +
            botLpx +
            curveBot +
            ' z', 'class', dv.classes.connect);
    }
    if (dv.copyButtons) {
        const copy = dv.copyButtons.appendChild(Private.elt('div', dv.type === 'left' ? '\u21dd' : '\u21dc', 'CodeMirror-merge-copy'));
        const editOriginals = dv.mv.options.allowEditingOriginals;
        // @ts-ignore
        copy.title = dv.edit.phrase(editOriginals ? 'Push to left' : 'Revert chunk');
        // @ts-ignore
        copy.chunk = chunk;
        copy.style.top =
            (chunk.origTo > chunk.origFrom
                ? top
                : dv.edit.heightAtLine(chunk.editFrom, 'local') - sTopEdit) + 'px';
        if (editOriginals) {
            const topReverse = dv.edit.heightAtLine(chunk.editFrom, 'local') - sTopEdit;
            const copyReverse = dv.copyButtons.appendChild(Private.elt('div', dv.type == 'right' ? '\u21dd' : '\u21dc', 'CodeMirror-merge-copy-reverse'));
            copyReverse.title = 'Push to right';
            // @ts-ignore
            copyReverse.chunk = {
                editFrom: chunk.origFrom,
                editTo: chunk.origTo,
                origFrom: chunk.editFrom,
                origTo: chunk.editTo
            };
            copyReverse.style.top = topReverse + 'px';
            dv.type == 'right'
                ? (copyReverse.style.left = '2px')
                : (copyReverse.style.right = '2px');
        }
    }
}
function copyChunk(dv, to, from, chunk) {
    if (dv.diffOutOfDate) {
        return;
    }
    const origStart = chunk.origTo > from.lastLine()
        ? Pos(chunk.origFrom - 1)
        : Pos(chunk.origFrom, 0);
    const origEnd = Pos(chunk.origTo, 0);
    const editStart = chunk.editTo > to.lastLine()
        ? Pos(chunk.editFrom - 1)
        : Pos(chunk.editFrom, 0);
    const editEnd = Pos(chunk.editTo, 0);
    const handler = dv.mv.options.revertChunk;
    if (handler) {
        handler(dv.mv, from, origStart, origEnd, to, editStart, editEnd);
    }
    else {
        to.replaceRange(from.getRange(origStart, origEnd), editStart, editEnd);
    }
}
// Merge view, containing 0, 1, or 2 diff views.
/**
 * A function that calculates either a two-way or three-way merge between different sets of content.
 */
function mergeView(node, options) {
    return new MergeView(node, options);
}
class MergeView {
    constructor(node, options) {
        this.options = options;
        const origLeft = options.origLeft == null ? options.orig : options.origLeft;
        const origRight = options.origRight;
        const hasLeft = origLeft != null;
        const hasRight = origRight != null;
        const panes = 1 + (hasLeft ? 1 : 0) + (hasRight ? 1 : 0);
        const wrap = [];
        let left = (this.left = null);
        let right = (this.right = null);
        const self = this;
        let leftPane = null;
        if (hasLeft) {
            left = this.left = new DiffView(this, 'left');
            leftPane = Private.elt('div', null, 'CodeMirror-merge-pane CodeMirror-merge-left');
            wrap.push(leftPane);
            wrap.push(buildGap(left));
        }
        const editPane = Private.elt('div', null, 'CodeMirror-merge-pane CodeMirror-merge-editor');
        wrap.push(editPane);
        let rightPane = null;
        if (hasRight) {
            right = this.right = new DiffView(this, 'right');
            wrap.push(buildGap(right));
            rightPane = Private.elt('div', null, 'CodeMirror-merge-pane CodeMirror-merge-right');
            wrap.push(rightPane);
        }
        (hasRight ? rightPane : editPane).className +=
            ' CodeMirror-merge-pane-rightmost';
        wrap.push(Private.elt('div', null, null, 'height: 0; clear: both;'));
        const wrapElt = (this.wrap = node.appendChild(Private.elt('div', wrap, 'CodeMirror-merge CodeMirror-merge-' + panes + 'pane')));
        this.edit = codemirror__WEBPACK_IMPORTED_MODULE_0___default()(editPane, Object.assign({}, options));
        // Add gutter
        const gutters = this.edit.getOption('gutters');
        if (gutters.indexOf(GutterID) < 0) {
            const newGutters = [];
            if (this.edit.getOption('lineNumbers')) {
                newGutters.push('CodeMirror-linenumbers');
            }
            newGutters.push(GutterID);
            this.edit.setOption('gutters', newGutters);
            options['gutters'] = newGutters;
        }
        if (left) {
            left.init(leftPane, origLeft, options);
        }
        if (right) {
            right.init(rightPane, origRight, options);
        }
        if (options.collapseIdentical) {
            this.editor().operation(function () {
                collapseIdenticalStretches(self, options.collapseIdentical);
            });
        }
        if (options.connect == 'align') {
            this.aligners = [];
            alignChunks(this.left || this.right, true);
        }
        if (left) {
            left.registerEvents(right);
        }
        if (right) {
            right.registerEvents(left);
        }
        const onResize = function () {
            if (left) {
                makeConnections(left);
            }
            if (right) {
                makeConnections(right);
            }
        };
        codemirror__WEBPACK_IMPORTED_MODULE_0___default().on(window, 'resize', onResize);
        const resizeInterval = setInterval(function () {
            let p = null;
            for (p = wrapElt.parentNode; p && p !== document.body; p = p.parentNode) { } // eslint-disable-line no-empty
            if (!p) {
                clearInterval(resizeInterval);
                codemirror__WEBPACK_IMPORTED_MODULE_0___default().off(window, 'resize', onResize);
            }
        }, 5000);
    }
    editor() {
        return this.edit;
    }
    rightOriginal() {
        return this.right && this.right.orig;
    }
    leftOriginal() {
        return this.left && this.left.orig;
    }
    setShowDifferences(val) {
        if (this.right) {
            this.right.setShowDifferences(val);
        }
        if (this.left) {
            this.left.setShowDifferences(val);
        }
    }
    rightChunks() {
        if (this.right) {
            ensureDiff(this.right);
            return this.right.chunks;
        }
    }
    leftChunks() {
        if (this.left) {
            ensureDiff(this.left);
            return this.left.chunks;
        }
    }
}
function buildGap(dv) {
    const lock = (dv.lockButton = Private.elt('div', null, 'CodeMirror-merge-scrolllock'));
    const lockWrap = Private.elt('div', [lock], 'CodeMirror-merge-scrolllock-wrap');
    codemirror__WEBPACK_IMPORTED_MODULE_0___default().on(lock, 'click', function () {
        DiffView.setScrollLock(dv, !dv.lockScroll);
    });
    const gapElts = [lockWrap];
    if (dv.mv.options.revertButtons !== false) {
        dv.copyButtons = Private.elt('div', null, 'CodeMirror-merge-copybuttons-' + dv.type);
        codemirror__WEBPACK_IMPORTED_MODULE_0___default().on(dv.copyButtons, 'click', function (e) {
            const node = (e.target || e.srcElement);
            if (!node.chunk) {
                return;
            }
            if (node.className == 'CodeMirror-merge-copy-reverse') {
                copyChunk(dv, dv.orig, dv.edit, node.chunk);
                return;
            }
            copyChunk(dv, dv.edit, dv.orig, node.chunk);
        });
        gapElts.unshift(dv.copyButtons);
    }
    if (dv.mv.options.connect != 'align') {
        let svg = document.createElementNS && document.createElementNS(svgNS, 'svg');
        if (svg && !svg.createSVGRect) {
            svg = null;
        }
        dv.svg = svg;
        if (svg) {
            gapElts.push(svg);
        }
    }
    return (dv.gap = Private.elt('div', gapElts, 'CodeMirror-merge-gap'));
}
function asString(obj) {
    if (typeof obj == 'string') {
        return obj;
    }
    else {
        return obj.getValue();
    }
}
// Operations on diffs
let dmp;
function getDiff(a, b, ignoreWhitespace) {
    if (!dmp) {
        dmp = new diff_match_patch__WEBPACK_IMPORTED_MODULE_1__.diff_match_patch();
    }
    const diff = dmp.diff_main(a, b);
    // The library sometimes leaves in empty parts, which confuse the algorithm
    for (let i = 0; i < diff.length; ++i) {
        const part = diff[i];
        if (ignoreWhitespace ? !/[^ \t]/.test(part[1]) : !part[1]) {
            diff.splice(i--, 1);
        }
        else if (i && diff[i - 1][0] == part[0]) {
            diff.splice(i--, 1);
            diff[i][1] += part[1];
        }
    }
    return diff;
}
function getChunks(diff) {
    const chunks = [];
    if (!diff.length) {
        return chunks;
    }
    let startEdit = 0;
    let startOrig = 0;
    const edit = Pos(0, 0);
    const orig = Pos(0, 0);
    for (let i = 0; i < diff.length; ++i) {
        const part = diff[i];
        const tp = part[0];
        if (tp == DiffStatus.Equal) {
            const startOff = !startOfLineClean(diff, i) ||
                edit.line < startEdit ||
                orig.line < startOrig
                ? 1
                : 0;
            const cleanFromEdit = edit.line + startOff;
            const cleanFromOrig = orig.line + startOff;
            moveOver(edit, part[1], null, orig);
            const endOff = endOfLineClean(diff, i) ? 1 : 0;
            const cleanToEdit = edit.line + endOff;
            const cleanToOrig = orig.line + endOff;
            if (cleanToEdit > cleanFromEdit) {
                if (i) {
                    chunks.push({
                        origFrom: startOrig,
                        origTo: cleanFromOrig,
                        editFrom: startEdit,
                        editTo: cleanFromEdit
                    });
                }
                startEdit = cleanToEdit;
                startOrig = cleanToOrig;
            }
        }
        else {
            moveOver(tp == DiffStatus.Insert ? edit : orig, part[1]);
        }
    }
    if (startEdit <= edit.line || startOrig <= orig.line) {
        chunks.push({
            origFrom: startOrig,
            origTo: orig.line + 1,
            editFrom: startEdit,
            editTo: edit.line + 1
        });
    }
    return chunks;
}
function endOfLineClean(diff, i) {
    if (i === diff.length - 1) {
        return true;
    }
    let next = diff[i + 1][1];
    if ((next.length === 1 && i < diff.length - 2) || next.charCodeAt(0) !== 10) {
        return false;
    }
    if (i === diff.length - 2) {
        return true;
    }
    next = diff[i + 2][1];
    return (next.length > 1 || i == diff.length - 3) && next.charCodeAt(0) === 10;
}
function startOfLineClean(diff, i) {
    if (i === 0) {
        return true;
    }
    let last = diff[i - 1][1];
    if (last.charCodeAt(last.length - 1) != 10) {
        return false;
    }
    if (i == 1) {
        return true;
    }
    last = diff[i - 2][1];
    return last.charCodeAt(last.length - 1) == 10;
}
function chunkBoundariesAround(chunks, n, nInEdit) {
    let beforeE;
    let afterE;
    let beforeO;
    let afterO;
    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const fromLocal = nInEdit ? chunk.editFrom : chunk.origFrom;
        const toLocal = nInEdit ? chunk.editTo : chunk.origTo;
        if (afterE == null) {
            if (fromLocal > n) {
                afterE = chunk.editFrom;
                afterO = chunk.origFrom;
            }
            else if (toLocal > n) {
                afterE = chunk.editTo;
                afterO = chunk.origTo;
            }
        }
        if (toLocal <= n) {
            beforeE = chunk.editTo;
            beforeO = chunk.origTo;
        }
        else if (fromLocal <= n) {
            beforeE = chunk.editFrom;
            beforeO = chunk.origFrom;
        }
    }
    return {
        edit: { before: beforeE, after: afterE },
        orig: { before: beforeO, after: afterO }
    };
}
function collapseSingle(cm, from, to) {
    cm.addLineClass(from, 'wrap', 'CodeMirror-merge-collapsed-line');
    const widget = document.createElement('span');
    widget.className = 'CodeMirror-merge-collapsed-widget';
    // @ts-ignore
    widget.title = cm.phrase('Identical text collapsed. Click to expand.');
    // @ts-ignore
    const mark = cm.markText(Pos(from, 0), Pos(to - 1), {
        inclusiveLeft: true,
        inclusiveRight: true,
        replacedWith: widget,
        clearOnEnter: true
    });
    function clear() {
        mark.clear();
        cm.removeLineClass(from, 'wrap', 'CodeMirror-merge-collapsed-line');
    }
    // @ts-ignore
    if (mark.explicitlyCleared) {
        clear();
    }
    codemirror__WEBPACK_IMPORTED_MODULE_0___default().on(widget, 'click', clear);
    mark.on('clear', clear);
    codemirror__WEBPACK_IMPORTED_MODULE_0___default().on(widget, 'click', clear);
    return { mark: mark, clear: clear };
}
function collapseStretch(size, editors) {
    const marks = [];
    function clear() {
        for (let i = 0; i < marks.length; i++) {
            marks[i].clear();
        }
    }
    for (let i = 0; i < editors.length; i++) {
        const editor = editors[i];
        const mark = collapseSingle(editor.cm, editor.line, editor.line + size);
        marks.push(mark);
        mark.mark.on('clear', clear);
    }
    return marks[0].mark;
}
function unclearNearChunks(dv, margin, off, clear) {
    for (let i = 0; i < dv.chunks.length; i++) {
        const chunk = dv.chunks[i];
        for (let l = chunk.editFrom - margin; l < chunk.editTo + margin; l++) {
            const pos = l + off;
            if (pos >= 0 && pos < clear.length) {
                clear[pos] = false;
            }
        }
    }
}
function collapseIdenticalStretches(mv, margin) {
    if (typeof margin != 'number') {
        margin = 2;
    }
    const clear = [];
    const edit = mv.editor();
    // @ts-ignore
    const off = edit.firstLine();
    // @ts-ignore
    for (let l = off, e = edit.lastLine(); l <= e; l++) {
        clear.push(true);
    }
    if (mv.left) {
        unclearNearChunks(mv.left, margin, off, clear);
    }
    if (mv.right) {
        unclearNearChunks(mv.right, margin, off, clear);
    }
    for (let i = 0; i < clear.length; i++) {
        if (clear[i]) {
            const line = i + off;
            let size = 0;
            for (size = 1; i < clear.length - 1 && clear[i + 1]; i++, size++) { } // eslint-disable-line no-empty
            if (size > margin) {
                const editors = [
                    { line: line, cm: edit }
                ];
                if (mv.left) {
                    editors.push({
                        line: getMatchingOrigLine(line, mv.left.chunks),
                        cm: mv.left.orig
                    });
                }
                if (mv.right) {
                    editors.push({
                        line: getMatchingOrigLine(line, mv.right.chunks),
                        cm: mv.right.orig
                    });
                }
                const mark = collapseStretch(size, editors);
                if (mv.options.onCollapse) {
                    mv.options.onCollapse(mv, line, size, mark);
                }
            }
        }
    }
}
function moveOver(pos, str, copy, other) {
    const out = copy ? Pos(pos.line, pos.ch) : pos;
    let at = 0;
    for (;;) {
        const nl = str.indexOf('\n', at);
        if (nl == -1) {
            break;
        }
        ++out.line;
        if (other) {
            ++other.line;
        }
        at = nl + 1;
    }
    out.ch = (at ? 0 : out.ch) + (str.length - at);
    if (other) {
        other.ch = (at ? 0 : other.ch) + (str.length - at);
    }
    return out;
}
// Tracks collapsed markers and line widgets, in order to be able to
// accurately align the content of two editors.
var Alignement;
(function (Alignement) {
    Alignement[Alignement["F_WIDGET"] = 1] = "F_WIDGET";
    Alignement[Alignement["F_WIDGET_BELOW"] = 2] = "F_WIDGET_BELOW";
    Alignement[Alignement["F_MARKER"] = 4] = "F_MARKER";
})(Alignement || (Alignement = {}));
class TrackAlignable {
    constructor(cm) {
        this.cm = cm;
        this.alignable = [];
        // @ts-ignore
        this.height = cm.doc.height;
        const self = this;
        // @ts-ignore
        cm.on('markerAdded', function (_, marker) {
            if (!marker.collapsed) {
                return;
            }
            const found = marker.find(1);
            if (found != null) {
                self.set(found.line, Alignement.F_MARKER);
            }
        });
        // @ts-ignore
        cm.on('markerCleared', function (_, marker, _min, max) {
            if (max !== null && marker.collapsed) {
                self.check(max, Alignement.F_MARKER, self.hasMarker);
            }
        });
        cm.on('markerChanged', this.signal.bind(this));
        // @ts-ignore
        cm.on('lineWidgetAdded', function (_, widget, lineNo) {
            if (widget.mergeSpacer) {
                return;
            }
            if (widget.above) {
                self.set(lineNo - 1, Alignement.F_WIDGET_BELOW);
            }
            else {
                self.set(lineNo, Alignement.F_WIDGET);
            }
        });
        // @ts-ignore
        cm.on('lineWidgetCleared', function (_, widget, lineNo) {
            if (widget.mergeSpacer) {
                return;
            }
            if (widget.above) {
                self.check(lineNo - 1, Alignement.F_WIDGET_BELOW, self.hasWidgetBelow);
            }
            else {
                self.check(lineNo, Alignement.F_WIDGET, self.hasWidget);
            }
        });
        cm.on('lineWidgetChanged', this.signal.bind(this));
        cm.on('change', function (_, change) {
            const start = change.from.line;
            const nBefore = change.to.line - change.from.line;
            const nAfter = change.text.length - 1;
            const end = start + nAfter;
            if (nBefore || nAfter) {
                self.map(start, nBefore, nAfter);
            }
            self.check(end, Alignement.F_MARKER, self.hasMarker);
            if (nBefore || nAfter) {
                self.check(change.from.line, Alignement.F_MARKER, self.hasMarker);
            }
        });
        cm.on('viewportChange', function () {
            // @ts-ignore
            if (self.cm.doc.height !== self.height) {
                self.signal();
            }
        });
    }
    signal() {
        codemirror__WEBPACK_IMPORTED_MODULE_0___default().signal(this, 'realign');
        // @ts-ignore
        this.height = this.cm.doc.height;
    }
    set(n, flags) {
        let pos = -1;
        for (; pos < this.alignable.length; pos += 2) {
            const diff = this.alignable[pos] - n;
            if (diff == 0) {
                if ((this.alignable[pos + 1] & flags) == flags) {
                    return;
                }
                this.alignable[pos + 1] |= flags;
                this.signal();
                return;
            }
            if (diff > 0) {
                break;
            }
        }
        this.signal();
        this.alignable.splice(pos, 0, n, flags);
    }
    find(n) {
        for (let i = 0; i < this.alignable.length; i += 2) {
            if (this.alignable[i] == n) {
                return i;
            }
        }
        return -1;
    }
    check(n, flag, pred) {
        const found = this.find(n);
        if (found == -1 || !(this.alignable[found + 1] & flag)) {
            return;
        }
        if (!pred.call(this, n)) {
            this.signal();
            const flags = this.alignable[found + 1] & ~flag;
            if (flags) {
                this.alignable[found + 1] = flags;
            }
            else {
                this.alignable.splice(found, 2);
            }
        }
    }
    hasMarker(n) {
        const handle = this.cm.getLineHandle(n);
        if (handle.markedSpans) {
            for (let i = 0; i < handle.markedSpans.length; i++) {
                if (handle.markedSpans[i].marker.collapsed &&
                    handle.markedSpans[i].to !== null) {
                    return true;
                }
            }
        }
        return false;
    }
    hasWidget(n) {
        const handle = this.cm.getLineHandle(n);
        if (handle.widgets) {
            for (let i = 0; i < handle.widgets.length; i++) {
                if (!handle.widgets[i].above && !handle.widgets[i].mergeSpacer) {
                    return true;
                }
            }
        }
        return false;
    }
    hasWidgetBelow(n) {
        // @ts-ignore
        if (n == this.cm.lastLine()) {
            return false;
        }
        const handle = this.cm.getLineHandle(n + 1);
        if (handle.widgets) {
            for (let i = 0; i < handle.widgets.length; i++) {
                if (handle.widgets[i].above && !handle.widgets[i].mergeSpacer) {
                    return true;
                }
            }
        }
        return false;
    }
    map(from, nBefore, nAfter) {
        const diff = nAfter - nBefore;
        const to = from + nBefore;
        let widgetFrom = -1;
        let widgetTo = -1;
        for (let i = 0; i < this.alignable.length; i += 2) {
            const n = this.alignable[i];
            if (n == from && this.alignable[i + 1] & Alignement.F_WIDGET_BELOW) {
                widgetFrom = i;
            }
            if (n == to && this.alignable[i + 1] & Alignement.F_WIDGET_BELOW) {
                widgetTo = i;
            }
            if (n <= from) {
                continue;
            }
            else if (n < to) {
                this.alignable.splice(i--, 2);
            }
            else {
                this.alignable[i] += diff;
            }
        }
        if (widgetFrom > -1) {
            const flags = this.alignable[widgetFrom + 1];
            if (flags == Alignement.F_WIDGET_BELOW) {
                this.alignable.splice(widgetFrom, 2);
            }
            else {
                this.alignable[widgetFrom + 1] = flags & ~Alignement.F_WIDGET_BELOW;
            }
        }
        if (widgetTo > -1 && nAfter) {
            this.set(from + nAfter, Alignement.F_WIDGET_BELOW);
        }
    }
}
// @ts-ignore
(codemirror__WEBPACK_IMPORTED_MODULE_0___default().commands.goNextDiff) = function (cm) {
    return Private.goNearbyDiff(cm, 1);
};
// @ts-ignore
(codemirror__WEBPACK_IMPORTED_MODULE_0___default().commands.goPrevDiff) = function (cm) {
    return Private.goNearbyDiff(cm, -1);
};
var Private;
(function (Private) {
    // General utilities
    function elt(tag, content, className, style) {
        const e = document.createElement(tag);
        if (className) {
            e.className = className;
        }
        if (style) {
            e.style.cssText = style;
        }
        if (typeof content == 'string') {
            e.appendChild(document.createTextNode(content));
        }
        else if (content) {
            for (let i = 0; i < content.length; ++i) {
                e.appendChild(content[i]);
            }
        }
        return e;
    }
    Private.elt = elt;
    function clear(node) {
        for (let count = node.childNodes.length; count > 0; --count) {
            node.removeChild(node.firstChild);
        }
    }
    Private.clear = clear;
    function attrs(elt, ...args) {
        for (let i = 1; i < args.length; i += 2) {
            elt.setAttribute(args[i], args[i + 1]);
        }
    }
    Private.attrs = attrs;
    function posMin(a, b) {
        return (a.line - b.line || a.ch - b.ch) < 0 ? a : b;
    }
    Private.posMin = posMin;
    function posMax(a, b) {
        return (a.line - b.line || a.ch - b.ch) > 0 ? a : b;
    }
    Private.posMax = posMax;
    function posEq(a, b) {
        return a.line == b.line && a.ch == b.ch;
    }
    Private.posEq = posEq;
    function findPrevDiff(chunks, start, isOrig) {
        for (let i = chunks.length - 1; i >= 0; i--) {
            const chunk = chunks[i];
            const to = (isOrig ? chunk.origTo : chunk.editTo) - 1;
            if (to < start) {
                return to;
            }
        }
    }
    function findNextDiff(chunks, start, isOrig) {
        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            const from = isOrig ? chunk.origFrom : chunk.editFrom;
            if (from > start) {
                return from;
            }
        }
    }
    function goNearbyDiff(cm, dir) {
        let found = null;
        const views = cm.state.diffViews;
        // @ts-ignore
        const line = cm.getCursor().line;
        if (views) {
            for (let i = 0; i < views.length; i++) {
                const dv = views[i];
                const isOrig = cm == dv.orig;
                ensureDiff(dv);
                const pos = dir < 0
                    ? findPrevDiff(dv.chunks, line, isOrig)
                    : findNextDiff(dv.chunks, line, isOrig);
                if (pos != null &&
                    (found == null || (dir < 0 ? pos > found : pos < found))) {
                    found = pos;
                }
            }
        }
        if (found != null) {
            // @ts-ignore
            cm.setCursor(found, 0);
        }
        else {
            return (codemirror__WEBPACK_IMPORTED_MODULE_0___default().Pass);
        }
    }
    Private.goNearbyDiff = goNearbyDiff;
})(Private || (Private = {}));
//# sourceMappingURL=mergeview.js.map

/***/ }),

/***/ "./lib/components/diff/model.js":
/*!**************************************!*\
  !*** ./lib/components/diff/model.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRefValue": () => /* binding */ getRefValue
/* harmony export */ });
/**
 * Utility method to get the string value of any type of ref.
 */
function getRefValue(ref) {
    if ('specialRef' in ref) {
        return ref.specialRef;
    }
    else {
        return ref.gitRef;
    }
}
//# sourceMappingURL=model.js.map

/***/ }),

/***/ "./lib/git.js":
/*!********************!*\
  !*** ./lib/git.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AUTH_ERROR_MESSAGES": () => /* binding */ AUTH_ERROR_MESSAGES,
/* harmony export */   "requestAPI": () => /* binding */ requestAPI
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tokens */ "./lib/tokens.js");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};



/**
 * Array of Git Auth Error Messages
 */
const AUTH_ERROR_MESSAGES = [
    'Invalid username or password',
    'could not read Username',
    'could not read Password'
];
/**
 * Call the API extension
 *
 * @param endPoint API REST end point for the extension; default ''
 * @param method HTML method; default 'GET'
 * @param body JSON object to be passed as body or null; default null
 * @param namespace API namespace; default 'git'
 * @returns The response body interpreted as JSON
 *
 * @throws {Git.GitResponseError} If the server response is not ok
 * @throws {ServerConnection.NetworkError} If the request cannot be made
 */
async function requestAPI(endPoint = '', method = 'GET', body = null, namespace = 'git') {
    // Make request to Jupyter API
    const settings = _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeSettings();
    const requestUrl = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(settings.baseUrl, namespace, // API Namespace
    endPoint);
    const init = {
        method,
        body: body ? JSON.stringify(body) : undefined
    };
    let response;
    try {
        response = await _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeRequest(requestUrl, init, settings);
    }
    catch (error) {
        throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.NetworkError(error);
    }
    let data = await response.text();
    let isJSON = false;
    if (data.length > 0) {
        try {
            data = JSON.parse(data);
            isJSON = true;
        }
        catch (error) {
            console.log('Not a JSON response body.', response);
        }
    }
    if (!response.ok) {
        if (isJSON) {
            const { message, traceback } = data, json = __rest(data, ["message", "traceback"]);
            throw new _tokens__WEBPACK_IMPORTED_MODULE_2__.Git.GitResponseError(response, message ||
                `Invalid response: ${response.status} ${response.statusText}`, traceback || '', json);
        }
        else {
            throw new _tokens__WEBPACK_IMPORTED_MODULE_2__.Git.GitResponseError(response, data);
        }
    }
    return data;
}
//# sourceMappingURL=git.js.map

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Git": () => /* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_9__.Git,
/* harmony export */   "IGitExtension": () => /* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_9__.IGitExtension,
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/docmanager */ "webpack/sharing/consume/default/@jupyterlab/docmanager");
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/filebrowser */ "webpack/sharing/consume/default/@jupyterlab/filebrowser");
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/mainmenu */ "webpack/sharing/consume/default/@jupyterlab/mainmenu");
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jupyterlab/statusbar */ "webpack/sharing/consume/default/@jupyterlab/statusbar");
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _commandsAndMenu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./commandsAndMenu */ "./lib/commandsAndMenu.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./model */ "./lib/model.js");
/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./server */ "./lib/server.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./style/icons */ "./lib/style/icons.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tokens */ "./lib/tokens.js");
/* harmony import */ var _widgets_gitClone__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./widgets/gitClone */ "./lib/widgets/gitClone.js");
/* harmony import */ var _widgets_GitWidget__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./widgets/GitWidget */ "./lib/widgets/GitWidget.js");
/* harmony import */ var _widgets_StatusWidget__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./widgets/StatusWidget */ "./lib/widgets/StatusWidget.js");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8__);


















/**
 * The default running sessions extension.
 */
const plugin = {
    id: '@jupyterlab/git:plugin',
    requires: [
        _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_4__.IMainMenu,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer,
        _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_3__.IFileBrowserFactory,
        _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_5__.IRenderMimeRegistry,
        _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_6__.ISettingRegistry,
        _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_2__.IDocumentManager,
        _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_7__.IStatusBar,
        _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8__.ITranslator
    ],
    provides: _tokens__WEBPACK_IMPORTED_MODULE_9__.IGitExtension,
    autoStart: true,
    activate
};
/**
 * Export the plugin as default.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);
/**
 * Activate the running plugin.
 */
async function activate(app, mainMenu, restorer, factory, renderMime, settingRegistry, docmanager, statusBar, translator) {
    let gitExtension = null;
    let settings;
    let serverSettings;
    // Get a reference to the default file browser extension
    const filebrowser = factory.defaultBrowser;
    // Attempt to load application settings
    try {
        settings = await settingRegistry.load(plugin.id);
    }
    catch (error) {
        console.error(`Failed to load settings for the Git Extension.\n${error}`);
    }
    try {
        serverSettings = await (0,_server__WEBPACK_IMPORTED_MODULE_10__.getServerSettings)();
        const { frontendVersion, gitVersion, serverVersion } = serverSettings;
        // Version validation
        if (!gitVersion) {
            throw new Error('git command not found - please ensure you have Git > 2 installed');
        }
        else {
            const gitVersion_ = gitVersion.split('.');
            if (Number.parseInt(gitVersion_[0]) < 2) {
                throw new Error(`git command version must be > 2; got ${gitVersion}.`);
            }
        }
        if (frontendVersion && frontendVersion !== serverVersion) {
            throw new Error('The versions of the JupyterLab Git server frontend and backend do not match. ' +
                `The @jupyterlab/git frontend extension has version: ${frontendVersion} ` +
                `while the python package has version ${serverVersion}. ` +
                'Please install identical version of jupyterlab-git Python package and the @jupyterlab/git extension. Try running: pip install --upgrade jupyterlab-git');
        }
    }
    catch (error) {
        // If we fall here, nothing will be loaded in the frontend.
        console.error('Failed to load the jupyterlab-git server extension settings', error);
        (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showErrorMessage)('Failed to load the jupyterlab-git server extension', error.message, [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.warnButton({ label: 'DISMISS' })]);
        return null;
    }
    // Create the Git model
    gitExtension = new _model__WEBPACK_IMPORTED_MODULE_11__.GitExtension(serverSettings.serverRoot, docmanager, app.docRegistry, settings);
    // Whenever we restore the application, sync the Git extension path
    Promise.all([app.restored, filebrowser.model.restored]).then(() => {
        gitExtension.pathRepository = filebrowser.model.path;
    });
    // Whenever the file browser path changes, sync the Git extension path
    filebrowser.model.pathChanged.connect((model, change) => {
        gitExtension.pathRepository = change.newValue;
    });
    // Whenever a user adds/renames/saves/deletes/modifies a file within the lab environment, refresh the Git status
    filebrowser.model.fileChanged.connect(() => gitExtension.refreshStatus());
    // Provided we were able to load application settings, create the extension widgets
    if (settings) {
        // Add JupyterLab commands
        (0,_commandsAndMenu__WEBPACK_IMPORTED_MODULE_12__.addCommands)(app, gitExtension, factory.defaultBrowser, settings, renderMime, translator);
        // Create the Git widget sidebar
        const gitPlugin = new _widgets_GitWidget__WEBPACK_IMPORTED_MODULE_13__.GitWidget(gitExtension, settings, app.commands, factory.defaultBrowser.model);
        gitPlugin.id = 'jp-git-sessions';
        gitPlugin.title.icon = _style_icons__WEBPACK_IMPORTED_MODULE_14__.gitIcon;
        gitPlugin.title.caption = 'Git';
        // Let the application restorer track the running panel for restoration of
        // application state (e.g. setting the running panel as the current side bar
        // widget).
        restorer.add(gitPlugin, 'git-sessions');
        // Rank has been chosen somewhat arbitrarily to give priority to the running
        // sessions widget in the sidebar.
        app.shell.add(gitPlugin, 'left', { rank: 200 });
        // Add a menu for the plugin
        mainMenu.addMenu((0,_commandsAndMenu__WEBPACK_IMPORTED_MODULE_12__.createGitMenu)(app.commands), { rank: 60 });
        // Add a clone button to the file browser extension toolbar
        (0,_widgets_gitClone__WEBPACK_IMPORTED_MODULE_15__.addCloneButton)(gitExtension, factory.defaultBrowser, app.commands);
        // Add the status bar widget
        (0,_widgets_StatusWidget__WEBPACK_IMPORTED_MODULE_16__.addStatusBarWidget)(statusBar, gitExtension, settings);
    }
    return gitExtension;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./lib/logger.js":
/*!***********************!*\
  !*** ./lib/logger.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Logger": () => /* binding */ Logger,
/* harmony export */   "logger": () => /* binding */ logger,
/* harmony export */   "LoggerContext": () => /* binding */ LoggerContext
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Logger
 */
class Logger {
    constructor() {
        this._signal = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_1__.Signal(this);
    }
    /**
     * Signal emitted when a log message is sent
     */
    get signal() {
        return this._signal;
    }
    /**
     * Send a log message.
     *
     * @param message Log message
     */
    log(message) {
        this._signal.emit(message);
    }
}
/**
 * Default logger
 */
const logger = new Logger();
/**
 * Default logger context for React
 */
const LoggerContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(logger);
//# sourceMappingURL=logger.js.map

/***/ }),

/***/ "./lib/model.js":
/*!**********************!*\
  !*** ./lib/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GitExtension": () => /* binding */ GitExtension,
/* harmony export */   "BranchMarker": () => /* binding */ BranchMarker,
/* harmony export */   "Markers": () => /* binding */ Markers
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/polling */ "webpack/sharing/consume/default/@lumino/polling/@lumino/polling");
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_polling__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _git__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./git */ "./lib/git.js");
/* harmony import */ var _taskhandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./taskhandler */ "./lib/taskhandler.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tokens */ "./lib/tokens.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils */ "./lib/utils.js");








// Default refresh interval (in milliseconds) for polling the current Git status (NOTE: this value should be the same value as in the plugin settings schema):
const DEFAULT_REFRESH_INTERVAL = 3000; // ms
/**
 * Class for creating a model for retrieving info from, and interacting with, a remote Git repository.
 */
class GitExtension {
    /**
     * Returns an extension model.
     *
     * @param app - frontend application
     * @param settings - plugin settings
     * @returns extension model
     */
    constructor(serverRoot, docmanager = null, docRegistry = null, settings) {
        /**
         * Fetch poll action.
         */
        this._fetchRemotes = async () => {
            try {
                const current_path = await this._getPathRespository();
                await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('remote/fetch', 'POST', { current_path });
            }
            catch (error) {
                console.error('Failed to fetch remotes', error);
            }
        };
        /**
         * Refresh model status through a Poll
         */
        this._refreshModel = async () => {
            await this._taskHandler.execute('git:refresh', async () => {
                try {
                    await this.refreshBranch();
                    await this.refreshStatus();
                }
                catch (error) {
                    console.error('Failed to refresh git status', error);
                }
            });
        };
        /**
         * Standby test function for the refresh Poll
         *
         * Standby refresh if
         * - webpage is hidden
         * - not in a git repository
         * - standby condition is true
         *
         * @returns The test function
         */
        this._refreshStandby = () => {
            if (this.pathRepository === null || this._standbyCondition()) {
                return true;
            }
            return 'when-hidden';
        };
        this._pathRepository = null;
        this._branches = [];
        this._currentBranch = null;
        this._diffProviders = {};
        this._isDisposed = false;
        this._markerCache = new Markers(() => this._markChanged.emit());
        this.__currentMarker = null;
        this._readyPromise = Promise.resolve();
        this._pendingReadyPromise = 0;
        this._standbyCondition = () => false;
        this._headChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal(this);
        this._markChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal(this);
        this._repositoryChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal(this);
        this._statusChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal(this);
        this._serverRoot = serverRoot;
        this._docmanager = docmanager;
        this._docRegistry = docRegistry;
        this._settings = settings || null;
        this._taskHandler = new _taskhandler__WEBPACK_IMPORTED_MODULE_5__.TaskHandler(this);
        // Initialize repository status
        this._clearStatus();
        let interval;
        if (settings) {
            interval = settings.composite.refreshInterval;
            settings.changed.connect(this._onSettingsChange, this);
        }
        else {
            interval = DEFAULT_REFRESH_INTERVAL;
        }
        this._statusPoll = new _lumino_polling__WEBPACK_IMPORTED_MODULE_2__.Poll({
            factory: this._refreshModel,
            frequency: {
                interval: interval,
                backoff: true,
                max: 300 * 1000
            },
            standby: this._refreshStandby
        });
        this._fetchPoll = new _lumino_polling__WEBPACK_IMPORTED_MODULE_2__.Poll({
            auto: false,
            factory: this._fetchRemotes,
            frequency: {
                interval,
                backoff: true,
                max: 300 * 1000
            },
            standby: this._refreshStandby
        });
    }
    /**
     * Branch list for the current repository.
     */
    get branches() {
        return this._branches;
    }
    /**
     * The current repository branch.
     */
    get currentBranch() {
        return this._currentBranch;
    }
    /**
     * Boolean indicating whether the model has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Boolean indicating whether the model is ready.
     */
    get isReady() {
        return this._pendingReadyPromise === 0;
    }
    /**
     * Promise which fulfills when the model is ready.
     */
    get ready() {
        return this._readyPromise;
    }
    /**
     * Git repository path.
     *
     * ## Notes
     *
     * -   This is the full path of the top-level folder.
     * -   The return value is `null` if a repository path is not defined.
     */
    get pathRepository() {
        return this._pathRepository;
    }
    set pathRepository(v) {
        const change = {
            name: 'pathRepository',
            newValue: null,
            oldValue: this._pathRepository
        };
        if (v === null) {
            this._pendingReadyPromise += 1;
            this._readyPromise.then(() => {
                this._pathRepository = null;
                this._pendingReadyPromise -= 1;
                if (change.newValue !== change.oldValue) {
                    this.refresh().then(() => this._repositoryChanged.emit(change));
                }
            });
        }
        else {
            const currentReady = this._readyPromise;
            this._pendingReadyPromise += 1;
            this._readyPromise = Promise.all([currentReady, this.showTopLevel(v)])
                .then(([_, path]) => {
                change.newValue = this._pathRepository = path;
                if (change.newValue !== change.oldValue) {
                    this.refresh().then(() => this._repositoryChanged.emit(change));
                }
                this._pendingReadyPromise -= 1;
            })
                .catch(reason => {
                this._pendingReadyPromise -= 1;
                console.error(`Fail to find Git top level for path ${v}.\n${reason}`);
            });
        }
    }
    /**
     * Custom model refresh standby condition
     */
    get refreshStandbyCondition() {
        return this._standbyCondition;
    }
    set refreshStandbyCondition(v) {
        this._standbyCondition = v;
    }
    /**
     * Git repository status
     */
    get status() {
        return this._status;
    }
    /**
     * A signal emitted when the `HEAD` of the Git repository changes.
     */
    get headChanged() {
        return this._headChanged;
    }
    /**
     * A signal emitted when the current marking of the Git repository changes.
     */
    get markChanged() {
        return this._markChanged;
    }
    /**
     * A signal emitted when the current Git repository changes.
     */
    get repositoryChanged() {
        return this._repositoryChanged;
    }
    /**
     * A signal emitted when the current status of the Git repository changes.
     */
    get statusChanged() {
        return this._statusChanged;
    }
    /**
     * A signal emitted whenever a model event occurs.
     */
    get taskChanged() {
        return this._taskHandler.taskChanged;
    }
    /**
     * Get the current markers
     *
     * Note: This makes sure it always returns non null value
     */
    get _currentMarker() {
        if (!this.__currentMarker) {
            this._setMarker(this.pathRepository, this._currentBranch ? this._currentBranch.name : '');
        }
        return this.__currentMarker;
    }
    /**
     * Add one or more files to the repository staging area.
     *
     * ## Notes
     *
     * -   If no filename is provided, all files are added.
     *
     * @param filename - files to add
     * @returns promise which resolves upon adding files to the repository staging area
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async add(...filename) {
        const path = await this._getPathRespository();
        await this._taskHandler.execute('git:add:files', async () => {
            await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('add', 'POST', {
                add_all: !filename,
                filename: filename || '',
                top_repo_path: path
            });
        });
        await this.refreshStatus();
    }
    /**
     * Add all "unstaged" files to the repository staging area.
     *
     * @returns promise which resolves upon adding files to the repository staging area
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async addAllUnstaged() {
        const path = await this._getPathRespository();
        await this._taskHandler.execute('git:add:files:all_unstaged', async () => {
            await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('add_all_unstaged', 'POST', {
                top_repo_path: path
            });
        });
        await this.refreshStatus();
    }
    /**
     * Add all untracked files to the repository staging area.
     *
     * @returns promise which resolves upon adding files to the repository staging area
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async addAllUntracked() {
        const path = await this._getPathRespository();
        await this._taskHandler.execute('git:add:files:all_untracked', async () => {
            await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('add_all_untracked', 'POST', {
                top_repo_path: path
            });
        });
        await this.refreshStatus();
    }
    /**
     * Add a remote Git repository to the current repository.
     *
     * @param url - remote repository URL
     * @param name - remote name
     * @returns promise which resolves upon adding a remote
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async addRemote(url, name) {
        const path = await this._getPathRespository();
        await this._taskHandler.execute('git:add:remote', async () => {
            await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('remote/add', 'POST', {
                top_repo_path: path,
                url,
                name
            });
        });
    }
    /**
     * Retrieve the repository commit log.
     *
     * ## Notes
     *
     * -  This API can be used to implicitly check if the current folder is a Git repository.
     *
     * @param count - number of commits to retrieve
     * @returns promise which resolves upon retrieving the repository commit log
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async allHistory(count = 25) {
        const path = await this._getPathRespository();
        return await this._taskHandler.execute('git:fetch:history', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('all_history', 'POST', {
                current_path: path,
                history_count: count
            });
        });
    }
    /**
     * Checkout a branch.
     *
     * ## Notes
     *
     * -   If a branch name is provided, checkout the provided branch (with or without creating it)
     * -   If a filename is provided, checkout the file, discarding all changes.
     * -   If nothing is provided, checkout all files, discarding all changes.
     *
     * TODO: Refactor into separate endpoints for each kind of checkout request
     *
     * @param options - checkout options
     * @returns promise which resolves upon performing a checkout
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async checkout(options) {
        const path = await this._getPathRespository();
        const body = {
            checkout_branch: false,
            new_check: false,
            branchname: '',
            startpoint: '',
            checkout_all: true,
            filename: '',
            top_repo_path: path
        };
        if (options !== undefined) {
            if (options.branchname) {
                body.branchname = options.branchname;
                body.checkout_branch = true;
                body.new_check = options.newBranch === true;
                if (options.newBranch) {
                    body.startpoint = options.startpoint || this._currentBranch.name;
                }
            }
            else if (options.filename) {
                body.filename = options.filename;
                body.checkout_all = false;
            }
        }
        const data = await this._taskHandler.execute('git:checkout', async () => {
            var _a;
            let changes;
            if (!body.new_check) {
                if (body.checkout_branch && !body.new_check) {
                    changes = await this._changedFiles(this._currentBranch.name, body.branchname);
                }
                else if (body.filename) {
                    changes = { files: [body.filename] };
                }
                else {
                    changes = await this._changedFiles('WORKING', 'HEAD');
                }
            }
            const d = await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('checkout', 'POST', body);
            (_a = changes === null || changes === void 0 ? void 0 : changes.files) === null || _a === void 0 ? void 0 : _a.forEach(file => this._revertFile(file));
            return d;
        });
        if (body.checkout_branch) {
            await this.refreshBranch();
        }
        else {
            await this.refreshStatus();
        }
        return data;
    }
    /**
     * Clone a repository.
     *
     * @param path - local path into which the repository will be cloned
     * @param url - Git repository URL
     * @param auth - remote repository authentication information
     * @returns promise which resolves upon cloning a repository
     *
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async clone(path, url, auth) {
        return await this._taskHandler.execute('git:clone', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('clone', 'POST', {
                current_path: path,
                clone_url: url,
                auth: auth
            });
        });
    }
    /**
     * Commit all staged file changes.
     *
     * @param message - commit message
     * @returns promise which resolves upon committing file changes
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async commit(message) {
        const path = await this._getPathRespository();
        await this._taskHandler.execute('git:commit:create', async () => {
            await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('commit', 'POST', {
                commit_msg: message,
                top_repo_path: path
            });
        });
        await this.refresh();
    }
    /**
     * Get (or set) Git configuration options.
     *
     * @param options - configuration options to set
     * @returns promise which resolves upon either getting or setting configuration options
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async config(options) {
        const path = await this._getPathRespository();
        return await this._taskHandler.execute('git:config:' + (options ? 'set' : 'get'), async () => {
            if (options) {
                await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('config', 'POST', {
                    path,
                    options
                });
            }
            else {
                return await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('config', 'POST', { path });
            }
        });
    }
    /**
     * Delete a branch
     *
     * @param branchName Branch name
     * @returns promise which resolves when the branch has been deleted.
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async deleteBranch(branchName) {
        const path = await this._getPathRespository();
        await this._taskHandler.execute('git:branch:delete', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('branch/delete', 'POST', {
                current_path: path,
                branch: branchName
            });
        });
    }
    /**
     * Fetch commit information.
     *
     * @param hash - commit hash
     * @returns promise which resolves upon retrieving commit information
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async detailedLog(hash) {
        const path = await this._getPathRespository();
        const data = await this._taskHandler.execute('git:fetch:commit_log', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('detailed_log', 'POST', {
                selected_hash: hash,
                current_path: path
            });
        });
        data.modified_files = data.modified_files.map(f => {
            f.type = this._resolveFileType(f.modified_file_path);
            return f;
        });
        return data;
    }
    /**
     * Dispose of model resources.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        this._fetchPoll.dispose();
        this._statusPoll.dispose();
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal.clearData(this);
    }
    /**
     * Ensure a .gitignore file exists
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async ensureGitignore() {
        const path = await this._getPathRespository();
        await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('ignore', 'POST', {
            top_repo_path: path
        });
        this._openGitignore();
        await this.refreshStatus();
    }
    /**
     * Return the path of a file relative to the Jupyter server root.
     *
     * ## Notes
     *
     * -   If no path is provided, returns the Git repository top folder relative path.
     * -   If no Git repository selected, returns `null`
     *
     * @param path - file path relative to the top folder of the Git repository
     * @returns relative path
     */
    getRelativeFilePath(path) {
        if (this.pathRepository === null || this._serverRoot === void 0) {
            return null;
        }
        return _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.join(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.relative(this._serverRoot, this.pathRepository), path || '');
    }
    /**
     * Add an entry in .gitignore file
     *
     * @param filePath File to ignore
     * @param useExtension Whether to ignore the file or its extension
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async ignore(filePath, useExtension) {
        const path = await this._getPathRespository();
        await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('ignore', 'POST', {
            top_repo_path: path,
            file_path: filePath,
            use_extension: useExtension
        });
        this._openGitignore();
        await this.refreshStatus();
    }
    /**
     * Initialize a new Git repository at a specified path.
     *
     * @param path - path at which initialize a Git repository
     * @returns promise which resolves upon initializing a Git repository
     *
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async init(path) {
        await this._taskHandler.execute('git:init', async () => {
            await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('init', 'POST', {
                current_path: path
            });
        });
    }
    /**
     * Retrieve commit logs.
     *
     * @param count - number of commits
     * @returns promise which resolves upon retrieving commit logs
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async log(count = 25) {
        const path = await this._getPathRespository();
        return await this._taskHandler.execute('git:fetch:log', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('log', 'POST', {
                current_path: path,
                history_count: count
            });
        });
    }
    /**
     * Fetch changes from a remote repository.
     *
     * @param auth - remote authentication information
     * @returns promise which resolves upon fetching changes
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async pull(auth) {
        const path = await this._getPathRespository();
        const data = this._taskHandler.execute('git:pull', async () => {
            var _a;
            return await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('pull', 'POST', {
                current_path: path,
                auth: auth,
                cancel_on_conflict: ((_a = this._settings) === null || _a === void 0 ? void 0 : _a.composite['cancelPullMergeConflict']) ||
                    false
            });
        });
        this.refreshBranch(); // Will emit headChanged if required
        return data;
    }
    /**
     * Push local changes to a remote repository.
     *
     * @param auth - remote authentication information
     * @returns promise which resolves upon pushing changes
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async push(auth) {
        const path = await this._getPathRespository();
        const data = this._taskHandler.execute('git:push', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('push', 'POST', {
                current_path: path,
                auth: auth
            });
        });
        this.refreshBranch();
        return data;
    }
    /**
     * Refresh the repository.
     *
     * @returns promise which resolves upon refreshing the repository
     */
    async refresh() {
        await this._statusPoll.refresh();
        await this._statusPoll.tick;
    }
    /**
     * Refresh the list of repository branches.
     *
     * Emit headChanged if the branch or its top commit changes
     *
     * @returns promise which resolves upon refreshing repository branches
     */
    async refreshBranch() {
        try {
            const data = await this._taskHandler.execute('git:refresh:branches', async () => {
                return await this._branch();
            });
            let headChanged = false;
            if (!this._currentBranch || !data) {
                headChanged = this._currentBranch !== data.current_branch; // Object comparison is not working
            }
            else {
                headChanged =
                    this._currentBranch.name !== data.current_branch.name ||
                        this._currentBranch.top_commit !== data.current_branch.top_commit;
            }
            this._branches = data.branches;
            this._currentBranch = data.current_branch;
            if (this._currentBranch) {
                // Set up the marker obj for the current (valid) repo/branch combination
                this._setMarker(this.pathRepository, this._currentBranch.name);
            }
            if (headChanged) {
                this._headChanged.emit();
            }
            // Start fetch remotes if the repository has remote branches
            const hasRemote = this._branches.some(branch => branch.is_remote_branch);
            if (hasRemote) {
                this._fetchPoll.start();
            }
            else {
                this._fetchPoll.stop();
            }
        }
        catch (error) {
            const headChanged = this._currentBranch !== null;
            this._branches = [];
            this._currentBranch = null;
            this._fetchPoll.stop();
            if (headChanged) {
                this._headChanged.emit();
            }
            if (!(error instanceof _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.NotInRepository)) {
                throw error;
            }
        }
    }
    /**
     * Refresh the repository status.
     *
     * Emit statusChanged if required.
     *
     * @returns promise which resolves upon refreshing the repository status
     */
    async refreshStatus() {
        var _a;
        let path;
        try {
            path = await this._getPathRespository();
        }
        catch (error) {
            this._clearStatus();
            if (!(error instanceof _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.NotInRepository)) {
                throw error;
            }
            return;
        }
        try {
            const data = await this._taskHandler.execute('git:refresh:status', async () => {
                return await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('status', 'POST', {
                    current_path: path
                });
            });
            this._setStatus({
                branch: data.branch || null,
                remote: data.remote || null,
                ahead: data.ahead || 0,
                behind: data.behind || 0,
                files: (_a = data.files) === null || _a === void 0 ? void 0 : _a.map(file => {
                    return Object.assign(Object.assign({}, file), { status: (0,_utils__WEBPACK_IMPORTED_MODULE_7__.decodeStage)(file.x, file.y), type: this._resolveFileType(file.to) });
                })
            });
        }
        catch (err) {
            // TODO we should notify the user
            this._clearStatus();
            console.error(err);
            return;
        }
    }
    /**
     * Move files from the "staged" to the "unstaged" area.
     *
     * ## Notes
     *
     * -  If no filename is provided, moves all files from the "staged" to the "unstaged" area.
     *
     * @param filename - file path to be reset
     * @returns promise which resolves upon moving files
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async reset(filename) {
        const path = await this._getPathRespository();
        await this._taskHandler.execute('git:reset:changes', async () => {
            const reset_all = filename === undefined;
            let files;
            if (reset_all) {
                files = (await this._changedFiles('INDEX', 'HEAD')).files;
            }
            else {
                files = [filename];
            }
            await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('reset', 'POST', {
                reset_all: filename === undefined,
                filename: filename === undefined ? null : filename,
                top_repo_path: path
            });
            files.forEach(file => {
                this._revertFile(file);
            });
        });
        await this.refreshStatus();
    }
    /**
     * Reset the repository to a specified commit.
     *
     * ## Notes
     *
     * -   If a commit hash is not provided, resets the repository to `HEAD`.
     *
     * @param hash - commit identifier (hash)
     * @returns promises which resolves upon resetting the repository
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async resetToCommit(hash = '') {
        const path = await this._getPathRespository();
        await this._taskHandler.execute('git:reset:hard', async () => {
            const files = (await this._changedFiles(null, null, hash)).files;
            await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('reset_to_commit', 'POST', {
                commit_id: hash,
                top_repo_path: path
            });
            files === null || files === void 0 ? void 0 : files.forEach(file => {
                this._revertFile(file);
            });
        });
        await this.refreshBranch();
    }
    /**
     * Retrieve the prefix path of a directory `path` with respect to the root repository directory.
     *
     * @param path - directory path
     * @returns promise which resolves upon retrieving the prefix path
     *
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async showPrefix(path) {
        try {
            const data = await this._taskHandler.execute('git:fetch:prefix_path', async () => {
                return await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('show_prefix', 'POST', {
                    current_path: path
                });
            });
            return data.under_repo_path || null;
        }
        catch (error) {
            if (error instanceof _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.GitResponseError &&
                error.response.status === 500 &&
                error.json.code === 128) {
                return null;
            }
            throw error;
        }
    }
    /**
     * Retrieve the top level repository path.
     *
     * @param path - current path
     * @returns promise which resolves upon retrieving the top level repository path
     *
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async showTopLevel(path) {
        try {
            const data = await this._taskHandler.execute('git:fetch:top_level_path', async () => {
                return await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('show_top_level', 'POST', {
                    current_path: path
                });
            });
            return data.top_repo_path || null;
        }
        catch (error) {
            if (error instanceof _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.GitResponseError &&
                error.response.status === 500 &&
                error.json.code === 128) {
                return null;
            }
            throw error;
        }
    }
    /**
     * Retrieve the list of tags in the repository.
     *
     * @returns promise which resolves upon retrieving the tag list
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async tags() {
        const path = await this._getPathRespository();
        return await this._taskHandler.execute('git:tag:list', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('tags', 'POST', {
                current_path: path
            });
        });
    }
    /**
     * Checkout the specified tag version
     *
     * @param tag - selected tag version
     * @returns promise which resolves upon checking out the tag version of the repository
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async checkoutTag(tag) {
        const path = await this._getPathRespository();
        return await this._taskHandler.execute('git:tag:checkout', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('tag_checkout', 'POST', {
                current_path: path,
                tag_id: tag
            });
        });
    }
    /**
     * Add a file to the current marker object.
     *
     * @param fname - filename
     * @param mark - mark to set
     */
    addMark(fname, mark) {
        this._currentMarker.add(fname, mark);
    }
    /**
     * Return the current mark associated with a specified filename.
     *
     * @param fname - filename
     * @returns mark
     */
    getMark(fname) {
        return this._currentMarker.get(fname);
    }
    /**
     * Toggle the mark for a file in the current marker object
     *
     * @param fname - filename
     */
    toggleMark(fname) {
        this._currentMarker.toggle(fname);
    }
    /**
     * Register a new diff provider for specified file types
     *
     * @param filetypes File type list
     * @param callback Callback to use for the provided file types
     */
    registerDiffProvider(filetypes, callback) {
        filetypes.forEach(fileType => {
            this._diffProviders[fileType] = callback;
        });
    }
    /**
     * Revert changes made after a specified commit.
     *
     * @param message - commit message
     * @param hash - commit identifier (hash)
     * @returns promise which resolves upon reverting changes
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async revertCommit(message, hash) {
        const path = await this._getPathRespository();
        await this._taskHandler.execute('git:commit:revert', async () => {
            const files = (await this._changedFiles(null, null, hash + '^!')).files;
            await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('delete_commit', 'POST', {
                commit_id: hash,
                top_repo_path: path
            });
            files === null || files === void 0 ? void 0 : files.forEach(file => {
                this._revertFile(file);
            });
        });
        await this.commit(message);
    }
    /**
     * Make request for a list of all git branches in the repository
     * Retrieve a list of repository branches.
     *
     * @returns promise which resolves upon fetching repository branches
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async _branch() {
        const path = await this._getPathRespository();
        return await this._taskHandler.execute('git:fetch:branches', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('branch', 'POST', {
                current_path: path
            });
        });
    }
    /**
     * Get list of files changed between two commits or two branches.
     *
     * Notes:
     *   It assumes the Git path repository as already been checked.
     *
     * @param base id of base commit or base branch for comparison
     * @param remote id of remote commit or remote branch for comparison
     * @param singleCommit id of a single commit
     *
     * @returns the names of the changed files
     *
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async _changedFiles(base, remote, singleCommit) {
        return await (0,_git__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('changed_files', 'POST', {
            current_path: this.pathRepository,
            base: base,
            remote: remote,
            single_commit: singleCommit
        });
    }
    /**
     * Clear repository status
     */
    _clearStatus() {
        this._status = {
            branch: null,
            remote: null,
            ahead: 0,
            behind: 0,
            files: []
        };
    }
    /**
     * Get the current Git repository path
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     */
    async _getPathRespository() {
        await this.ready;
        const path = this.pathRepository;
        if (path === null) {
            throw new _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.NotInRepository();
        }
        return path;
    }
    /**
     * Resolve path to filetype
     */
    _resolveFileType(path) {
        // test if directory
        if (path.endsWith('/')) {
            return _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__.DocumentRegistry.getDefaultDirectoryFileType();
        }
        return (this._docRegistry.getFileTypesForPath(path)[0] ||
            _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__.DocumentRegistry.getDefaultTextFileType());
    }
    /**
     * Set the repository status.
     *
     * @param v - repository status
     */
    _setStatus(v) {
        this._status = v;
        this._statusChanged.emit(this._status);
    }
    /**
     * Callback invoked upon a change to plugin settings.
     *
     * @private
     * @param settings - plugin settings
     */
    _onSettingsChange(settings) {
        this._fetchPoll.frequency = Object.assign(Object.assign({}, this._fetchPoll.frequency), { interval: settings.composite.refreshInterval });
        this._statusPoll.frequency = Object.assign(Object.assign({}, this._statusPoll.frequency), { interval: settings.composite.refreshInterval });
    }
    /**
     * open new editor or show an existing editor of the
     * .gitignore file. If the editor does not have unsaved changes
     * then ensure the editor's content matches the file on disk
     */
    _openGitignore() {
        if (this._docmanager) {
            const widget = this._docmanager.openOrReveal(this.getRelativeFilePath('.gitignore'));
            if (widget && !widget.context.model.dirty) {
                widget.context.revert();
            }
        }
    }
    /**
     * if file is open in JupyterLab find the widget and ensure the JupyterLab
     * version matches the version on disk. Do nothing if the file has unsaved changes
     *
     * @param path path to the file to be reverted
     */
    _revertFile(path) {
        const widget = this._docmanager.findWidget(this.getRelativeFilePath(path));
        if (widget && !widget.context.model.dirty) {
            widget.context.revert();
        }
    }
    /**
     * Set the marker object for a repository path and branch.
     */
    _setMarker(path, branch) {
        this.__currentMarker = this._markerCache.get(path, branch);
    }
}
class BranchMarker {
    constructor(_refresh) {
        this._refresh = _refresh;
        this._marks = {};
    }
    add(fname, mark = true) {
        if (!(fname in this._marks)) {
            this.set(fname, mark);
        }
    }
    get(fname) {
        return this._marks[fname];
    }
    set(fname, mark) {
        this._marks[fname] = mark;
        this._refresh();
    }
    toggle(fname) {
        this.set(fname, !this._marks[fname]);
    }
}
class Markers {
    constructor(_refresh) {
        this._refresh = _refresh;
        this._branchMarkers = {};
    }
    get(path, branch) {
        const key = Markers.markerKey(path, branch);
        if (key in this._branchMarkers) {
            return this._branchMarkers[key];
        }
        const marker = new BranchMarker(this._refresh);
        this._branchMarkers[key] = marker;
        return marker;
    }
    static markerKey(path, branch) {
        return [path, branch].join(':');
    }
}
//# sourceMappingURL=model.js.map

/***/ }),

/***/ "./lib/server.js":
/*!***********************!*\
  !*** ./lib/server.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSettings": () => /* binding */ getServerSettings
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tokens */ "./lib/tokens.js");
/* harmony import */ var _git__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./git */ "./lib/git.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./version */ "./lib/version.js");





/**
 * Obtain the server settings or provide meaningful error message for the end user
 *
 * @returns The server settings
 *
 * @throws {ServerConnection.ResponseError} If the response was not ok
 * @throws {ServerConnection.NetworkError} If the request failed to reach the server
 */
async function getServerSettings() {
    try {
        const endpoint = 'settings' + _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.objectToQueryString({ version: _version__WEBPACK_IMPORTED_MODULE_2__.version });
        const settings = await (0,_git__WEBPACK_IMPORTED_MODULE_3__.requestAPI)(endpoint, 'GET');
        return settings;
    }
    catch (error) {
        if (error instanceof _tokens__WEBPACK_IMPORTED_MODULE_4__.Git.GitResponseError) {
            const response = error.response;
            if (response.status === 404) {
                const message = 'Git server extension is unavailable. Please ensure you have installed the ' +
                    'JupyterLab Git server extension by running: pip install --upgrade jupyterlab-git. ' +
                    'To confirm that the server extension is installed, run: jupyter server extension list.';
                throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.ResponseError(response, message);
            }
            else {
                const message = error.message;
                console.error('Failed to get the server extension settings', message);
                throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.ResponseError(response, message);
            }
        }
        else {
            throw error;
        }
    }
}
//# sourceMappingURL=server.js.map

/***/ }),

/***/ "./lib/style/ActionButtonStyle.js":
/*!****************************************!*\
  !*** ./lib/style/ActionButtonStyle.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "actionButtonStyle": () => /* binding */ actionButtonStyle,
/* harmony export */   "hiddenButtonStyle": () => /* binding */ hiddenButtonStyle,
/* harmony export */   "showButtonOnHover": () => /* binding */ showButtonOnHover
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const actionButtonStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '0 0 auto',
    background: 'none',
    lineHeight: '0px',
    padding: '0px 4px',
    width: '16px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    $nest: {
        '&:active': {
            transform: 'scale(1.272019649)',
            overflow: 'hidden'
        },
        '&:disabled': {
            cursor: 'default'
        }
    }
});
const hiddenButtonStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'none'
});
const showButtonOnHover = (() => {
    const styled = {
        $nest: {}
    };
    const selector = `&:hover .${hiddenButtonStyle}`;
    styled.$nest[selector] = {
        display: 'block'
    };
    return styled;
})();
//# sourceMappingURL=ActionButtonStyle.js.map

/***/ }),

/***/ "./lib/style/BranchMenu.js":
/*!*********************************!*\
  !*** ./lib/style/BranchMenu.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nameClass": () => /* binding */ nameClass,
/* harmony export */   "wrapperClass": () => /* binding */ wrapperClass,
/* harmony export */   "filterWrapperClass": () => /* binding */ filterWrapperClass,
/* harmony export */   "filterClass": () => /* binding */ filterClass,
/* harmony export */   "filterInputClass": () => /* binding */ filterInputClass,
/* harmony export */   "filterClearClass": () => /* binding */ filterClearClass,
/* harmony export */   "newBranchButtonClass": () => /* binding */ newBranchButtonClass,
/* harmony export */   "listItemClass": () => /* binding */ listItemClass,
/* harmony export */   "activeListItemClass": () => /* binding */ activeListItemClass,
/* harmony export */   "listItemIconClass": () => /* binding */ listItemIconClass
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ActionButtonStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActionButtonStyle */ "./lib/style/ActionButtonStyle.js");


const nameClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '1 1 auto',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
});
const wrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    marginTop: '6px',
    marginBottom: '0',
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)'
});
const filterWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '4px 11px 4px',
    display: 'flex'
});
const filterClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '1 1 auto',
    boxSizing: 'border-box',
    display: 'inline-block',
    position: 'relative',
    fontSize: 'var(--jp-ui-font-size1)'
});
const filterInputClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    width: '100%',
    height: '2em',
    /* top | right | bottom | left */
    padding: '1px 18px 2px 7px',
    color: 'var(--jp-ui-font-color1)',
    fontSize: 'var(--jp-ui-font-size1)',
    fontWeight: 300,
    backgroundColor: 'var(--jp-layout-color1)',
    border: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: '3px',
    $nest: {
        '&:active': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        },
        '&:focus': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        }
    }
});
const filterClearClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    position: 'absolute',
    right: '5px',
    top: '0.6em',
    height: '1.1em',
    width: '1.1em',
    padding: 0,
    backgroundColor: 'var(--jp-inverse-layout-color4)',
    border: 'none',
    borderRadius: '50%',
    $nest: {
        svg: {
            width: '0.5em!important',
            height: '0.5em!important',
            fill: 'var(--jp-ui-inverse-font-color0)'
        },
        '&:hover': {
            backgroundColor: 'var(--jp-inverse-layout-color3)'
        },
        '&:active': {
            backgroundColor: 'var(--jp-inverse-layout-color2)'
        }
    }
});
const newBranchButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    width: '7.7em',
    height: '2em',
    flex: '0 0 auto',
    marginLeft: '5px',
    color: 'white',
    fontSize: 'var(--jp-ui-font-size1)',
    backgroundColor: 'var(--md-blue-500)',
    border: '0',
    borderRadius: '3px',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--md-blue-600)'
        },
        '&:active': {
            backgroundColor: 'var(--md-blue-700)'
        }
    }
});
const listItemClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '4px 11px!important'
}, _ActionButtonStyle__WEBPACK_IMPORTED_MODULE_1__.showButtonOnHover);
const activeListItemClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'white!important',
    backgroundColor: 'var(--jp-brand-color1)!important',
    $nest: {
        '& .jp-icon-selectable[fill]': {
            fill: 'white'
        }
    }
});
const listItemIconClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '16px',
    height: '16px',
    marginRight: '4px'
});
//# sourceMappingURL=BranchMenu.js.map

/***/ }),

/***/ "./lib/style/CommitBox.js":
/*!********************************!*\
  !*** ./lib/style/CommitBox.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "commitFormClass": () => /* binding */ commitFormClass,
/* harmony export */   "commitSummaryClass": () => /* binding */ commitSummaryClass,
/* harmony export */   "commitDescriptionClass": () => /* binding */ commitDescriptionClass,
/* harmony export */   "commitButtonClass": () => /* binding */ commitButtonClass
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const commitFormClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 'auto',
    padding: '8px',
    paddingTop: '1em',
    alignItems: 'flex-start',
    backgroundColor: 'var(--jp-layout-color1)',
    borderTop: 'var(--jp-border-width) solid var(--jp-border-color2)'
});
const commitSummaryClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '100%',
    height: '1.5em',
    marginBottom: '1em',
    padding: 'var(--jp-code-padding)',
    outline: 'none',
    overflowX: 'auto',
    color: 'var(--jp-ui-font-color1)',
    fontSize: 'var(--jp-ui-font-size1)',
    fontWeight: 300,
    backgroundColor: 'var(--jp-layout-color1)',
    border: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: '3px',
    $nest: {
        '&:active': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        },
        '&:focus': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        }
    }
});
const commitDescriptionClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '100%',
    marginBottom: '1em',
    padding: 'var(--jp-code-padding)',
    outline: 'none',
    overflowX: 'auto',
    resize: 'none',
    color: 'var(--jp-ui-font-color1)',
    fontSize: 'var(--jp-ui-font-size1)',
    fontWeight: 300,
    backgroundColor: 'var(--jp-layout-color1)',
    border: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: '3px',
    $nest: {
        '&:focus': {
            outline: 'none',
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        },
        '&:active': {
            outline: 'none',
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        },
        '&::placeholder': {
            color: 'var(--jp-ui-font-color3)'
        },
        '&::-webkit-input-placeholder': {
            color: 'var(--jp-ui-font-color3)'
        },
        '&::-moz-placeholder': {
            color: 'var(--jp-ui-font-color3)'
        },
        '&::-ms-input-placeholder': {
            color: 'var(--jp-ui-font-color3)'
        }
    }
});
const commitButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '100%',
    height: '2em',
    marginBottom: '0.5em',
    color: 'white',
    fontSize: 'var(--jp-ui-font-size1)',
    cursor: 'pointer',
    backgroundColor: 'var(--md-blue-500)',
    border: '0',
    borderRadius: '3px',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--md-blue-600)'
        },
        '&:active': {
            backgroundColor: 'var(--md-blue-700)'
        },
        '&:disabled': {
            cursor: 'default',
            color: 'var(--jp-ui-inverse-font-color0)',
            backgroundColor: 'var(--jp-layout-color3)'
        },
        '&:disabled:hover': {
            backgroundColor: 'var(--jp-layout-color3)'
        },
        '&:disabled:active': {
            backgroundColor: 'var(--jp-layout-color3)'
        }
    }
});
//# sourceMappingURL=CommitBox.js.map

/***/ }),

/***/ "./lib/style/FileItemStyle.js":
/*!************************************!*\
  !*** ./lib/style/FileItemStyle.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fileStyle": () => /* binding */ fileStyle,
/* harmony export */   "selectedFileStyle": () => /* binding */ selectedFileStyle,
/* harmony export */   "fileChangedLabelStyle": () => /* binding */ fileChangedLabelStyle,
/* harmony export */   "selectedFileChangedLabelStyle": () => /* binding */ selectedFileChangedLabelStyle,
/* harmony export */   "fileChangedLabelBrandStyle": () => /* binding */ fileChangedLabelBrandStyle,
/* harmony export */   "fileChangedLabelInfoStyle": () => /* binding */ fileChangedLabelInfoStyle,
/* harmony export */   "fileGitButtonStyle": () => /* binding */ fileGitButtonStyle,
/* harmony export */   "fileButtonStyle": () => /* binding */ fileButtonStyle,
/* harmony export */   "gitMarkBoxStyle": () => /* binding */ gitMarkBoxStyle
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ActionButtonStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActionButtonStyle */ "./lib/style/ActionButtonStyle.js");


const fileStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    boxSizing: 'border-box',
    color: 'var(--jp-ui-font-color1)',
    lineHeight: 'var(--jp-private-running-item-height)',
    padding: '0px 4px',
    listStyleType: 'none',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--jp-layout-color2)'
        }
    }
}, _ActionButtonStyle__WEBPACK_IMPORTED_MODULE_1__.showButtonOnHover);
const selectedFileStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'white',
    background: 'var(--jp-brand-color1)',
    $nest: {
        '&:hover': {
            color: 'white',
            background: 'var(--jp-brand-color1) !important'
        },
        '&:hover .jp-icon-selectable[fill]': {
            fill: 'white'
        },
        '&:hover .jp-icon-selectable[stroke]': {
            stroke: 'white'
        },
        '& .jp-icon-selectable[fill]': {
            fill: 'white'
        },
        '& .jp-icon-selectable-inverse[fill]': {
            fill: 'var(--jp-brand-color1)'
        }
    }
});
const fileChangedLabelStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontSize: '10px',
    marginLeft: '5px'
});
const selectedFileChangedLabelStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'white !important'
});
const fileChangedLabelBrandStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'var(--jp-brand-color0)'
});
const fileChangedLabelInfoStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'var(--jp-info-color0)'
});
const fileGitButtonStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'none'
});
const fileButtonStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    marginTop: '5px'
});
const gitMarkBoxStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '0 0 auto'
});
//# sourceMappingURL=FileItemStyle.js.map

/***/ }),

/***/ "./lib/style/FileListStyle.js":
/*!************************************!*\
  !*** ./lib/style/FileListStyle.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fileListWrapperClass": () => /* binding */ fileListWrapperClass
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const fileListWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    height: 'inherit',
    minHeight: '150px',
    overflow: 'hidden',
    overflowY: 'auto'
});
//# sourceMappingURL=FileListStyle.js.map

/***/ }),

/***/ "./lib/style/FilePathStyle.js":
/*!************************************!*\
  !*** ./lib/style/FilePathStyle.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fileIconStyle": () => /* binding */ fileIconStyle,
/* harmony export */   "fileLabelStyle": () => /* binding */ fileLabelStyle,
/* harmony export */   "folderLabelStyle": () => /* binding */ folderLabelStyle
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const fileIconStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '0 0 auto',
    height: '16px',
    width: '16px',
    marginRight: '4px'
});
const fileLabelStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '1 1 auto',
    fontSize: 'var(--jp-ui-font-size1)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
});
const folderLabelStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'var(--jp-ui-font-color2)',
    fontSize: 'var(--jp-ui-font-size0)',
    margin: '0px 4px'
});
//# sourceMappingURL=FilePathStyle.js.map

/***/ }),

/***/ "./lib/style/GitPanel.js":
/*!*******************************!*\
  !*** ./lib/style/GitPanel.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "panelWrapperClass": () => /* binding */ panelWrapperClass,
/* harmony export */   "warningTextClass": () => /* binding */ warningTextClass,
/* harmony export */   "repoButtonClass": () => /* binding */ repoButtonClass,
/* harmony export */   "tabsClass": () => /* binding */ tabsClass,
/* harmony export */   "tabClass": () => /* binding */ tabClass,
/* harmony export */   "selectedTabClass": () => /* binding */ selectedTabClass,
/* harmony export */   "tabIndicatorClass": () => /* binding */ tabIndicatorClass
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const panelWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'auto'
});
const warningTextClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontSize: 'var(--jp-ui-font-size1)',
    lineHeight: 'var(--jp-content-line-height)',
    margin: '13px 11px 4px 11px',
    textAlign: 'left'
});
const repoButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    alignSelf: 'center',
    boxSizing: 'border-box',
    height: '2em',
    width: '12em',
    marginTop: '5px',
    border: '0',
    borderRadius: '3px',
    color: 'white',
    fontSize: 'var(--jp-ui-font-size1)',
    backgroundColor: 'var(--md-blue-500)',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--md-blue-600)'
        },
        '&:active': {
            backgroundColor: 'var(--md-blue-700)'
        }
    }
});
const tabsClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    minHeight: '36px!important',
    $nest: {
        'button:last-of-type': {
            borderRight: 'none'
        }
    }
});
const tabClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '50%',
    minWidth: '0!important',
    maxWidth: '50%!important',
    minHeight: '36px!important',
    backgroundColor: 'var(--jp-layout-color2)!important',
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)!important',
    borderRight: 'var(--jp-border-width) solid var(--jp-border-color2)!important',
    $nest: {
        span: {
            textTransform: 'none'
        }
    }
});
const selectedTabClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--jp-layout-color1)!important'
});
const tabIndicatorClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    height: '3px!important',
    backgroundColor: 'var(--jp-brand-color1)!important',
    transition: 'none!important'
});
//# sourceMappingURL=GitPanel.js.map

/***/ }),

/***/ "./lib/style/GitStageStyle.js":
/*!************************************!*\
  !*** ./lib/style/GitStageStyle.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sectionFileContainerStyle": () => /* binding */ sectionFileContainerStyle,
/* harmony export */   "sectionAreaStyle": () => /* binding */ sectionAreaStyle,
/* harmony export */   "sectionHeaderLabelStyle": () => /* binding */ sectionHeaderLabelStyle,
/* harmony export */   "sectionHeaderSizeStyle": () => /* binding */ sectionHeaderSizeStyle,
/* harmony export */   "changeStageButtonStyle": () => /* binding */ changeStageButtonStyle
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ActionButtonStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActionButtonStyle */ "./lib/style/ActionButtonStyle.js");


const sectionFileContainerStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    margin: '0',
    padding: '0',
    overflow: 'auto',
    $nest: {
        '& button:disabled': {
            opacity: 0.5
        }
    }
});
const sectionAreaStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '4px 0px',
    padding: '4px',
    fontWeight: 600,
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
    letterSpacing: '1px',
    fontSize: '12px',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--jp-layout-color2)'
        }
    }
}, _ActionButtonStyle__WEBPACK_IMPORTED_MODULE_1__.showButtonOnHover);
const sectionHeaderLabelStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontSize: 'var(--jp-ui-font-size1)',
    flex: '1 1 auto',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
});
const sectionHeaderSizeStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontSize: 'var(--jp-ui-font-size1)',
    flex: '0 0 auto',
    whiteSpace: 'nowrap',
    borderRadius: '2px'
});
const changeStageButtonStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '0 0 auto',
    backgroundColor: 'transparent',
    height: '13px',
    width: '12px',
    border: 'none',
    outline: 'none',
    paddingLeft: '0px'
});
//# sourceMappingURL=GitStageStyle.js.map

/***/ }),

/***/ "./lib/style/GitWidgetStyle.js":
/*!*************************************!*\
  !*** ./lib/style/GitWidgetStyle.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gitWidgetStyle": () => /* binding */ gitWidgetStyle
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const gitWidgetStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexDirection: 'column',
    minWidth: '300px',
    color: 'var(--jp-ui-font-color1)',
    background: 'var(--jp-layout-color1)',
    fontSize: 'var(--jp-ui-font-size1)'
});
//# sourceMappingURL=GitWidgetStyle.js.map

/***/ }),

/***/ "./lib/style/HistorySideBarStyle.js":
/*!******************************************!*\
  !*** ./lib/style/HistorySideBarStyle.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "historySideBarStyle": () => /* binding */ historySideBarStyle
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const historySideBarStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '400px',
    marginBlockStart: 0,
    marginBlockEnd: 0,
    paddingLeft: 0,
    overflowY: 'auto'
});
//# sourceMappingURL=HistorySideBarStyle.js.map

/***/ }),

/***/ "./lib/style/NewBranchDialog.js":
/*!**************************************!*\
  !*** ./lib/style/NewBranchDialog.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "branchDialogClass": () => /* binding */ branchDialogClass,
/* harmony export */   "closeButtonClass": () => /* binding */ closeButtonClass,
/* harmony export */   "titleWrapperClass": () => /* binding */ titleWrapperClass,
/* harmony export */   "titleClass": () => /* binding */ titleClass,
/* harmony export */   "contentWrapperClass": () => /* binding */ contentWrapperClass,
/* harmony export */   "nameInputClass": () => /* binding */ nameInputClass,
/* harmony export */   "filterWrapperClass": () => /* binding */ filterWrapperClass,
/* harmony export */   "filterClass": () => /* binding */ filterClass,
/* harmony export */   "filterInputClass": () => /* binding */ filterInputClass,
/* harmony export */   "filterClearClass": () => /* binding */ filterClearClass,
/* harmony export */   "listWrapperClass": () => /* binding */ listWrapperClass,
/* harmony export */   "listItemClass": () => /* binding */ listItemClass,
/* harmony export */   "activeListItemClass": () => /* binding */ activeListItemClass,
/* harmony export */   "listItemContentClass": () => /* binding */ listItemContentClass,
/* harmony export */   "listItemDescClass": () => /* binding */ listItemDescClass,
/* harmony export */   "listItemIconClass": () => /* binding */ listItemIconClass,
/* harmony export */   "listItemTitleClass": () => /* binding */ listItemTitleClass,
/* harmony export */   "listItemBoldTitleClass": () => /* binding */ listItemBoldTitleClass,
/* harmony export */   "errorMessageClass": () => /* binding */ errorMessageClass,
/* harmony export */   "actionsWrapperClass": () => /* binding */ actionsWrapperClass,
/* harmony export */   "buttonClass": () => /* binding */ buttonClass,
/* harmony export */   "cancelButtonClass": () => /* binding */ cancelButtonClass,
/* harmony export */   "createButtonClass": () => /* binding */ createButtonClass
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const branchDialogClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    minHeight: '460px',
    width: '400px',
    color: 'var(--jp-ui-font-color1)!important',
    borderRadius: '3px!important',
    backgroundColor: 'var(--jp-layout-color1)!important'
});
const closeButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    position: 'absolute',
    top: '10px',
    right: '12px',
    height: '30px',
    width: '30px',
    padding: 0,
    border: 'none',
    borderRadius: '50%',
    backgroundColor: 'var(--jp-layout-color1)',
    $nest: {
        svg: {
            fill: 'var(--jp-ui-font-color1)'
        },
        '&:hover': {
            backgroundColor: 'var(--jp-border-color2)'
        },
        '&:active': {
            backgroundColor: 'var(--jp-border-color2)'
        }
    }
});
const titleWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    position: 'relative',
    padding: '15px',
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)'
});
const titleClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontWeight: 700
});
const contentWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '15px',
    $nest: {
        '> p': {
            marginBottom: '7px'
        }
    }
});
const nameInputClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    width: '100%',
    height: '2em',
    marginBottom: '16px',
    /* top | right | bottom | left */
    padding: '1px 18px 2px 7px',
    color: 'var(--jp-ui-font-color1)',
    fontSize: 'var(--jp-ui-font-size1)',
    fontWeight: 300,
    backgroundColor: 'var(--jp-layout-color1)',
    border: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: '3px',
    $nest: {
        '&:active': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        },
        '&:focus': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        }
    }
});
const filterWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: 0,
    paddingBottom: '4px'
});
const filterClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    marginRight: '11px',
    fontSize: 'var(--jp-ui-font-size1)'
});
const filterInputClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    width: '100%',
    height: '2em',
    /* top | right | bottom | left */
    padding: '1px 18px 2px 7px',
    color: 'var(--jp-ui-font-color1)',
    fontSize: 'var(--jp-ui-font-size1)',
    fontWeight: 300,
    backgroundColor: 'var(--jp-layout-color1)',
    border: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: '3px',
    $nest: {
        '&:active': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        },
        '&:focus': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        }
    }
});
const filterClearClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    position: 'absolute',
    right: '5px',
    top: '0.6em',
    height: '1.1em',
    width: '1.1em',
    padding: 0,
    backgroundColor: 'var(--jp-inverse-layout-color4)',
    border: 'none',
    borderRadius: '50%',
    $nest: {
        svg: {
            width: '0.5em!important',
            height: '0.5em!important',
            fill: 'var(--jp-ui-inverse-font-color0)'
        },
        '&:hover': {
            backgroundColor: 'var(--jp-inverse-layout-color3)'
        },
        '&:active': {
            backgroundColor: 'var(--jp-inverse-layout-color2)'
        }
    }
});
const listWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    display: 'block',
    border: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: '3px',
    paddingTop: 0,
    paddingBottom: 0
});
const listItemClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    /* top | right | bottom | left */
    padding: '4px 11px 4px 11px!important',
    fontSize: 'var(--jp-ui-font-size1)',
    lineHeight: '1.5em'
});
const activeListItemClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'white!important',
    backgroundColor: 'var(--jp-brand-color1)!important',
    $nest: {
        '& .jp-icon-selectable[fill]': {
            fill: 'white'
        }
    }
});
const listItemContentClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flexBasis: 0,
    flexGrow: 1,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto'
});
const listItemDescClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    marginBottom: 'auto'
});
const listItemIconClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '16px',
    height: '16px',
    /* top | right | bottom | left */
    margin: 'auto 8px auto 0'
});
const listItemTitleClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({});
const listItemBoldTitleClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontWeight: 700
});
const errorMessageClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: '#ff0000'
});
const actionsWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '15px!important',
    borderTop: 'var(--jp-border-width) solid var(--jp-border-color2)'
});
const buttonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    width: '9em',
    height: '2em',
    color: 'white',
    fontSize: 'var(--jp-ui-font-size1)',
    border: '0',
    borderRadius: '3px'
});
const cancelButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--md-grey-500)',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--md-grey-600)'
        },
        '&:active': {
            backgroundColor: 'var(--md-grey-700)'
        }
    }
});
const createButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--md-blue-500)',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--md-blue-600)'
        },
        '&:active': {
            backgroundColor: 'var(--md-blue-700)'
        },
        '&:disabled': {
            cursor: 'default',
            color: 'var(--jp-ui-inverse-font-color0)',
            backgroundColor: 'var(--jp-layout-color3)'
        },
        '&:disabled:hover': {
            backgroundColor: 'var(--jp-layout-color3)'
        },
        '&:disabled:active': {
            backgroundColor: 'var(--jp-layout-color3)'
        }
    }
});
//# sourceMappingURL=NewBranchDialog.js.map

/***/ }),

/***/ "./lib/style/PastCommitNode.js":
/*!*************************************!*\
  !*** ./lib/style/PastCommitNode.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "commitWrapperClass": () => /* binding */ commitWrapperClass,
/* harmony export */   "commitHeaderClass": () => /* binding */ commitHeaderClass,
/* harmony export */   "commitHeaderItemClass": () => /* binding */ commitHeaderItemClass,
/* harmony export */   "branchWrapperClass": () => /* binding */ branchWrapperClass,
/* harmony export */   "branchClass": () => /* binding */ branchClass,
/* harmony export */   "remoteBranchClass": () => /* binding */ remoteBranchClass,
/* harmony export */   "localBranchClass": () => /* binding */ localBranchClass,
/* harmony export */   "workingBranchClass": () => /* binding */ workingBranchClass,
/* harmony export */   "commitExpandedClass": () => /* binding */ commitExpandedClass,
/* harmony export */   "commitBodyClass": () => /* binding */ commitBodyClass,
/* harmony export */   "iconButtonClass": () => /* binding */ iconButtonClass
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const commitWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flexGrow: 0,
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'column',
    padding: '5px 0px 5px 10px',
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)'
});
const commitHeaderClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    color: 'var(--jp-ui-font-color2)',
    paddingBottom: '5px'
});
const commitHeaderItemClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '30%',
    paddingLeft: '0.5em',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    $nest: {
        '&:first-child': {
            paddingLeft: 0
        }
    }
});
const branchWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    fontSize: '0.8em',
    marginLeft: '-5px'
});
const branchClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '2px',
    // Special case, regardless of theme, because
    // backgrounds of colors are not based on theme either
    color: 'var(--md-grey-900)',
    border: 'var(--jp-border-width) solid var(--md-grey-700)',
    borderRadius: '4px',
    margin: '3px'
});
const remoteBranchClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--md-blue-100)'
});
const localBranchClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--md-orange-100)'
});
const workingBranchClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--md-red-100)'
});
const commitExpandedClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--jp-layout-color1)'
});
const commitBodyClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: 'auto'
});
const iconButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '16px',
    height: '16px',
    /* top | right | bottom | left */
    margin: 'auto 8px auto auto'
});
//# sourceMappingURL=PastCommitNode.js.map

/***/ }),

/***/ "./lib/style/ResetRevertDialog.js":
/*!****************************************!*\
  !*** ./lib/style/ResetRevertDialog.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resetRevertDialogClass": () => /* binding */ resetRevertDialogClass,
/* harmony export */   "closeButtonClass": () => /* binding */ closeButtonClass,
/* harmony export */   "titleWrapperClass": () => /* binding */ titleWrapperClass,
/* harmony export */   "titleClass": () => /* binding */ titleClass,
/* harmony export */   "contentWrapperClass": () => /* binding */ contentWrapperClass,
/* harmony export */   "actionsWrapperClass": () => /* binding */ actionsWrapperClass,
/* harmony export */   "buttonClass": () => /* binding */ buttonClass,
/* harmony export */   "cancelButtonClass": () => /* binding */ cancelButtonClass,
/* harmony export */   "submitButtonClass": () => /* binding */ submitButtonClass,
/* harmony export */   "commitFormClass": () => /* binding */ commitFormClass,
/* harmony export */   "commitSummaryClass": () => /* binding */ commitSummaryClass,
/* harmony export */   "commitDescriptionClass": () => /* binding */ commitDescriptionClass
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const resetRevertDialogClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    height: 'auto',
    width: '380px',
    color: 'var(--jp-ui-font-color1)!important',
    borderRadius: '3px!important',
    backgroundColor: 'var(--jp-layout-color1)!important'
});
const closeButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    position: 'absolute',
    top: '10px',
    right: '12px',
    height: '30px',
    width: '30px',
    padding: 0,
    border: 'none',
    borderRadius: '50%',
    backgroundColor: 'var(--jp-layout-color1)',
    $nest: {
        svg: {
            fill: 'var(--jp-ui-font-color1)'
        },
        '&:hover': {
            backgroundColor: 'var(--jp-border-color2)'
        },
        '&:active': {
            backgroundColor: 'var(--jp-border-color2)'
        }
    }
});
const titleWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    position: 'relative',
    padding: '15px',
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)'
});
const titleClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontWeight: 700
});
const contentWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '15px',
    $nest: {
        '> p': {
            marginBottom: '7px'
        }
    }
});
const actionsWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '15px!important',
    borderTop: 'var(--jp-border-width) solid var(--jp-border-color2)'
});
const buttonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    width: '9em',
    height: '2em',
    color: 'white',
    fontSize: 'var(--jp-ui-font-size1)',
    cursor: 'pointer',
    border: '0',
    borderRadius: '3px',
    $nest: {
        '&:disabled': {
            cursor: 'default'
        }
    }
});
const cancelButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--md-grey-500)',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--md-grey-600)'
        },
        '&:active': {
            backgroundColor: 'var(--md-grey-700)'
        }
    }
});
const submitButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--md-blue-500)',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--md-blue-600)'
        },
        '&:active': {
            backgroundColor: 'var(--md-blue-700)'
        },
        '&:disabled': {
            color: 'var(--jp-ui-inverse-font-color0)',
            backgroundColor: 'var(--jp-layout-color3)'
        },
        '&:disabled:hover': {
            backgroundColor: 'var(--jp-layout-color3)'
        },
        '&:disabled:active': {
            backgroundColor: 'var(--jp-layout-color3)'
        }
    }
});
const commitFormClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 'auto',
    padding: 0,
    alignItems: 'flex-start',
    backgroundColor: 'var(--jp-layout-color1)'
});
const commitSummaryClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '100%',
    height: '1.5em',
    marginBottom: '1em',
    padding: 'var(--jp-code-padding)',
    outline: 'none',
    overflowX: 'auto',
    color: 'var(--jp-ui-font-color1)',
    fontSize: 'var(--jp-ui-font-size1)',
    fontWeight: 300,
    backgroundColor: 'var(--jp-layout-color1)',
    border: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: '3px',
    $nest: {
        '&:active': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        },
        '&:focus': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        }
    }
});
const commitDescriptionClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '100%',
    marginBottom: '1em',
    padding: 'var(--jp-code-padding)',
    outline: 'none',
    overflowX: 'auto',
    resize: 'none',
    color: 'var(--jp-ui-font-color1)',
    fontSize: 'var(--jp-ui-font-size1)',
    fontWeight: 300,
    backgroundColor: 'var(--jp-layout-color1)',
    border: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: '3px',
    $nest: {
        '&:focus': {
            outline: 'none',
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        },
        '&:active': {
            outline: 'none',
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        },
        '&::placeholder': {
            color: 'var(--jp-ui-font-color3)'
        },
        '&::-webkit-input-placeholder': {
            color: 'var(--jp-ui-font-color3)'
        },
        '&::-moz-placeholder': {
            color: 'var(--jp-ui-font-color3)'
        },
        '&::-ms-input-placeholder': {
            color: 'var(--jp-ui-font-color3)'
        }
    }
});
//# sourceMappingURL=ResetRevertDialog.js.map

/***/ }),

/***/ "./lib/style/SinglePastCommitInfo.js":
/*!*******************************************!*\
  !*** ./lib/style/SinglePastCommitInfo.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "commitClass": () => /* binding */ commitClass,
/* harmony export */   "commitOverviewNumbersClass": () => /* binding */ commitOverviewNumbersClass,
/* harmony export */   "commitDetailClass": () => /* binding */ commitDetailClass,
/* harmony export */   "commitDetailHeaderClass": () => /* binding */ commitDetailHeaderClass,
/* harmony export */   "commitDetailFileClass": () => /* binding */ commitDetailFileClass,
/* harmony export */   "iconClass": () => /* binding */ iconClass,
/* harmony export */   "insertionsIconClass": () => /* binding */ insertionsIconClass,
/* harmony export */   "deletionsIconClass": () => /* binding */ deletionsIconClass,
/* harmony export */   "fileListClass": () => /* binding */ fileListClass,
/* harmony export */   "actionButtonClass": () => /* binding */ actionButtonClass
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const commitClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '0 0 auto',
    width: '100%',
    fontSize: '12px',
    marginBottom: '10px',
    marginTop: '5px'
});
const commitOverviewNumbersClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontSize: '13px',
    fontWeight: 'bold',
    paddingTop: '5px',
    $nest: {
        '& span': {
            alignItems: 'center',
            display: 'inline-flex',
            marginLeft: '5px'
        },
        '& span:nth-of-type(1)': {
            marginLeft: '0px'
        }
    }
});
const commitDetailClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '1 1 auto',
    margin: '0'
});
const commitDetailHeaderClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    paddingBottom: '0.5em',
    fontSize: '13px',
    fontWeight: 'bold'
});
const commitDetailFileClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: 'var(--jp-ui-font-color1)',
    height: 'var(--jp-private-running-item-height)',
    lineHeight: 'var(--jp-private-running-item-height)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--jp-layout-color2)'
        },
        '&:active': {
            backgroundColor: 'var(--jp-layout-color3)'
        }
    }
});
const iconClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'inline-block',
    width: '13px',
    height: '13px',
    right: '10px'
});
const insertionsIconClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    $nest: {
        '.jp-icon3': {
            fill: 'var(--md-green-500)'
        }
    }
});
const deletionsIconClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    $nest: {
        '.jp-icon3': {
            fill: 'var(--md-red-500)'
        }
    }
});
const fileListClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    paddingLeft: 0
});
const actionButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    float: 'right'
});
//# sourceMappingURL=SinglePastCommitInfo.js.map

/***/ }),

/***/ "./lib/style/StatusWidget.js":
/*!***********************************!*\
  !*** ./lib/style/StatusWidget.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "statusWidgetClass": () => /* binding */ statusWidgetClass
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const statusWidgetClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'var(--jp-ui-font-color1)',
    fontFamily: 'var(--jp-ui-font-family)',
    fontSize: 'var(--jp-ui-font-size1)',
    lineHeight: '24px'
});
//# sourceMappingURL=StatusWidget.js.map

/***/ }),

/***/ "./lib/style/SuspendModal.js":
/*!***********************************!*\
  !*** ./lib/style/SuspendModal.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fullscreenProgressClass": () => /* binding */ fullscreenProgressClass
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const fullscreenProgressClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    color: 'var(--jp-ui-inverse-font-color0)',
    textAlign: 'center'
});
//# sourceMappingURL=SuspendModal.js.map

/***/ }),

/***/ "./lib/style/Toolbar.js":
/*!******************************!*\
  !*** ./lib/style/Toolbar.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toolbarClass": () => /* binding */ toolbarClass,
/* harmony export */   "toolbarNavClass": () => /* binding */ toolbarNavClass,
/* harmony export */   "toolbarMenuWrapperClass": () => /* binding */ toolbarMenuWrapperClass,
/* harmony export */   "toolbarMenuButtonClass": () => /* binding */ toolbarMenuButtonClass,
/* harmony export */   "toolbarMenuButtonEnabledClass": () => /* binding */ toolbarMenuButtonEnabledClass,
/* harmony export */   "toolbarMenuButtonIconClass": () => /* binding */ toolbarMenuButtonIconClass,
/* harmony export */   "toolbarMenuButtonTitleWrapperClass": () => /* binding */ toolbarMenuButtonTitleWrapperClass,
/* harmony export */   "toolbarMenuButtonTitleClass": () => /* binding */ toolbarMenuButtonTitleClass,
/* harmony export */   "toolbarMenuButtonSubtitleClass": () => /* binding */ toolbarMenuButtonSubtitleClass,
/* harmony export */   "toolbarButtonClass": () => /* binding */ toolbarButtonClass,
/* harmony export */   "spacer": () => /* binding */ spacer,
/* harmony export */   "badgeClass": () => /* binding */ badgeClass
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const toolbarClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--jp-layout-color1)'
});
const toolbarNavClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    minHeight: '35px',
    lineHeight: 'var(--jp-private-running-item-height)',
    backgroundColor: 'var(--jp-layout-color1)',
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)'
});
const toolbarMenuWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    background: 'var(--jp-layout-color1)'
});
const toolbarMenuButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    minHeight: '50px',
    /* top | right | bottom | left */
    padding: '4px 11px 4px 11px',
    fontSize: 'var(--jp-ui-font-size1)',
    lineHeight: '1.5em',
    color: 'var(--jp-ui-font-color1)',
    textAlign: 'left',
    border: 'none',
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: 0,
    background: 'var(--jp-layout-color1)'
});
const toolbarMenuButtonEnabledClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--jp-layout-color2)'
        },
        '&:active': {
            backgroundColor: 'var(--jp-layout-color3)'
        }
    }
});
const toolbarMenuButtonIconClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '16px',
    height: '16px',
    /* top | right | bottom | left */
    margin: 'auto 8px auto 0'
});
const toolbarMenuButtonTitleWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flexBasis: 0,
    flexGrow: 1,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto'
});
const toolbarMenuButtonTitleClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({});
const toolbarMenuButtonSubtitleClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    marginBottom: 'auto',
    fontWeight: 700
});
const toolbarButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    height: '24px',
    width: 'var(--jp-private-running-button-width)',
    margin: 'auto 0 auto 0',
    padding: '0px 6px',
    border: 'none',
    outline: 'none',
    $nest: {
        '&:disabled': {
            opacity: 0.4,
            background: 'none',
            cursor: 'not-allowed'
        },
        '&:hover': {
            backgroundColor: 'var(--jp-layout-color2)'
        },
        '&:active': {
            backgroundColor: 'var(--jp-layout-color3)'
        },
        '& span': {
            // Set icon width and centers it
            margin: 'auto',
            width: '16px'
        }
    }
});
const spacer = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '1 1 auto'
});
const badgeClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    $nest: {
        '& > .MuiBadge-badge': {
            top: 12,
            right: 15,
            backgroundColor: 'var(--jp-warn-color1)'
        }
    }
});
//# sourceMappingURL=Toolbar.js.map

/***/ }),

/***/ "./lib/style/icons.js":
/*!****************************!*\
  !*** ./lib/style/icons.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gitIcon": () => /* binding */ gitIcon,
/* harmony export */   "addIcon": () => /* binding */ addIcon,
/* harmony export */   "branchIcon": () => /* binding */ branchIcon,
/* harmony export */   "cloneIcon": () => /* binding */ cloneIcon,
/* harmony export */   "deletionsMadeIcon": () => /* binding */ deletionsMadeIcon,
/* harmony export */   "desktopIcon": () => /* binding */ desktopIcon,
/* harmony export */   "diffIcon": () => /* binding */ diffIcon,
/* harmony export */   "discardIcon": () => /* binding */ discardIcon,
/* harmony export */   "insertionsMadeIcon": () => /* binding */ insertionsMadeIcon,
/* harmony export */   "openIcon": () => /* binding */ openIcon,
/* harmony export */   "pullIcon": () => /* binding */ pullIcon,
/* harmony export */   "pushIcon": () => /* binding */ pushIcon,
/* harmony export */   "removeIcon": () => /* binding */ removeIcon,
/* harmony export */   "rewindIcon": () => /* binding */ rewindIcon,
/* harmony export */   "tagIcon": () => /* binding */ tagIcon,
/* harmony export */   "trashIcon": () => /* binding */ trashIcon
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_icons_add_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../style/icons/add.svg */ "./style/icons/add.svg");
/* harmony import */ var _style_icons_branch_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../style/icons/branch.svg */ "./style/icons/branch.svg");
/* harmony import */ var _style_icons_clone_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../style/icons/clone.svg */ "./style/icons/clone.svg");
/* harmony import */ var _style_icons_deletions_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../style/icons/deletions.svg */ "./style/icons/deletions.svg");
/* harmony import */ var _style_icons_desktop_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../style/icons/desktop.svg */ "./style/icons/desktop.svg");
/* harmony import */ var _style_icons_diff_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../style/icons/diff.svg */ "./style/icons/diff.svg");
/* harmony import */ var _style_icons_discard_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../style/icons/discard.svg */ "./style/icons/discard.svg");
/* harmony import */ var _style_icons_git_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../style/icons/git.svg */ "./style/icons/git.svg");
/* harmony import */ var _style_icons_insertions_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../style/icons/insertions.svg */ "./style/icons/insertions.svg");
/* harmony import */ var _style_icons_open_file_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../style/icons/open-file.svg */ "./style/icons/open-file.svg");
/* harmony import */ var _style_icons_pull_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../style/icons/pull.svg */ "./style/icons/pull.svg");
/* harmony import */ var _style_icons_push_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../style/icons/push.svg */ "./style/icons/push.svg");
/* harmony import */ var _style_icons_remove_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../style/icons/remove.svg */ "./style/icons/remove.svg");
/* harmony import */ var _style_icons_rewind_svg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../style/icons/rewind.svg */ "./style/icons/rewind.svg");
/* harmony import */ var _style_icons_tag_svg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../style/icons/tag.svg */ "./style/icons/tag.svg");
/* harmony import */ var _style_icons_trash_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../style/icons/trash.svg */ "./style/icons/trash.svg");

// icon svg import statements
















const gitIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({ name: 'git', svgstr: _style_icons_git_svg__WEBPACK_IMPORTED_MODULE_1__.default });
const addIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:add',
    svgstr: _style_icons_add_svg__WEBPACK_IMPORTED_MODULE_2__.default
});
const branchIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:branch',
    svgstr: _style_icons_branch_svg__WEBPACK_IMPORTED_MODULE_3__.default
});
const cloneIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:clone',
    svgstr: _style_icons_clone_svg__WEBPACK_IMPORTED_MODULE_4__.default
});
const deletionsMadeIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:deletions',
    svgstr: _style_icons_deletions_svg__WEBPACK_IMPORTED_MODULE_5__.default
});
const desktopIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:desktop',
    svgstr: _style_icons_desktop_svg__WEBPACK_IMPORTED_MODULE_6__.default
});
const diffIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:diff',
    svgstr: _style_icons_diff_svg__WEBPACK_IMPORTED_MODULE_7__.default
});
const discardIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:discard',
    svgstr: _style_icons_discard_svg__WEBPACK_IMPORTED_MODULE_8__.default
});
const insertionsMadeIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:insertions',
    svgstr: _style_icons_insertions_svg__WEBPACK_IMPORTED_MODULE_9__.default
});
const openIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:open-file',
    svgstr: _style_icons_open_file_svg__WEBPACK_IMPORTED_MODULE_10__.default
});
const pullIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:pull',
    svgstr: _style_icons_pull_svg__WEBPACK_IMPORTED_MODULE_11__.default
});
const pushIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:push',
    svgstr: _style_icons_push_svg__WEBPACK_IMPORTED_MODULE_12__.default
});
const removeIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:remove',
    svgstr: _style_icons_remove_svg__WEBPACK_IMPORTED_MODULE_13__.default
});
const rewindIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:rewind',
    svgstr: _style_icons_rewind_svg__WEBPACK_IMPORTED_MODULE_14__.default
});
const tagIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:tag',
    svgstr: _style_icons_tag_svg__WEBPACK_IMPORTED_MODULE_15__.default
});
const trashIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:trash',
    svgstr: _style_icons_trash_svg__WEBPACK_IMPORTED_MODULE_16__.default
});
//# sourceMappingURL=icons.js.map

/***/ }),

/***/ "./lib/taskhandler.js":
/*!****************************!*\
  !*** ./lib/taskhandler.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TaskHandler": () => /* binding */ TaskHandler
/* harmony export */ });
/* harmony import */ var _lumino_collections__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/collections */ "webpack/sharing/consume/default/@lumino/collections/@lumino/collections");
/* harmony import */ var _lumino_collections__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_collections__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_2__);



/**
 * A generic task handler
 */
class TaskHandler {
    constructor(model) {
        this._taskList = new _lumino_collections__WEBPACK_IMPORTED_MODULE_0__.LinkedList();
        this._taskChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal(model);
    }
    /**
     * Signal emitted when a task starts
     *
     * 'empty' is emitted each time the task list have processed all tasks
     */
    get taskChanged() {
        return this._taskChanged;
    }
    /**
     * Adds a task to the list of pending model tasks.
     *
     * #Note:
     *  This will add a task name in the queue but the task
     *  execution remains in the hand of the caller.
     *  In particular it is the responsibility of the caller
     *  to call `remove(taskID)` when the task is executed.
     *
     * @param task - task name
     * @returns task identifier
     */
    add(task) {
        // Generate a unique task identifier:
        const id = this._generateTaskID();
        // Add the task to our list of pending tasks:
        this._taskList.addLast({
            id: id,
            task: task
        });
        // If this task is the only task, broadcast the task...
        if (this._taskList.length === 1) {
            this._taskChanged.emit(task);
        }
        // Return the task identifier to allow consumers to remove the task once completed:
        return id;
    }
    /**
     * Add a asynchronous task to the stack and execute it
     *
     * @param name Name of the task
     * @param callable Asynchronous task to be executed
     *
     * @returns The result of the task
     */
    async execute(name, callable) {
        const taskID = this.add(name);
        try {
            return await callable();
        }
        finally {
            this.remove(taskID);
        }
    }
    /**
     * Removes a task from the list of pending model tasks.
     *
     * @param id - task identifier
     */
    remove(taskID) {
        let node = this._taskList.firstNode;
        // Check the first node...
        if ((node === null || node === void 0 ? void 0 : node.value.id) === taskID) {
            this._taskList.removeNode(node);
        }
        else {
            // Walk the task list looking for a task with the provided identifier...
            while (node.next) {
                node = node.next;
                if (node.value && node.value.id === taskID) {
                    this._taskList.removeNode(node);
                    break;
                }
            }
        }
        // Check for pending tasks and broadcast the oldest pending task...
        if (this._taskList.length === 0) {
            this._taskChanged.emit('empty');
        }
        else {
            this._taskChanged.emit(this._taskList.first.task);
        }
    }
    /**
     * Generates a unique task identifier.
     *
     * @returns task identifier
     */
    _generateTaskID() {
        return _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.UUID.uuid4();
    }
}
//# sourceMappingURL=taskhandler.js.map

/***/ }),

/***/ "./lib/tokens.js":
/*!***********************!*\
  !*** ./lib/tokens.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EXTENSION_ID": () => /* binding */ EXTENSION_ID,
/* harmony export */   "IGitExtension": () => /* binding */ IGitExtension,
/* harmony export */   "Git": () => /* binding */ Git,
/* harmony export */   "Level": () => /* binding */ Level
/* harmony export */ });
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__);


const EXTENSION_ID = 'jupyter.extensions.git_plugin';
const IGitExtension = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.Token(EXTENSION_ID);
var Git;
(function (Git) {
    /**
     * A wrapped error for a fetch response.
     */
    class GitResponseError extends _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__.ServerConnection.ResponseError {
        /**
         * Create a new response error.
         */
        constructor(response, message = `Invalid response: ${response.status} ${response.statusText}`, traceback = '', json = {}) {
            super(response, message);
            this.traceback = traceback; // traceback added in mother class in 2.2.x
            this._json = json;
        }
        /**
         * The error response JSON body
         */
        get json() {
            return this._json;
        }
    }
    Git.GitResponseError = GitResponseError;
    class NotInRepository extends Error {
        constructor() {
            super('Not in a Git Repository');
        }
    }
    Git.NotInRepository = NotInRepository;
})(Git || (Git = {}));
/**
 * Log message severity.
 */
var Level;
(function (Level) {
    Level[Level["SUCCESS"] = 10] = "SUCCESS";
    Level[Level["INFO"] = 20] = "INFO";
    Level[Level["RUNNING"] = 30] = "RUNNING";
    Level[Level["WARNING"] = 40] = "WARNING";
    Level[Level["ERROR"] = 50] = "ERROR";
})(Level || (Level = {}));
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "./lib/utils.js":
/*!**********************!*\
  !*** ./lib/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "extractFilename": () => /* binding */ extractFilename,
/* harmony export */   "decodeStage": () => /* binding */ decodeStage,
/* harmony export */   "sleep": () => /* binding */ sleep
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);

/** Get the filename from a path */
function extractFilename(path) {
    if (path[path.length - 1] === '/') {
        return path;
    }
    else {
        return _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.basename(path);
    }
}
function decodeStage(x, y) {
    // If file is untracked
    if (x === '?' && y === '?') {
        return 'untracked';
    }
    else {
        // If file is staged
        if (x !== ' ') {
            return y !== ' ' ? 'partially-staged' : 'staged';
        }
        // If file is unstaged but tracked
        if (y !== ' ') {
            return 'unstaged';
        }
    }
    return null;
}
/**
 * Returns a promise which resolves after a specified duration.
 *
 * @param ms - duration (in milliseconds)
 * @returns a promise
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./lib/version.js":
/*!************************!*\
  !*** ./lib/version.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "version": () => /* binding */ version
/* harmony export */ });
// generated by genversion
const version = '0.30.0-beta.1';
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "./lib/widgets/AuthorBox.js":
/*!**********************************!*\
  !*** ./lib/widgets/AuthorBox.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GitAuthorForm": () => /* binding */ GitAuthorForm
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);

/**
 * The UI for the commit author form
 */
class GitAuthorForm extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    constructor() {
        super();
        this.node.appendChild(this.createBody());
    }
    createBody() {
        const node = document.createElement('div');
        const text = document.createElement('span');
        this._name = document.createElement('input');
        this._email = document.createElement('input');
        node.className = 'jp-RedirectForm';
        text.textContent = 'Enter your name and email for commit';
        this._name.placeholder = 'Name';
        this._email.placeholder = 'Email';
        node.appendChild(text);
        node.appendChild(this._name);
        node.appendChild(this._email);
        return node;
    }
    /**
     * Returns the input value.
     */
    getValue() {
        const credentials = {
            name: this._name.value,
            email: this._email.value
        };
        return credentials;
    }
}
//# sourceMappingURL=AuthorBox.js.map

/***/ }),

/***/ "./lib/widgets/CredentialsBox.js":
/*!***************************************!*\
  !*** ./lib/widgets/CredentialsBox.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GitCredentialsForm": () => /* binding */ GitCredentialsForm
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);

/**
 * The UI for the credentials form
 */
class GitCredentialsForm extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    constructor(textContent = 'Enter credentials for remote repository', warningContent = '') {
        super();
        this.node.appendChild(this.createBody(textContent, warningContent));
    }
    createBody(textContent, warningContent) {
        const node = document.createElement('div');
        const label = document.createElement('label');
        this._user = document.createElement('input');
        this._password = document.createElement('input');
        this._password.type = 'password';
        const text = document.createElement('span');
        const warning = document.createElement('div');
        node.className = 'jp-RedirectForm';
        warning.className = 'jp-RedirectForm-warning';
        text.textContent = textContent;
        warning.textContent = warningContent;
        this._user.placeholder = 'username';
        this._password.placeholder = 'password / personal access token';
        label.appendChild(text);
        label.appendChild(this._user);
        label.appendChild(this._password);
        node.appendChild(label);
        node.appendChild(warning);
        return node;
    }
    /**
     * Returns the input value.
     */
    getValue() {
        return {
            username: this._user.value,
            password: this._password.value
        };
    }
}
//# sourceMappingURL=CredentialsBox.js.map

/***/ }),

/***/ "./lib/widgets/GitCloneForm.js":
/*!*************************************!*\
  !*** ./lib/widgets/GitCloneForm.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GitCloneForm": () => /* binding */ GitCloneForm
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);

/**
 * The UI for the form fields shown within the Clone modal.
 */
class GitCloneForm extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    /**
     * Create a redirect form.
     */
    constructor() {
        super({ node: GitCloneForm.createFormNode() });
    }
    /**
     * Returns the input value.
     */
    getValue() {
        return encodeURIComponent(this.node.querySelector('input').value);
    }
    static createFormNode() {
        const node = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const text = document.createElement('span');
        node.className = 'jp-RedirectForm';
        text.textContent = 'Enter the Clone URI of the repository';
        input.placeholder = 'https://host.com/org/repo.git';
        label.appendChild(text);
        label.appendChild(input);
        node.appendChild(label);
        return node;
    }
}
//# sourceMappingURL=GitCloneForm.js.map

/***/ }),

/***/ "./lib/widgets/GitWidget.js":
/*!**********************************!*\
  !*** ./lib/widgets/GitWidget.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GitWidget": () => /* binding */ GitWidget
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Feedback__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Feedback */ "./lib/components/Feedback.js");
/* harmony import */ var _components_GitPanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/GitPanel */ "./lib/components/GitPanel.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../logger */ "./lib/logger.js");
/* harmony import */ var _style_GitWidgetStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/GitWidgetStyle */ "./lib/style/GitWidgetStyle.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tokens */ "./lib/tokens.js");







/**
 * A class that exposes the git plugin Widget.
 */
class GitWidget extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget {
    constructor(model, settings, commands, filebrowser, options) {
        super(options);
        this.node.id = 'GitSession-root';
        this.addClass(_style_GitWidgetStyle__WEBPACK_IMPORTED_MODULE_2__.gitWidgetStyle);
        this._commands = commands;
        this._filebrowser = filebrowser;
        this._model = model;
        this._settings = settings;
        // Add refresh standby condition if this widget is hidden
        model.refreshStandbyCondition = () => !this._settings.composite['refreshIfHidden'] && this.isHidden;
    }
    /**
     * A message handler invoked on a `'before-show'` message.
     *
     * #### Notes
     * The default implementation of this handler is a no-op.
     */
    onBeforeShow(msg) {
        // Trigger refresh when the widget is displayed
        this._model.refresh().catch(error => {
            console.error('Fail to refresh model when displaying GitWidget.', error);
        });
        super.onBeforeShow(msg);
    }
    /**
     * Render the content of this widget using the virtual DOM.
     *
     * This method will be called anytime the widget needs to be rendered, which
     * includes layout triggered rendering.
     */
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_logger__WEBPACK_IMPORTED_MODULE_3__.LoggerContext.Consumer, null, logger => (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1__.createElement(_components_GitPanel__WEBPACK_IMPORTED_MODULE_4__.GitPanel, { commands: this._commands, filebrowser: this._filebrowser, logger: logger, model: this._model, settings: this._settings }),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.UseSignal, { signal: logger.signal, initialArgs: { message: '', level: _tokens__WEBPACK_IMPORTED_MODULE_5__.Level.INFO } }, (sender, log) => (log === null || log === void 0 ? void 0 : log.message) ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_components_Feedback__WEBPACK_IMPORTED_MODULE_6__.Feedback, { log: log, settings: this._settings })) : null)))));
    }
}
//# sourceMappingURL=GitWidget.js.map

/***/ }),

/***/ "./lib/widgets/StatusWidget.js":
/*!*************************************!*\
  !*** ./lib/widgets/StatusWidget.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatusWidget": () => /* binding */ StatusWidget,
/* harmony export */   "addStatusBarWidget": () => /* binding */ addStatusBarWidget
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_StatusWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/StatusWidget */ "./lib/style/StatusWidget.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./lib/utils.js");



/**
 * Class for creating a status bar widget.
 */
class StatusWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    /**
     * Returns a status bar widget.
     *
     * @returns widget
     */
    constructor() {
        super();
        /**
         * Boolean indicating whether the status widget is accepting updates.
         */
        this._locked = false;
        /**
         * Status string.
         */
        this._status = '';
        this.addClass(_style_StatusWidget__WEBPACK_IMPORTED_MODULE_1__.statusWidgetClass);
    }
    /**
     * Sets the current status.
     */
    set status(text) {
        this._status = text;
        if (!this._locked) {
            this._lock();
            this.refresh();
        }
    }
    /**
     * Refreshes the status widget.
     */
    refresh() {
        this.node.textContent = 'Git: ' + this._status;
    }
    /**
     * Locks the status widget to prevent updates.
     *
     * ## Notes
     *
     * -   This is used to throttle updates in order to prevent "flashing" messages.
     */
    async _lock() {
        this._locked = true;
        await (0,_utils__WEBPACK_IMPORTED_MODULE_2__.sleep)(500);
        this._locked = false;
        this.refresh();
    }
}
function addStatusBarWidget(statusBar, model, settings) {
    // Add a status bar widget to provide Git status updates:
    const statusWidget = new StatusWidget();
    statusBar.registerStatusItem('git-status', {
        align: 'left',
        item: statusWidget,
        isActive: Private.isStatusWidgetActive(settings),
        activeStateChanged: settings && settings.changed
    });
    model.taskChanged.connect(Private.createEventCallback(statusWidget));
}
/* eslint-disable no-inner-declarations */
var Private;
(function (Private) {
    /**
     * Returns a callback for updating a status widget upon receiving model events.
     *
     * @private
     * @param widget - status widget
     * @returns callback
     */
    function createEventCallback(widget) {
        return onEvent;
        /**
         * Callback invoked upon a model event.
         *
         * @private
         * @param model - extension model
         * @param event - event name
         */
        function onEvent(model, event) {
            let status;
            switch (event) {
                case 'empty':
                    status = 'idle';
                    break;
                case 'git:checkout':
                    status = 'checking out...';
                    break;
                case 'git:clone':
                    status = 'cloning repository...';
                    break;
                case 'git:commit:create':
                    status = 'committing changes...';
                    break;
                case 'git:commit:revert':
                    status = 'reverting changes...';
                    break;
                case 'git:init':
                    status = 'initializing repository...';
                    break;
                case 'git:pull':
                    status = 'pulling changes...';
                    break;
                case 'git:pushing':
                    status = 'pushing changes...';
                    break;
                case 'git:refresh':
                    status = 'refreshing...';
                    break;
                case 'git:reset:changes':
                    status = 'resetting changes...';
                    break;
                case 'git:reset:hard':
                    status = 'discarding changes...';
                    break;
                default:
                    if (/git:add:files/.test(event)) {
                        status = 'adding files...';
                    }
                    else {
                        status = 'working...';
                    }
                    break;
            }
            widget.status = status;
        }
    }
    Private.createEventCallback = createEventCallback;
    /**
     * Returns a callback which returns a boolean indicating whether the extension should display status updates.
     *
     * @private
     * @param settings - extension settings
     * @returns callback
     */
    function isStatusWidgetActive(settings) {
        return settings ? isActive : inactive;
        /**
         * Returns a boolean indicating that the extension should not display status updates.
         *
         * @private
         * @returns boolean indicating that the extension should not display status updates
         */
        function inactive() {
            return false;
        }
        /**
         * Returns a boolean indicating whether the extension should display status updates.
         *
         * @private
         * @returns boolean indicating whether the extension should display status updates
         */
        function isActive() {
            return settings.composite.displayStatus;
        }
    }
    Private.isStatusWidgetActive = isStatusWidgetActive;
})(Private || (Private = {}));
/* eslint-enable no-inner-declarations */
//# sourceMappingURL=StatusWidget.js.map

/***/ }),

/***/ "./lib/widgets/gitClone.js":
/*!*********************************!*\
  !*** ./lib/widgets/gitClone.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addCloneButton": () => /* binding */ addCloneButton
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _commandsAndMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../commandsAndMenu */ "./lib/commandsAndMenu.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");




function addCloneButton(model, filebrowser, commands) {
    filebrowser.toolbar.addItem('gitClone', _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.UseSignal, { signal: model.repositoryChanged, initialArgs: {
            name: 'pathRepository',
            oldValue: null,
            newValue: model.pathRepository
        } }, (_, change) => (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButtonComponent, { enabled: change.newValue === null, icon: _style_icons__WEBPACK_IMPORTED_MODULE_2__.cloneIcon, onClick: () => {
            commands.execute(_commandsAndMenu__WEBPACK_IMPORTED_MODULE_3__.CommandIDs.gitClone);
        }, tooltip: 'Git Clone' })))));
}
//# sourceMappingURL=gitClone.js.map

/***/ }),

/***/ "./style/icons/add.svg":
/*!*****************************!*\
  !*** ./style/icons/add.svg ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg\n   xmlns=\"http://www.w3.org/2000/svg\"\n   width=\"16\"\n   viewBox=\"0 0 24 24\"\n   version=\"1.1\">\n  <g\n     class=\"jp-icon3 jp-icon-selectable\"\n     fill=\"#4F4F4F\">\n    <path\n       d=\"m 22,13 h -9 v 9 H 11 V 13 H 2 v -2 h 9 V 2 h 2 v 9 h 9 z\"/>\n  </g>\n</svg>\n");

/***/ }),

/***/ "./style/icons/branch.svg":
/*!********************************!*\
  !*** ./style/icons/branch.svg ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" viewBox=\"0 0 18 18\">\n<path class=\"jp-icon3 jp-icon-selectable\" d=\"M12.499,3.177 C11.205,3.177 10.166,4.216 10.166,5.51 C10.166,6.366 10.64,7.114 11.333,7.515 L11.333,7.843 C11.333,9.009 10.166,10.176 9,10.176 C8.034,10.176 7.269,10.376 6.667,10.704 L6.667,5.182 C7.36,4.781 7.834,4.034 7.834,3.177 C7.834,1.883 6.795,0.844 5.501,0.844 C4.207,0.844 3.168,1.883 3.168,3.177 C3.168,4.034 3.642,4.781 4.334,5.182 L4.334,12.818 C3.642,13.219 3.168,13.966 3.168,14.823 C3.168,16.117 4.207,17.156 5.501,17.156 C6.795,17.156 7.834,16.117 7.834,14.823 C7.834,14.203 7.597,13.656 7.214,13.237 C7.56,12.818 8.107,12.49 9,12.49 C11.333,12.49 13.666,10.157 13.666,7.824 L13.666,7.496 C14.358,7.095 14.832,6.348 14.832,5.492 C14.832,4.198 13.793,3.159 12.499,3.159 z M5.501,2.011 C6.139,2.011 6.667,2.539 6.667,3.177 C6.667,3.815 6.139,4.344 5.501,4.344 C4.863,4.344 4.334,3.815 4.334,3.177 C4.334,2.539 4.863,2.011 5.501,2.011 z M5.501,16.008 C4.863,16.008 4.334,15.479 4.334,14.841 C4.334,14.203 4.863,13.675 5.501,13.675 C6.139,13.675 6.667,14.203 6.667,14.841 C6.667,15.479 6.139,16.008 5.501,16.008 z M12.499,6.676 C11.861,6.676 11.333,6.148 11.333,5.51 C11.333,4.872 11.861,4.344 12.499,4.344 C13.137,4.344 13.666,4.872 13.666,5.51 C13.666,6.148 13.137,6.676 12.499,6.676 z\" fill=\"#4F4F4F\"/>\n</svg>\n");

/***/ }),

/***/ "./style/icons/clone.svg":
/*!*******************************!*\
  !*** ./style/icons/clone.svg ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg width=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g class=\"jp-icon3\" fill=\"#616161\">\n<path d=\"M18.3438 13.2365L10.7648 5.65849C10.3311 5.22492 9.61471 5.22492 9.18108 5.65849L7.61625 7.22311L9.61471 9.2213C10.086 9.07049 10.6139 9.16474 10.9721 9.54176C11.3492 9.91878 11.4435 10.4466 11.2927 10.9179L13.2157 12.8407C13.687 12.6898 14.2149 12.7841 14.592 13.1611C15.1199 13.6701 15.1199 14.5184 14.592 15.0462C14.0641 15.574 13.2345 15.574 12.7067 15.0462C12.3107 14.6503 12.2165 14.0848 12.4239 13.5947L10.6328 11.8039V16.5166C10.7648 16.5731 10.8779 16.6674 10.991 16.7616C11.5189 17.2894 11.5189 18.1189 10.991 18.6467C10.4631 19.1557 9.63356 19.1557 9.10567 18.6467C8.57777 18.1189 8.57777 17.2894 9.10567 16.7616C9.23764 16.6297 9.38847 16.5354 9.53929 16.4789V11.7096C9.38847 11.6531 9.23764 11.5399 9.10567 11.4268C8.70975 11.031 8.61548 10.4654 8.82287 9.97533L6.84326 8.01484L1.65859 13.1988C1.22497 13.6324 1.22497 14.3487 1.65859 14.7823L9.21879 22.3415C9.65241 22.775 10.3688 22.775 10.8025 22.3415L18.325 14.82C18.7774 14.3676 18.7774 13.6701 18.3438 13.2365Z\"/>\n<rect x=\"14.6666\" y=\"5.33331\" width=\"6.66667\" height=\"1.33333\"/>\n<rect x=\"18.6666\" y=\"2.66669\" width=\"6.66667\" height=\"1.33333\" transform=\"rotate(90 18.6666 2.66669)\"/>\n</g>\n</svg>\n");

/***/ }),

/***/ "./style/icons/deletions.svg":
/*!***********************************!*\
  !*** ./style/icons/deletions.svg ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" viewBox=\"0 0 24 24\">\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n    <path class=\"jp-icon3\" fill=\"white\" d=\"M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"/>\n</svg>\n");

/***/ }),

/***/ "./style/icons/desktop.svg":
/*!*********************************!*\
  !*** ./style/icons/desktop.svg ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" viewBox=\"0 0 24 24\">\n  <path class=\"jp-icon3\" d=\"M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z\" fill=\"#4F4F4F\">\n  </path>\n</svg>");

/***/ }),

/***/ "./style/icons/diff.svg":
/*!******************************!*\
  !*** ./style/icons/diff.svg ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg width=\"16\" viewBox=\"0 0 15 15\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <g class=\"jp-icon3 jp-icon-selectable\" fill=\"#4F4F4F\">\n    <path d=\"M9.5 1H3.5C2.675 1 2.0075 1.63 2.0075 2.4L2 13.6C2 14.37 2.6675 15 3.4925 15H12.5C13.325 15 14 14.37 14 13.6V5.2L9.5 1ZM3.5 13.6V2.4H8.75L12.5 5.9V13.6H3.5Z\"/>\n    <rect x=\"7\" y=\"10.5\" width=\"4\" height=\"0.999998\"/>\n    <rect x=\"5\" y=\"5.49988\" width=\"4\" height=\"0.999998\"/>\n    <rect x=\"7.5\" y=\"4\" width=\"4\" height=\"1\" transform=\"rotate(90 7.5 4)\"/>\n  </g>\n</svg>\n");

/***/ }),

/***/ "./style/icons/discard.svg":
/*!*********************************!*\
  !*** ./style/icons/discard.svg ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg\n   xmlns=\"http://www.w3.org/2000/svg\"\n   width=\"16\"\n   viewBox=\"0 0 24 24\"\n   version=\"1.1\">\n  <g class=\"jp-icon3 jp-icon-selectable\" stroke=\"#4F4F4F\" stroke-width=\"2px\">\n    <path\n       fill=\"none\"\n       d=\"m 8.9223529,22.334118 c 0,0 8.2027491,-6.710405 10.3905881,-10.164706 C 21.50078,8.7151116 20.317794,5.8252391 17.957647,3.5011764 15.597501,1.1771138 12.452863,1.6307769 9.8541176,2.1458824 7.2553727,2.6609879 3.1905882,5.8164706 3.1905882,5.8164706\" \n      />\n    <path\n       fill=\"none\"\n       d=\"M 5.3082353,0.90352943 3.1905882,5.8164706 8.0752941,6.6070589\"\n      />\n  </g>\n</svg>\n");

/***/ }),

/***/ "./style/icons/git.svg":
/*!*****************************!*\
  !*** ./style/icons/git.svg ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg\n  xmlns=\"http://www.w3.org/2000/svg\"\n  viewBox=\"0 0 20 20\"\n  width=\"16\"\n>\n  <path\n    class=\"jp-icon3 jp-icon-selectable\"\n    d=\"M19.6 9.1 10.9 0.4c-0.5-0.5-1.3-0.5-1.8 0l-1.8 1.8 2.3 2.3c0.5-0.2 1.1-0.1 1.6 0.4 0.4 0.4 0.5 1 0.4 1.6l2.2 2.2c0.5-0.2 1.2-0.1 1.6 0.4 0.6 0.6 0.6 1.6 0 2.2-0.6 0.6-1.6 0.6-2.2 0C12.7 10.7 12.6 10.1 12.8 9.5l-2.1-2.1v5.4c0.1 0.1 0.3 0.2 0.4 0.3 0.6 0.6 0.6 1.6 0 2.2-0.6 0.6-1.6 0.6-2.2 0-0.6-0.6-0.6-1.6 0-2.2 0.1-0.1 0.3-0.3 0.5-0.3V7.4C9.3 7.3 9.1 7.2 9 7 8.5 6.6 8.4 5.9 8.6 5.3L6.4 3.1 0.4 9.1c-0.5 0.5-0.5 1.3 0 1.8l8.7 8.7c0.5 0.5 1.3 0.5 1.8 0l8.7-8.7c0.5-0.5 0.5-1.3 0-1.8\"\n    fill=\"#616161\"\n    style=\"stroke-width:0.02\"\n  />\n</svg>\n");

/***/ }),

/***/ "./style/icons/insertions.svg":
/*!************************************!*\
  !*** ./style/icons/insertions.svg ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" viewBox=\"0 0 24 24\">\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n    <path class=\"jp-icon3\" fill=\"white\" d=\"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"/>\n</svg>\n");

/***/ }),

/***/ "./style/icons/open-file.svg":
/*!***********************************!*\
  !*** ./style/icons/open-file.svg ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" viewBox=\"0 0 15 15\">\n  <g class=\"jp-icon3 jp-icon-selectable\" fill=\"#4F4F4F\">\n    <path\n       d=\"m 6.5,1 h 6 c 0.825,0 1.4925,0.63 1.4925,1.4 L 14,13.6 C 14,14.37 13.3325,15 12.5075,15 H 3.5 C 2.675,15 2,14.37 2,13.6 V 5.2 Z m 6,12.6 V 2.4 H 7.25 L 3.5,5.9 v 7.7 z\"/>\n    <path\n       d=\"M 7.5195314,11.679686 V 9.3359374 l -2.8320313,-1e-7 V 8.457031 7.5781248 h 2.8320313 v -2.34375 l 4.0527336,3.2226563 z\"\n       style=\"stroke-width:2.66873717\" />\n  </g>\n</svg>\n");

/***/ }),

/***/ "./style/icons/pull.svg":
/*!******************************!*\
  !*** ./style/icons/pull.svg ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg width=\"16\" viewBox=\"0 0 18 18\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path class=\"jp-icon3\" \n    d=\"M14.5125 7.53C14.0025 4.9425 11.73 3 9 3C6.8325 3 4.95 4.23 4.0125 6.03C1.755 6.27 0 8.1825 0 10.5C0 12.9825 2.0175 15 4.5 15H14.25C16.32 15 18 13.32 18 11.25C18 9.27 16.4625 7.665 14.5125 7.53ZM14.25 13.5H4.5C2.8425 13.5 1.5 12.1575 1.5 10.5C1.5 8.9625 2.6475 7.68 4.17 7.5225L4.9725 7.44L5.3475 6.7275C6.06 5.355 7.455 4.5 9 4.5C10.965 4.5 12.66 5.895 13.0425 7.8225L13.2675 8.9475L14.415 9.03C15.585 9.105 16.5 10.0875 16.5 11.25C16.5 12.4875 15.4875 13.5 14.25 13.5ZM10.0875 7.5H7.9125V9.75H6L9 12.75L12 9.75H10.0875V7.5Z\" \n    fill=\"#4F4F4F\"/>\n</svg>\n");

/***/ }),

/***/ "./style/icons/push.svg":
/*!******************************!*\
  !*** ./style/icons/push.svg ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg width=\"16\" viewBox=\"0 0 18 18\" xmlns=\"http://www.w3.org/2000/svg\">\n<path class=\"jp-icon3\" d=\"M14.5125 7.53C14.0025 4.9425 11.73 3 9 3C6.8325 3 4.95 4.23 4.0125 6.03C1.755 6.27 0 8.1825 0 10.5C0 12.9825 2.0175 15 4.5 15H14.25C16.32 15 18 13.32 18 11.25C18 9.27 16.4625 7.665 14.5125 7.53ZM14.25 13.5H4.5C2.8425 13.5 1.5 12.1575 1.5 10.5C1.5 8.9625 2.6475 7.68 4.17 7.5225L4.9725 7.44L5.3475 6.7275C6.06 5.355 7.455 4.5 9 4.5C10.965 4.5 12.66 5.895 13.0425 7.8225L13.2675 8.9475L14.415 9.03C15.585 9.105 16.5 10.0875 16.5 11.25C16.5 12.4875 15.4875 13.5 14.25 13.5ZM6 9.75H7.9125V12H10.0875V9.75H12L9 6.75L6 9.75Z\" fill=\"#4F4F4F\"/>\n</svg>\n");

/***/ }),

/***/ "./style/icons/remove.svg":
/*!********************************!*\
  !*** ./style/icons/remove.svg ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg\n   xmlns=\"http://www.w3.org/2000/svg\"\n   width=\"16\"\n   viewBox=\"0 0 24 24\"\n   version=\"1.1\">\n  <g class=\"jp-icon3 jp-icon-selectable\" stroke=\"#4F4F4F\" stroke-width=\"2px\">\n  <path\n     fill=\"none\"\n     d=\"M 2,12 H 22\" />\n   </g>\n</svg>\n");

/***/ }),

/***/ "./style/icons/rewind.svg":
/*!********************************!*\
  !*** ./style/icons/rewind.svg ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" viewBox=\"0 0 24 24\">\n    <path class=\"jp-icon3\" fill=\"#4F4F4F\" d=\"M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z\"/>\n</svg>\n");

/***/ }),

/***/ "./style/icons/tag.svg":
/*!*****************************!*\
  !*** ./style/icons/tag.svg ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512.001 512.001\" width=\"16\">\n\t<path class=\"jp-icon3\" fill=\"#4F4F4F\" d=\"M506.513,311.066L253.87,58.423c-2.024-2.026-4.486-3.559-7.195-4.483L140.15,17.593\n\t\t\tc-6.758-2.305-14.242-0.568-19.294,4.483L84.709,58.222L31.977,5.491c-7.314-7.315-19.176-7.315-26.49,0\n\t\t\tc-7.315,7.315-7.315,19.175,0,26.49l52.732,52.731l-36.14,36.141c-5.051,5.05-6.79,12.534-4.483,19.294L53.943,246.67\n\t\t\tc0.924,2.71,2.458,5.172,4.483,7.197L311.071,506.51c7.314,7.315,19.175,7.315,26.49,0l168.954-168.954\n\t\t\tC513.83,330.241,513.83,318.382,506.513,311.066z M227.241,227.238c-21.817,21.819-57.132,21.82-78.952,0\n\t\t\tc-21.768-21.768-21.768-57.185,0.001-78.953c21.817-21.819,57.132-21.82,78.953,0C249.009,170.053,249.009,205.47,227.241,227.238\n\t\t\tz\"/>\n</svg>\n");

/***/ }),

/***/ "./style/icons/trash.svg":
/*!*******************************!*\
  !*** ./style/icons/trash.svg ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" viewBox=\"0 0 24 24\">\n    <path class=\"jp-icon3\" fill=\"#4F4F4F\" d=\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z\"/>\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n</svg>\n");

/***/ })

}]);
//# sourceMappingURL=lib_index_js-webpack_sharing_consume_default_jupyterlab_codeeditor-webpack_sharing_consume_de-d384f5.d6bd79d8448ced3e4759.js.map