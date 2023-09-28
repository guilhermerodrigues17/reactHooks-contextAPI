import { createContext, useContext, useReducer, useRef } from 'react';
import p from 'prop-types';
import { reducer } from './reducer';
import { actionsFactory } from './actionsFactory';

export const initialState = {
  counter: 0,
  loading: false,
};

const Context = createContext();

export const CounterContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useRef(actionsFactory(dispatch));

  return <Context.Provider value={[state, actions.current]}>{children}</Context.Provider>;
};

CounterContext.propTypes = {
  children: p.node.isRequired,
};

export const useCounterContext = () => {
  const contextProvider = useContext(Context);

  if (typeof contextProvider === 'undefined') {
    throw new Error('You have to use "useCounterContext" inside the <CounterContext.Provider/>');
  }
  return [...contextProvider];
};
