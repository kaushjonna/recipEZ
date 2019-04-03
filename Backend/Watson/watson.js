var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');

async function recognizeImage(imageUrl) {
  var visualRecognition = new VisualRecognitionV3({
    version: '2018-03-19',
    iam_apikey: '-Gq5CaHfjgBtlrdFKbgVvIVmtS1FIbAQvvTPHAiUMHP-'
  });

  var url = imageUrl;
  var classifier_ids = ["food", "RecipezxIngredients_1655201802"];

  var params = {
    url: url,
    classifier_ids: classifier_ids
  };
  let data;
  try {
    data = await visualRecognition.classify(params);
    //console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
  }

  response = await data;
  return response.images[0].classifiers;
}

module.exports = {
  recognizeImage
}

