import { IStoreState } from '../../types';
import { connect } from 'react-redux';
import AppNameComponent, { IAppNameComponentProps } from '../../components/header/AppNameComponent/AppNameComponent';
import { Action, Dispatch } from 'redux';
import { actions } from '../../actions';

export function mapStateToProps({ app }: IStoreState): IAppNameComponentProps {
	return { version: app.version };
}

export function mapDispatchToProps(dispatch: Dispatch<Action>): Partial<IAppNameComponentProps> {
	return {
		closeNotepad: () => dispatch(actions.closeNotepad())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNameComponent);
