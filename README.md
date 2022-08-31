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