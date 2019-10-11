/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};

exports.loggedIndex = (req, res) => {
  res.render('loggedHome', {
    title: 'Home'
  });
};
