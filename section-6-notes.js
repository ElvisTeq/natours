// #1
// Setting up Express and Basic Routing

// npm i express@4 => installed

// app.js => created

// ********************** HTTP Methods **********************

// ***CRUD***

// ----------- post
// => to create new resource

// ----------- get
// => to read resource

// ----------- put/patch
// => update existing resources

// ----------- delete
// =>

///////////////////////////////////////////////////////////////////////////

// #2
// APIs and RESTful API Design

// Application Programming Interface (API)
// => a piece of software that can be use by another piece of software

// RESTful (Rest Architecture)
// => to make it easy for use for everyone (understandable code, etc)

// 1. Separate API into logical resources
// resources => object or representation of something, any info that can be named can be a resource

// 2. Expose structured, resource-based URLs
// ex => https://www.natours.com/resourceName

// 3. Use HTTP methods (verbs)
// => DO not specifi what the resource name does
// ex => '/getTour' => ('GET /tours/7')
// ex => '/deleteToursByUser' => can be translated to (Delete '/user/3/tours/9')

// 4. Send data as JSON (usually)

// 5. Be stateless
// => all state is handled on the client side
// ex => based on who is logged in, data shown will be different each time
// Will never remember the previous request
// BadEx => GET /tours/nextPage => not good, nextPage will use previous page + 1
// GoodEx => GET /tours/page/6 => all we need to do is add 1 to the ID for next page

/////////////////////////////////////////////////////////////////////

// #3
// Starting Our API: Handling GET Requests

// -------------------------------------------- res.json({})
// => express method
// => sends a response that is the parameter converted to a JSON string using the JSON.stringify() method.
// => returns => object

/////////////////////////////////////////////////////////////////////

// #4
// Handling POST request

// Middle wear
// -------------------------------------------- app.use(express.json());
// => function that can modify incoming request data
// => Automatically converts incoming JSON data into JS code when using 'app'

// -------------------------------------------- Object.assign({Obj1}, {Obj2})
// => Merge 2 objects and returns a new Object
