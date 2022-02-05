const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('ERROR ERROR WRONG ROUTE');
});

module.exports = router;
