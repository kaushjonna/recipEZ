const watson = require("./watson");

const heyDude = ['https://dvineuncorked.files.wordpress.com/2011/09/orange.jpg']


function getClassifications(imgLink) {
  watson.recognizeImage(imgLink).then(
    res => res.forEach(modelResult => {
      let classification = modelResult.classes[0].class;
      if (classification !== 'non-food') {
        console.log(classification);
      }
    }),
  );
}

heyDude.forEach(link => getClassifications(link));




