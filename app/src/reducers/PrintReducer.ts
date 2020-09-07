import { MicroPadReducer } from '../types/ReducerType';
import { Action } from 'redux';
import { isType } from 'redux-typescript-actions';
import { actions } from '../actions';
import { NoteElement } from 'upad-parse/dist/Note';

export interface IPrintStoreState {
	elementToPrint?: NoteElement;
}

export class PrintReducer implements MicroPadReducer<IPrintStoreState> {
	readonly key: string = 'print';
	readonly initialState: IPrintStoreState = {};

	public reducer(state: IPrintStoreState, action: Action): IPrintStoreState {
		if (isType(action, actions.print.done)) {
			return {
				...state,
				elementToPrint: action.payload.result
			};
		} else if (isType(action, actions.clearPrintView)) {
			return { ...this.initialState };
		}

		return state;
	}

}
