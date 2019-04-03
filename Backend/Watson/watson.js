var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');


var visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  iam_apikey: '-Gq5CaHfjgBtlrdFKbgVvIVmtS1FIbAQvvTPHAiUMHP-'
});

var url = 'https://i.ibb.co/kJQnt9p/IMG-2546.jpg';
var classifier_ids = ["food", "RecipezxIngredients_1655201802"];

var params = {
  url: url,
  classifier_ids: classifier_ids
};

visualRecognition.classify(params, function (err, response) {
  if (err) {
    console.log(err);
  } else {
    console.log(JSON.stringify(response, null, 2))
  }
});

