# Intermediate

## 1. Hooks 

### 1.1 useState

[currentState, setter]  = useState(default value)

- we need `onClick` event where we set opposite value t

```js
 onClick={() => setIsGreen(!isGreen)}
```

- pass style to grab from that color state 

```js
style={{ color: isGreen ? "limegreen" : "red"}}
```





### 1.2 useEffect

> Create side effect for our component 
>
>  we want to do it outside render - we want to be scheduled outside render cycle 
>
> do staff outisde render function - like with class component `componentDidMount` methods

-> we are using useState to create current date for initial state

-> advance clock through timer every second 

-> [pass dependency as param -- when time changes then react will update it]

```js
setTimeout - passes number id 
```

`clearTimeout` to clear out our component 

for example we connect jquery to react insie useState and then in the end we use return to clean up connection 



React is smart to re render only clock component

### 1.3 useContext

in react data flows in specifc way

- we have top level component and child way down in hierarchy 

if we have something 4 level deep -> we will need to pass (Parent-child ) to each intermediaries

Context like wormhole - we dumb staff at one side and get from the other 

ContextComponent - we are going to use `useState` to pass properties 

-> things that go into context - will be application level state  

-> that relationship is implicit - hard to debug 

```js
const ContextComponent = () => {
  const userState = useState({
    firstName: "James",
    lastName: "Jameson",
    suffix: 1,
    email: "jamesjameson@example.com"
  });

```



then in Level 5  - useContext to destruct : 

```js
const LevelFive = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <div>
      <h5>{`${user.firstName} ${user.lastName} the ${user.suffix} born`}</h5>
      <button
        onClick={() => {
          setUser(Object.assign({}, user, { suffix: user.suffix + 1 }));
        }}
      >
        Increment
      </button>
    </div>
  );
};
```

good canditate is User to pass. But not counter or other small 



### 1.4 useRef

ref is container for state 

with ref across all renders we get the same thing 

- in that example we will get current number with `useRef`  - because useRef uses current version of number
- while state - just change value in closure 

numReft -> is frozen current object 

```js
const RefComponent = () => {
  const [stateNumber, setStateNumber] = useState(0);
  const numRef = useRef(0);

  function incrementAndDelayLogging() {
    setStateNumber(stateNumber + 1);
    numRef.current++;
    setTimeout(
      () => alert(`state: ${stateNumber} | ref: ${numRef.current}`),
      1000
    );
  }
```

### 1.5 useReducer

- we have central object contains all of state 
  - we affect state by passing an action 

```js
const ReducerComponent = () => {
  const [{ r, g, b }, dispatch] = useReducer(reducer, { r: 0, g: 0, b: 0 });

```

r,g,b - are states 

dispatch - allow dispatch action objects to store

useReducer -  takes  in state and action and return new state

```js
<button onClick={() => dispatch({ type: "INCREMENT_R" })}>
```

pass to reducer call to that function  `INCREMENT_R`

```js
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT_R":
      return Object.assign({}, state, { r: limitRGB(state.r + step) });
```



>state is {r:0, g:0, b:0}
>
>action is : {type: "INCREMENT_R"}

​	

we use switch statement

in case of increment_r we are going :  

```js
  return Object.assign({}, state, { r: limitRGB(state.r + step) });
```

- return new state - empty object  -- we signify React that we want to update by creating new object 



### 1.6 useMemo

- performance optimization

here is excessive recursion 

without memo - react will recalculate fibonacci every single render

- calculate it and keep it  / recalculate only if number changes 

- do not run function if event was not triggered

```js
const fibonacci = (n) => {
  if (n <= 1) {
    return 1;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
};
const MemoComponent = () => {
  const [num, setNum] = useState(1);
  const [isGreen, setIsGreen] = useState(true);
  const fib = useMemo(() => fibonacci(num), [num]);
```

### 1.7 useLayoutEffect

effect is schedule later 

- we do not have guarantee when - it is synchronous and we are not sure 

- used for measuring DOM elements 

```js
import { useState, useLayoutEffect, useRef } from "react";

const LayoutEffectComponent = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const el = useRef();

  useLayoutEffect(() => {
    setWidth(el.current.clientWidth);
    setHeight(el.current.clientHeight);
  });
```

