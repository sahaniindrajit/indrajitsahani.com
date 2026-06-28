---
title: "Beginner's guide to React Router"
slug: "beginner-s-guide-to-react-router"
date: "2024-07-21"
excerpt: ""
tags: []
cover: "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/UYsBCu9RP3Y/upload/68e48ecc8264002259f00933570169f3.jpeg"
---
## what is React Router

React Router is a powerful library that manages navigation and routing in the React app. React Router offer client side rendering.

In traditional website when the a person click on a link the browser request HTML,CSS and JavaScript file from the server and then download the files and evaluates CSS and JavaScript assets, and renders the HTML sent from the server. when the person click on a different link of the same website the browser starts the process all over again for a new page. This can make a website slow.

React Router offers Client side routing allows to update the URL from a link click without making another request for another document from the server. This enables faster user experience because the browser is not requesting new HTML,CSS and JavaScript file from the server on every link click.

### Before going any further

Make sure you have installed Nodejs and know how to set up a React project.

## How to install React Router

* Open terminal
    
* Change the directory to you React app
    
* Then run the command
    
    ```plaintext
      npm install react-router-dom
    ```
    
    After installing it, we can start routing in our React app
    

## React Routes

Let say you want to make a website that has two routes `/home` and `/todos` on the `/home` page you get some information and on the `/todos` page you get some random todos fetched from [https://sum-server.100xdevs.com/todos](https://sum-server.100xdevs.com/todos).

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1721501127450/89dd8c1d-4268-420d-abe8-b0f7eb5d6094.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1721501103940/58b3ed42-d381-47d9-8988-c6ab95e70de1.png align="center")

## Few Core Concepts in React Router DOM

### BrowserRouter

`BrowserRouter` is a parent component that has all the `Route` component. It stores the current location in the browser's address bar using URLs. All the routes of the website must be declared within the BrowserRouter.

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
function App() {
  return (
    <>
      <BrowserRouter>

      </BrowserRouter>
    </>
  )
}

export default App
```

### Routes

`Routes` acts like a parent and renders the first matching child route, which ensures that the correct component is displayed based on the current URL.

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
```

### Route

`Route` is a child component that has two attributes path and element.

`Path`**\-&gt;** The path attribute specify the route of the website. A route renders a specific component when the path specified matches a URL.

`element`**\-&gt;**It specifies the component that should be rendered.

An application can have as many routes as it needs, and they must all be declared inside the Routes component. Assuming we have a `<Home/>` and `<Todos/>` component. we have to import the `Home` and `Todos` from there specific location

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './component/home'
import Todos from './component/todo'
import './App.css'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/todos' element={<Todos />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}
export default App
```

### Undeclared Routes

we can handle the routes that does not exits by creating another component bearing a Not Found message and setting the path name to `*`

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './component/home'
import Todos from './component/todo'
import PageNotFound from './component/PageNotFound'
import './App.css'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/todos' element={<Todos />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
```

### Switching between pages using button

We can switch between the pages using buttons by the help of `useNavigate` . For using `useNavigate` we have to import it from react-router-dom.

There are many way of using `useNavigate` .Here we are gonna use it by Attaching it to a button via the `onClick` prop with the intended path to be navigated to, passed to the navigate function.

`useNavigate` must always be used inside the `BrowserRouter` component.

```javascript
function AppBar() {
  const navigate = useNavigate();
  return <div>
    <button onClick={() => {
      navigate('/home');
    }}>Home</button>

    <button onClick={() => {
      navigate('/todos')
    }}>Todos</button>
  </div>
}
```

## Final Code

### App.jsx

```javascript
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Home from './component/home'
import Todos from './component/todo'
import PageNotFound from './component/PageNotFound'
import './App.css'
function App() {
  return (
    <>
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route path='/' />
          <Route path='/home' element={<Home />} />
          <Route path='/todos' element={<Todos />} />
          <Route path="*" element={<PageNotFound />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}
function AppBar() {
  const navigate = useNavigate();
  return <div>
    <button onClick={() => {
      navigate('/home');
    }}>Home</button>

    <button onClick={() => {
      navigate('/todos')
    }}>Todos</button>
  </div>
}
export default App
```

### **home.jsx**

```javascript
export default function Home() {
    return <>
        <h>Hey you are in the "http://localhost:5173/home" route You can get the todo data from "http://localhost:5173/todos" route</h>
    </>

}
```

### **todo.jsx**

```javascript
import { useEffect, useState } from "react"
export default function Todos() {
    const [todos, setTodos] = useState([]);
    useEffect(() => {

        fetch("https://sum-server.100xdevs.com/todos")

            .then(async function (res) {
                const json = await res.json();
                setTodos(json.todos)
            })
    }, [])
    return (
        <>
            {todos.map(todo => <Todo title={todo.title} description={todo.description} />
            )}
        </>
    )
}
function Todo({ title, description }) {
    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    )
}
```

## **Conclusion**

In this article, we discussed about the implementation of react routing in react web app client side routing(CSR) allow apps to update the URL with a click of a link without making a server request for a new document.

CSR enhances the user experience by providing faster navigation and a more seamless interaction within the application.

**Code on GitHub =&gt;**[https://github.com/sahaniindrajit/React-router-practice**.**](https://github.com/sahaniindrajit/React-router-practice)