import {useState} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';

function TestCount() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    setCount(count - 1);
  }

  return (
    <div>
      <h2>Test Count Component</h2>
      <p>Current Count: {count}</p>
      <ButtonGroup>
        <Button onClick={handleDecrease}>-</Button>
        <Button onClick={handleIncrease}>+</Button>
      </ButtonGroup>
    </div>
  );
}

export default TestCount;