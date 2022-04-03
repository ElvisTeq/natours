// #5 - s9
// Catching Errors in Async Functions

// return => to create a new anonymous function => for the assigned function
// createTour => will use this function instead of using a function calling another function which does't work

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
