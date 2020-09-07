import { IStoreState } from '../types';
import {
	default as LoginComponent,
	ILoginComponentLocalProps,
	ILoginComponentProps
} from '../components/sync/LoginComponent';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../actions';

export function mapStateToProps({ sync }: IStoreState, { trigger, manageTrigger }: ILoginComponentLocalProps) {
	return {
		syncUser: sync.user,
		trigger: trigger!,
		manageTrigger
	};
}

export function mapDispatchToProps(dispatch: Dispatch<Action>): Partial<ILoginComponentProps> {
	return {
		login: (username, password) => dispatch(actions.syncLogin.started({ username, password }))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
