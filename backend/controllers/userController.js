const User = require("../models/User");
// const Bill = require("../models/Bill");

exports.getProfile = (req, res) => {
  const userId = req.user.id;

  // Fetch user profile
  User.getProfile(userId, (err, userResults) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching user profile' });
    }

    if (userResults.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userResults[0];
    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
      }
    });

    // Fetch last 10 generated bills
    console.log("User ID from session:", userId);
    // Bill.getLastBills(userId, (err, billResults) => {
    //   if (err) {
    //     return res.status(500).json({ message: 'Error fetching user bills' });
    //   }

    //   res.status(200).json({
    //     user: {
    //       name: user.name,
    //       email: user.email,
    //     },
    //     bills: billResults
    //   });
    // });
  });
};
