const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { fromPath } = require('pdf2pic');
const Tesseract = require('tesseract.js');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('pdf'), async (req, res) => {
  const pdfPath = req.file.path;
  const outputImage = `output-${Date.now()}.png`;

  try {
    const convert = fromPath(pdfPath, {
      density: 300,
      saveFilename: outputImage,
      savePath: './converted',
      format: 'png',
      width: 1200,
      height: 1600,
    });

    const page = await convert(1);

    const result = await Tesseract.recognize(page.path, 'ara', {
      logger: m => console.log(m),
    });

    const text = result.data.text;
    fs.writeFileSync('ocr-result.txt', text, 'utf8');

    res.json({ msg: '✅ تم الاستخراج', text });
  } catch (err) {
    console.error('❌ OCR error:', err.message);
    res.status(500).json({ msg: 'فشل في التحويل أو القراءة', error: err.message });
  } finally {
    fs.unlinkSync(pdfPath);
  }
});

  

app.listen(3000, () => {
  
  
  console.log('🚀 يعمل على http://localhost:3000');

  

});