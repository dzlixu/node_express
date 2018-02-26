var fortunCookie = [
    'conquer',
    'river',
    "do not fear what you don't konw",
    "whenever possible ,keep it simple."
];

exports.getFortune = function(){
    var idx = Math.floor(Math.random()*fortunCookie.length);
    return fortunCookie[idx];
}