function getCustomerMethod () {
    return 'Hello get Customer';
}
function postCustomerMethod () {
    return 'Posted Customer';
}
function putCustomerMethod () {
    return 'Put Customer';
}
function deleteCustomerMethod () {
    return 'Deleted Customer';
}

module.exports.getCustomerMethod = getCustomerMethod;
module.exports.postCustomerMethod =postCustomerMethod;
module.exports.putCustomerMethod = putCustomerMethod;
module.exports.deleteCustomerMethod =deleteCustomerMethod;