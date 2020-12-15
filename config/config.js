require('dotenv').config();

Date.prototype.addDays = function (numDays = 1) {
    this.setDate(this.getDate() + numDays);
};

Date.prototype.toShortISOString = function () {
    return this.toISOString().split('T')[0];
};
