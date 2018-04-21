import * as React from 'react';
import './NotepadExplorerComponent.css';
import { INote, INotepad, IRenameNotepadObjectAction, ISection } from '../../types/NotepadTypes';
import { Icon } from 'react-materialize';
import TreeView from 'react-treeview';
import { generateGuid } from '../../util';
import ExplorerOptionsComponent from './ExplorerOptionsComponent';

export interface INotepadExplorerComponentProps {
	notepad?: INotepad;
	openSections: string[];
	isFullScreen: boolean;
	flipFullScreenState?: () => void;
	deleteNotepad?: (title: string) => void;
	exportNotepad?: () => void;
	renameNotepad?: (newTitle: string) => void;
	deleteNotepadObject?: (internalId: string) => void;
	renameNotepadObject?: (params: IRenameNotepadObjectAction) => void;
	loadNote?: (ref: string) => void;
	expandSection?: (guid: string) => void;
	collapseSection?: (guid: string) => void;
	expandAll?: () => void;
	collapseAll?: () => void;
}

export default class NotepadExplorerComponent extends React.Component<INotepadExplorerComponentProps> {
	private openSections: Set<string>;

	render() {
		const {
			notepad,
			isFullScreen,
			flipFullScreenState,
			deleteNotepad,
			exportNotepad,
			renameNotepad,
			expandAll,
			collapseAll
		} = this.props;
		this.openSections = new Set<string>(this.props.openSections);

		const notepadExplorerStyle = {
			display: 'initial'
		};
		if (isFullScreen) notepadExplorerStyle.display = 'none';

		// Generate TreeViews
		const treeViews: JSX.Element[] = [];
		((notepad || {} as INotepad).sections || [])
			.forEach((section: ISection) => treeViews.push(this.generateSectionTreeView(section)));

		return (
			<div id="notepad-explorer" style={notepadExplorerStyle}>
				{
					!!notepad &&
					<div style={{ paddingBottom: '200px' }}>
						<a href="#!" onClick={flipFullScreenState} style={{ paddingRight: '5px', fontSize: '24px' }}>»</a>
						<strong style={{ display: 'inline-flex' }}>
							{notepad.title}
							<ExplorerOptionsComponent
								objToEdit={notepad}
								type="notepad"
								deleteNotepad={deleteNotepad}
								exportNotepad={exportNotepad}
								renameNotepad={renameNotepad}/>
						</strong>
						<p style={{paddingLeft: '10px', marginTop: '0px'}}>
							(<a href="#!" onClick={expandAll}>Expand All</a> | <a href="#!" onClick={collapseAll}>Collapse All</a>)
						</p>

						<div className="explorer-note add-button" key={generateGuid()}>
							<a href="#!" style={{ color: 'white' }}> <Icon>add</Icon> Section</a>
						</div>

						{treeViews}
					</div>
				}
			</div>
		);
	}

	private generateSectionTreeView(section: ISection): JSX.Element {
		const { loadNote, deleteNotepadObject, renameNotepadObject } = this.props;

		const nodeLabelStyle = {
			display: 'inline-flex',
			verticalAlign: 'middle',
			paddingBottom: '5px',
			paddingTop: '5px'
		};

		const childSections: JSX.Element[] = [];
		((section || {} as ISection).sections || [])
			.forEach((child: ISection) => childSections.push(this.generateSectionTreeView(child)));

		const childNotes: JSX.Element[] = [];
		((section || {} as ISection).notes || [])
			.forEach((child: INote) => childNotes.push(
				<div className="explorer-note" key={generateGuid()}>
					<span>
						<a href="#!" style={{ color: 'white' }} onClick={() => loadNote!(child.internalRef)}><Icon>note</Icon> {child.title}</a>
						<ExplorerOptionsComponent
							objToEdit={child}
							type="note"
							deleteNotepadObject={deleteNotepadObject}
							renameNotepadObject={renameNotepadObject}/>
					</span>
				</div>
			));

		return (
			<TreeView
				key={generateGuid()}
				onClick={() => this.sectionArrowClick(section.internalRef)}
				nodeLabel={
					<span style={nodeLabelStyle}>
						<Icon>book</Icon> {section.title}
						<ExplorerOptionsComponent
							objToEdit={section}
							type="section"
							deleteNotepadObject={deleteNotepadObject}
							renameNotepadObject={renameNotepadObject}/>
					</span>}
				collapsed={!this.openSections.has(section.internalRef)}>
				<div className="explorer-note add-button" key={generateGuid()}>
					<a href="#!" style={{ color: 'white', paddingRight: '3px' }}><Icon>add</Icon> Note </a>
					<a href="#!" style={{ color: 'white', paddingLeft: '3px' }}> <Icon>add</Icon> Section</a>
				</div>

				{childSections}
				{childNotes}
			</TreeView>
		);
	}

	private sectionArrowClick = (guid: string) => {
		const { expandSection, collapseSection } = this.props;

		if (this.openSections.has(guid)) {
			collapseSection!(guid);
		} else {
			expandSection!(guid);
		}
	}
}
