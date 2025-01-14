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