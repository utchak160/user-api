const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://taskapp:@Lucknow160@cluster0-jfyyd.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
