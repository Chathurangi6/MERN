module.exports = {
    DB: 'mongodb://localhost:27017/reactcrud',
    secretOrKey: "secret"
}
require('./models/User')
require('./models/Doctor')
require('./models/Receptionist')
require('./models/Appointment')
require('./models/report')