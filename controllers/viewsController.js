//____________________________________________________________________
// #5 - s12
// Extending Our Base Templates with Blocks

exports.getOverview = (req, res) => {
  res.status(200).render('overview', {
    // #{title} => in pug
    title: 'All Tours',
  });
};

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
  });
};
