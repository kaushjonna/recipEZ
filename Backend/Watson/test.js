const watson = require("./watson");

const heyDude = ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/1200px-Banana-Single.jpg', 'http://cdn1.medicalnewstoday.com/content/images/articles/304/304448/limes.jpg']


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




