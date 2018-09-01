import actionCreatorFactory from 'redux-typescript-actions';
import { IRenameNotepadObjectAction } from './types/NotepadTypes';
import {
	AddToSyncAction,
	DeleteElementAction,
	ExpandFromNoteAction,
	InsertElementAction,
	MoveNotepadObjectAction,
	NewNotepadObjectAction,
	NotepadToSyncNotepadAction,
	RestoreJsonNotepadAndLoadNoteAction,
	SyncAction,
	UpdateBibliographyAction,
	UpdateElementAction
} from './types/ActionTypes';
import { IInsertElementState } from './reducers/NoteReducer';
import { SyncedNotepadList, SyncLoginRequest, SyncUser } from './types/SyncTypes';
import { FlatNotepad, Notepad } from 'upad-parse/dist';
import { NoteElement } from 'upad-parse/dist/Note';
import { HashTagSearchResults } from './reducers/SearchReducer';
import { ThemeName } from './types/Themes';

const actionCreator = actionCreatorFactory();

export const actions = {
	parseNpx: actionCreator.async<string, FlatNotepad, any>('PARSE_NPX'),
	saveNotepad: actionCreator.async<Notepad, void, any>('SAVE_NOTEPAD'),
	getNotepadList: actionCreator.async<void, string[], any>('GET_NOTEPAD_LIST'),
	downloadNotepad: actionCreator.async<string, string, any>('DOWNLOAD_NOTEPAD'),
	openNotepadFromStorage: actionCreator.async<string, void, any>('OPEN_NOTEPAD_FROM_STORAGE'),
	renameNotepad: actionCreator.async<string, string, any>('RENAME_NOTEPAD'),
	checkNoteAssets: actionCreator.async<[string, NoteElement[]], FlatNotepad, any>('CHECK_NOTE_ASSETS'),
	loadNote: actionCreator.async<string, object, any>('LOAD_NOTE'),
	downloadAsset: actionCreator.async<{ filename: string, uuid: string }, void, any>('DOWNLOAD_ASSET'),
	expandAllExplorer: actionCreator.async<void, string[], any>('EXPAND_ALL_EXPLORER'),
	print: actionCreator.async<void, NoteElement, void>('PRINT'),
	syncLogin: actionCreator.async<SyncLoginRequest, SyncUser, any>('SYNC_LOGIN'),
	getSyncedNotepadList: actionCreator.async<SyncUser, SyncedNotepadList, any>('SYNC_GET_NOTEPAD_LIST'),
	syncDownload: actionCreator.async<string, Notepad, any>('SYNC_DOWNLOAD'),
	syncUpload: actionCreator.async<SyncAction, void, any>('SYNC_UPLOAD'),
	deleteFromSync: actionCreator.async<string, void, any>('SYNC_DELETE'),
	addToSync: actionCreator.async<AddToSyncAction, string, any>('SYNC_CREATE'),
	quickNote: actionCreator.async<void, string, void>('QUICK_NOTE'),

	restoreJsonNotepad: actionCreator<string>('PARSE_JSON_NOTEPAD'),
	restoreJsonNotepadAndLoadNote: actionCreator<RestoreJsonNotepadAndLoadNoteAction>('PARSE_JSON_NOTEPAD_AND_LOAD_NOTE'),
	newNotepad: actionCreator<FlatNotepad>('NEW_NOTEPAD'),
	flipFullScreenState: actionCreator<void>('FLIP_FULL_SCREEN'),
	deleteNotepad: actionCreator<string>('DELETE_NOTEPAD'),
	exportNotepad: actionCreator<void>('EXPORT_NOTEPAD'),
	exportAll: actionCreator<void>('EXPORT_ALL_NOTEPADS'),
	exportToMarkdown: actionCreator<void>('EXPORT_ALL_NOTEPADS_TO_MD'),
	expandSection: actionCreator<string>('OPEN_SECTION'),
	collapseSelection: actionCreator<string>('CLOSE_SECTION'),
	search: actionCreator<string>('SEARCH'),
	displayHashTagSearchResults: actionCreator<HashTagSearchResults>('DISPLAY_HASH_TAG_SEARCH_RESULTS'),
	deleteNotepadObject: actionCreator<string>('DELETE_NOTEPAD_OBJECT'),
	renameNotepadObject: actionCreator<IRenameNotepadObjectAction>('RENAME_NOTEPAD_OBJECT'),
	expandFromNote: actionCreator<ExpandFromNoteAction>('EXPAND_FROM_NOTE'),
	collapseAllExplorer: actionCreator<void>('COLLAPSE_ALL_EXPLORER'),
	openEditor: actionCreator<string>('OPEN_EDITOR'),
	updateElement: actionCreator<UpdateElementAction>('UPDATE_ELEMENT'),
	updateDefaultFontSize: actionCreator<string>('UPDATE_DEFAULT_FONT_SIZE'),
	newSection: actionCreator<NewNotepadObjectAction>('NEW_SECTION'),
	newNote: actionCreator<NewNotepadObjectAction>('NEW_NOTE'),
	getHelp: actionCreator<void>('GET_HELP'),
	trackAsset: actionCreator<string>('TRACK_ASSET'),
	untrackAsset: actionCreator<string>('UNTRACK_ASSET'),
	reloadNote: actionCreator<void>('RELOAD_NOTE'),
	insertElement: actionCreator<InsertElementAction>('INSERT_ELEMENT'),
	toggleInsertMenu: actionCreator<Partial<IInsertElementState>>('TOGGLE_INSERT_MENU'),
	deleteElement: actionCreator<DeleteElementAction>('DELETE_ELEMENT'),
	queueParseNpx: actionCreator<string>('QUEUE_PARSE_NPX'),
	parseEnex: actionCreator<string>('PARSE_ENEX'),
	updateBibliography: actionCreator<UpdateBibliographyAction>('UPDATE_BIBLIOGRAPHY'),
	loadNotepadByIndex: actionCreator<number>('LOAD_NOTEPAD_BY_INDEX'),
	updateZoomLevel: actionCreator<number>('UPDATE_ZOOM_LEVEL'),
	clearPrintView: actionCreator<void>('CLEAR_PRINT'),
	syncLogout: actionCreator<void>('SYNC_LOGOUT'),
	updateCurrentSyncId: actionCreator<SyncedNotepadList>('UPDATE_SYNC_ID'),
	sync: actionCreator<SyncAction>('SYNC'),
	actWithSyncNotepad: actionCreator<NotepadToSyncNotepadAction>('ACT_WITH_SYNC_NOTEPAD'),
	requestSyncDownload: actionCreator<string>('REQUEST_SYNC_DOWNLOAD'),
	syncProError: actionCreator<void>('SYNC_PRO_ERROR'),
	setHelpPref: actionCreator<boolean>('SET_HELP_PREF'),
	checkVersion: actionCreator<void>('CHECK_VERSION_ELECTRON'),
	closeNote: actionCreator<void>('CLOSE_NOTE'),
	selectTheme: actionCreator<ThemeName>('SELECT_THEME'),
	moveNotepadObject: actionCreator<MoveNotepadObjectAction>('MOVE_NOTEPAD_OBJECT'),
	quickMarkdownInsert: actionCreator<void>('QUICK_MARKDOWN_INSERT'),
	quickNotepad: actionCreator<void>('QUICK_NOTEPAD')
};
