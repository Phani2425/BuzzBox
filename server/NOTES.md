
<!-- //these are the notes for backend  -->

1. in cors function we can pass:- an object containing the origin, methods and credentials where the origin property takes either the "*" or the array of url of frontend, methods take the array of allowed http methods and the credentials take a boolean value which represent client can send the credentials like cookies and tokens with the request

2. explaining the socket connection in detail with its middlewares :- 

socket connection can be estabilished witthout any middkleware but the problem there is anyone opens the website can have a socket connection as we have our own auth system and we are storing users data unlike some socket application in which no user daat is stored so for us usin the middlleware becomes mandate for checking if the user is a valid userwhat we will do before defining the lister for coonection event we will use amiidleware which will be with a simillar syntax like normal express server middleware.

so the syntax will be :-[ when we are manually sending the token from frontend]

io.use((socket,next) => {
  const token = socket.handshake.query.token {inn place of .token you can use the name you gave to the cookie while sending it in response to frontend}
  //also we are taking te token from query because we have sent it in the query object innside the options objcet while connnecting to the socket server in fronend

  if(!token){
    next(new Error('token not found and auth failed))
  }
  
  //lets know what happens when a next() is called  and when any error is passed in side it
  //in the middleware when we call the next() then the request transfers to the endpoint which is the connection event handler here and operations mentioned inn the connection event handler function executes but when an erro is passed in the next() then the req for connection cannot go to the endpoint and the socket middleware handles the req by sendin aevent named as:- [connect_error] to the client sending request.
  //then if we dont have the connect_erorr event listner in the client then The client won't handle connection errors gracefully. The user might not know why the connection failed, leading to a poor user experience.
  //so we generally define the event listner and handler funnction {which recieves the error passed in next()}  in client for handling that

  //verifying the token
  const decoded = jwt.verify(token,jwtSecret);

  //finding the user from the userId we got inside thw decoded data
  const user = await User.findById(decoded.id);

  if (!user){
    next(new Error ('user not found in db'))
  }


//creating a user field in socket object so that we can access tthat further as the socket object is passed to endpoint when next() is called
  socket.user = user;
  next();`

})

so the syntax will be :-[ when token is send throgh cookie by frontend automatically]

we will use cookie parser here which will parse the cookie and add the token in cookies object inside the req objcet and here the socket.request object

io.use((socket,next) => {
    cookieParser()(socket.request,socket.request.res,async (err) => await socketAuthenticator(err,socket,next))
})

definition of socketAuthenticator function :- 

exports. socketAuthenticator = async (err,socket,next) => {
  try{

    if(err) return next(err);

    const authToken = socket.request.cookies.token;

    if(!authToken) return next(new Error('Token Unavailable'));

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedData._id);

    if(!user) return next(new Error('User not found'));

    socket.user = user;

    return next();

  }catch(error){

    console.log(error);
    return next(new Error('Authentication error'));

  }
}

3. what it does:-   const onlineUser = Array.from(userSocketMap.keys());

4. when we use the "type":"module" in package.json then we can use the ESModule in the backend but in that case while importing and exporting files we have to use extension of the file like .js otherwise error will come.

5. when you need to access the "io" object in other files in the backend, which is created in the index.js file by syntax {new Server(server created by http server,cors config)} then what you need to do is:- 

the server you created using express() just set the value of 'io' with a key likee:- 
app.set('io',io);

then anywhere in the backeend you can access it like:- 
req.app.get('io');

6. Express provides an application-wide storage mechanism through:
app.set('io', io);    // Store the io instance
req.app.get('io'); 
This works because:
Every request (req) has access to the app instance via req.app
The Express app object acts like a secure container for sharing application-level data