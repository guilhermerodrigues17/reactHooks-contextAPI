import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';
import { useCounterContext } from '../../contexts/CounterContext';
import './styles.css';

export const Home = () => {
  //eslint-disable-next-line
  const [state, actions] = useCounterContext();

  const handleError = () => {
    actions
      .asyncError()
      .then((response) => console.log(response))
      .catch((e) => console.error(e));
  };
  return (
    <div>
      <Heading />
      <Button text="increase" onButtonClick={actions.increase} />
      <Button text="decrease" onButtonClick={actions.decrease} />
      <Button text="reset" onButtonClick={actions.reset} />
      <Button text="setCounter 10" onButtonClick={() => actions.setCounter({ counter: 10 })} />
      <Button text="setCounter 100" onButtonClick={() => actions.setCounter({ counter: 100 })} />
      <Button disabled={state.loading} text="asyncIncrease" onButtonClick={actions.asyncIncrease} />
      <Button disabled={state.loading} text="asyncError" onButtonClick={handleError} />
    </div>
  );
};
