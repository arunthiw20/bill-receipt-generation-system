const Bill = require("../models/Bill");
const moment = require("moment");
const pdf = require("pdfkit");
const fs = require("fs");  // Import fs to save the PDF file

exports.createBill = (req, res) => {
  const userId = req.session.userId;
  console.log("User ID from session:", userId);

  const { customerName, contactDetails, items, discount, totalAmount, purchaseDate } = req.body;

  res.status(200).json({ message: "Test response received" });
  console.log("User ID from token exports.createBill:", userId);

  // Check if required fields are present
  if (!customerName || !totalAmount || !purchaseDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Format purchase date
  const purchaseDateFormatted = moment(purchaseDate).format("YYYY-MM-DD HH:mm:ss");

  // Create bill in database
  Bill.create(customerName, contactDetails, items, discount, totalAmount, purchaseDateFormatted, userId, (err) => {
    if (err) {
      console.log("User ID from token in Bill.create:", userId);
      return res.status(500).json({ message: "Error creating bill" });
    }

    // Generate PDF receipt
    generatePDF(customerName, contactDetails, items, discount, totalAmount, purchaseDateFormatted, (pdfFilePath) => {
      res.status(200).json({
        message: "Bill created successfully",
        pdf: pdfFilePath // Return the path to the saved PDF file
      });
    });
  });
};

// Function to generate PDF receipt
function generatePDF(customerName, contactDetails, items, discount, totalAmount, purchaseDate, callback) {
  const doc = new pdf();
  const filePath = `./receipts/${customerName}_${Date.now()}.pdf`; // PDF file path

  // Set up the PDF document
  doc.fontSize(20).text('Bill Receipt', { align: 'center' });
  doc.fontSize(12).text(`Customer: ${customerName}`);
  doc.text(`Contact: ${contactDetails}`);
  doc.text(`Date: ${purchaseDate}`);

  // Items purchased
  doc.text('\nItems Purchased:');
  items.forEach(item => {
    doc.text(`${item.name} - ${item.quantity} x $${item.price} = $${item.total}`);
  });

  // Discount and Total Amount
  doc.text(`Discount: $${discount}`);
  doc.text(`Total Amount: $${totalAmount}`);

  doc.end();

  const receiptsFolder = './receipts';
  if (!fs.existsSync(receiptsFolder)) {
    fs.mkdirSync(receiptsFolder);
  }

  // Save PDF to file system
  doc.pipe(fs.createWriteStream(filePath));

  // Callback with the file path after saving the PDF
  doc.on('finish', () => {
    callback(filePath);
  });
}

exports.getLastBills = (req, res) => {
  const userId = req.user.id;

  // Fetch last 10 bills for the user
  Bill.getLastBills(userId, (err, billResults) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching user bills' });
    }

    res.status(200).json(billResults);
  });
};
