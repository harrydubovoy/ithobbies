const Jimp = require('jimp');
const moment = require('moment');
const { validationResult } = require('express-validator/check');


const a = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};

const transliterate = (text) => {
    return text.split('').map(function (char) {
        return a[char] || char;
    }).join('');
};

const slugify = (text) => {
    let result = transliterate(text);
    return result.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

const crop = (photo, type) => {
    Jimp.read(photo.path, (err, image) => {
        if (err) throw new Error;
        image
            .cover(270, 160)
            .write(`${photo.destination}/thumb-${photo.originalname}`)
    })
};

const formatedDate = date => {
    return moment(date).format('DD/MM/YY')
};

const validateMessage = (req) => {
    const errors = validationResult(req);
    const errorArray = errors.array();
    const errorArrayFiltered = errorArray.map((err) => {
        return `In field "${err.param}" - ${err.msg}`
    });

    return errorArrayFiltered.join(', ');
};

const truncateWithEllipses = (text, max = 400) => {
    return text.substr(0,max-1)+(text.length>max?'&hellip;':'');
};

module.exports = {
    crop,
    slugify,
    formatedDate,
    truncateWithEllipses,
    validateMessage
};