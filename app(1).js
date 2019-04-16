const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://JMMN:' +
process.env.MONGO_ATLAS_PW +
'@merakiers-8foui.mongodb.net/test?retryWrites=true'

)
  useMongoClient: true

