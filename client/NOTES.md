<!-- this is a file for compresive notes about all thikngs i learned or revised in frontend -->

1. revised a little bit about the difference between npm and pnpm and why pnpm is better than npm

2. also revised about the create-react-app and vite what is the differenve between them and which one is better that other

3. what does react-helmet-async package do and why do we use that???



 4. revised the complete workflow of the redux-toolkit in which we use:- createSlice, combinereducers, configureStore, Provider, useDispatch, useSelector etc. once try to remeber from which package these are coming from. and try to remember the syntax of  the congfigureStore and createSlice.

 also most important thing is state of a react-store is used by useselectors and if we are using typescript then we have to define the  type of the state so what we do is :-  we  export the type of state by:- export type RootState = ReturnType<typeof store.getState> and then we use this type in the useSelector hook like this:- const state = useSelector((state: RootState) => state.reducerName)

 5. learnt lazy loading.. lazy is basically function which is imported fromm react package and it is used to load the component lazily. it is used like this:- const Component = lazy(() => import('./Component'))
 6. why is it used?? :-  it is used to reduce the initial load time of the application. it is used to load the component only when it is needed. it is used to  reduce the bundle size of the application.

 7. types of events in react ypescript:- formEvent, changeEveent, mouseEvent, keyBoardEvent, focusEvent, touchEvent, dragEvent, pointerEvent, wheelEvent, animationEvent, transitionEvent, and many more.

 8. setTimeout and setInterval in react:- setTimeout is used to run a function after a certain amount of time and setInterval is used to run a function after every certain amount of time. both of these functions are used to run the function asynchronously. and [clearTimeout and clearInterval]{i forgot this a lot} are used to clear the setTimeout and setInterval respectively.

 9. difference between URL.createObjectURl and FileReader.readAsDataURL:- URL.createObjectURL is used to convert the file into a url and FileReader.readAsDataURL is used to convert the file into a base64 string. but the 1st one is more optimised and efficient because it takes less time and also if we do not need to chgange anything inside a file then URL object is better than FileReader object.as FileReader used to read the whole file which can take morre time and also it is used where we need to make changes in the file.

 10. clearInterval and clearTimeout, useCallback, how to use zod in frontend?????

 11. type of stateChange function in typescript:- "React.Dispatch<React.SetStateAction<type of state>>;"

 12. usage of lazy and suspense when we want to load the component lazily and also want to show a loader while the component is loading.using suspense tag is important because when we import a component throght lazy loading then it loads the component only when it is required and does it asynchronously .so it is mandatory for us to show something while the component is getting loaded thats why react package provides us a tag and an attribute of that tag which are:-  <Suspense fallback={<Loader />}> <Component /> </Suspense> here Loader is the component which we want to show while the component is getting loaded.

 13. find and some function, memo() function why is it used??? because there is rule in react that when a parent component gget rerender then all its child component also get rerendered so to avoid that while exporting the child component we export that by putting it in the memo function so that  the child component only changes when the props passed to child component from parent get changes otherwise it gets memoised and do not get re-rendered.

 14. onContextMenu sikhili. basically this is the event listner for right click on the element. if we want to disable right click for the whole page then we have to use this event listner on the body tag of the page.or in react we need to wrap the app component in a dev in which we will use this event listner.nad in that we will prevent the default behaviour of the event.

 15. here for deelting the chat we implemented such event listner on right click on the chat

 16. disabled attribute of button, type of function can be :- "Function" but we need to specify the type of the function like this:- "type function = (arg: type) => void" it  is more prefered to specify the type of the function.

 17. array.form() method is used to convert the array like object into an array. it is used like this:- Array.from(arrayLikeObject). for example:- Array.from(document.querySelectorAll('div')) this will convert the array like object into an array of divs.

 18. alt+shift+o is used to organise the imports in the file.

19. what is a fragment tagb and how many ways it can be written??? <> and <Fragment>

20. empty strinng is a falsy value .reember all other  falsy values

21. ek baar ise dekhna hai:-scrollbar-hide  in index.css :- ye kaise implement hua hai

22. .toLocaleTimeString([], {...}):

This method converts the Date object to a string representing the time portion in a human-readable format, based on the locale settings.
The first argument [] is an array of locales. An empty array means it will use the default locale.
The second argument is an options object that specifies how the time should be formatted.
Options Object:

{ hour: "2-digit", minute: "2-digit" }:
hour: "2-digit": This formats the hour part of the time as a two-digit number (e.g., "01", "12").
minute: "2-digit": This formats the minute part of the time as a two-digit number (e.g., "05", "30").

23. learnt two way for implementing a featre where the modal gets closed when i click outside of it. 1st way:- in the inner div attach the ref and add stop Propagtion in click event and add eventlistner in outr div . and in function cehck that if the event target is the outer div then close the modal. 2nd way:- use the useRef hook and attach the ref to the outer div and add event listner to the document and check if the event target is the outer div then close the modal.

24. length is a property not a funtion!!!!!!!!!!!!!!!

25. revised about the directives and subdirectives we use in index.css while we use tailwind for applying separate styles in the app.those are:- 
1.  [@tailwind] base,components,utilities which are used to import styles of base,component and utilites 
2. @layer :- used to define the custom styles within specific layers: base, components, and utilities. This helps Tailwind CSS to properly merge and order your custom styles with its own styles.

Base: Contains the base styles, such as resets and global styles.
Components: Contains styles for reusable components.
Utilities: Contains utility classes that can be used throughout your project.

3. @apply :- used to apply styles to the specific layer

4. like:- 
```css
 @layer components {
  .btn {
    @apply px-4 py-2 bg-blue-500 text-white rounded;
  }
}
```

26. var():- css function to access css variables
27. hsl() :-  stands for hue,saturation,lightness :- another way to define a color and often considered as better way than rgb color
28. remeber when we extend the tailwind.config.js and create our custom themme or color or any thing then we can only use it as taileind className but we can use that other than than if we have declared a varible for that. so generally if we need to use something both as tailwind class and a variable then we extend that in the tailwind config file and also we create a variable in :root in global css file


29. lets see an example:-
```css
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Paths to your template files
  ],
  theme: {
    extend: {
      colors: {
        customHSL: 'hsl(210, 100%, 50%)', // Custom HSL color
      },
    },
  },
  plugins: [],
};
```

in index.css:-

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --custom-hsl: theme('colors.customHSL');
}

.custom-class {
  background-color: var(--custom-hsl);
}
```

30. what is :root??? 
The :root pseudo-class in CSS is used to target the highest-level parent element in the document, which is the <html> element. It is commonly used to define global CSS variables (custom properties) that can be accessed throughout the entire document.

The :root pseudo-class is used to define CSS variables --primary-color, --secondary-color, and --font-size-base.
These variables are then accessed using the var() function to apply consistent styles to the body and .button elements.

31. i was forgotten the  type of state when we use useSeleector: - which is : RootState and we have to create it in the same file  where the store get created.how to create it:- ReturnType<typeof store.getState>

also i forgot the type of state change function which is: - Dispatch<setStateAction<the datatype handles by the function>>   :- here the Dispatch and setStateAction is imported from the react

32. also while using rtk query when i was logging out and logging in to another acc still that cached data was not getting cleared because everytime we have to manually handle that as rtk query do not provide the  cache clearing mechanism by default. so how can i do that:- [dispatch(api.util.resetApiState())]

33. hooks acn never bbe conditionaly clled it will always be clled on the top part of a component and inside the component

34. of we want to find if a string is present inside another string then we basically use the include() method on the larger string and pass the smaller string inside it


35. Here’s a simplified explanation covering everything:

---

### **1. `useParams`**
- Used to get **dynamic values** from the URL.
- Example:
  If the route is `/user/:id`, and the URL is `/user/42`, then:
  ```javascript
  const { id } = useParams();
  console.log(id); // "42"
  ```
  Use it to fetch specific data based on the dynamic part of the URL.

---

### **2. `useLocation`**
- Used to access the **current URL details**, like the path, query parameters, or state.
- Example:
  ```javascript
  const location = useLocation();
  console.log(location.pathname); // Current path, e.g., "/profile"
  console.log(location.search); // Query string, e.g., "?userId=123"
  console.log(location.state); // State passed from another page, e.g., { userId: 123 }
  ```
  Use it when you need to know details about the current URL.

---

### **3. Maintaining State Between Pages**
State can be passed between pages without showing it in the URL using `useLocation`.

- **How to pass state:**
  ```javascript
  const navigate = useNavigate();
  navigate("/profile", { state: { userId: 123, username: "JohnDoe" } });
  ```

- **How to access state:**
  ```javascript
  const location = useLocation();
  console.log(location.state); // { userId: 123, username: "JohnDoe" }
  ```

Use this method for passing sensitive or temporary data between pages.

---

### **4. What is `new URLSearchParams`?**
`URLSearchParams` is a JavaScript utility to work with **query strings** in a URL.

- **What it does:**
  It helps you:
  - Get values from query strings.
  - Add or update query parameters.
  - Convert an object to a query string.

- **Example:**
  For the URL `/profile?userId=123&username=JohnDoe`:
  ```javascript
  const params = new URLSearchParams(location.search);

  console.log(params.get("userId")); // "123"
  console.log(params.get("username")); // "JohnDoe"
  ```

- **Use Case:**
  Use it to filter, sort, or search data in an app by reading the query parameters.

---

### **When to Use Each**
- **`useParams`**: For reading dynamic parts of the URL.
- **`useLocation`**: For accessing URL details or state passed between pages.
- **`URLSearchParams`**: For working with query strings like `?key=value`.

This covers everything you asked in a simpler way!