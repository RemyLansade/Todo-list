exports.getDate = function () {
    const todayId  = new Date();
    const options = {
        weekday : 'long',
        day : 'numeric',
        month : 'long'
    };

    return todayId.toLocaleDateString('fr-FR', options);
}

exports.getDay = function () {
    const todayId  = new Date();
    const options = {
        weekday : 'long'
    };

    return todayId.toLocaleDateString('fr-FR', options);
}