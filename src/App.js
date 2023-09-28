import { CounterContext } from './contexts/CounterContext';
import { Home } from './pages/Home';

export const App = () => {
  return (
    <CounterContext>
      <Home />
    </CounterContext>
  );
};
