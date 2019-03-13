var exports = module.exports = {};

let users = [
    {
        id: 1,
        username: 'test',
        password: 'test',
        firstName: 'Arn',
        lastName: 'Boy',
        picture: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Sunglasses&hairColor=Blonde&facialHairType=BeardLight&facialHairColor=Red&clotheType=BlazerSweater&clotheColor=PastelGreen&eyeType=Dizzy&eyebrowType=UnibrowNatural&mouthType=Sad&skinColor=Black'
    },
    {
        id: 2,
        username: 't',
        password: 't',
        firstName: 'Ula',
        lastName: 'Czer',
        picture: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=Blonde&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Pink&eyeType=Wink&eyebrowType=Default&mouthType=Tongue&skinColor=Pale'
    },
    {
        id: 3,
        username: 'a',
        password: 'a',
        firstName: 'Bot',
        lastName: 'Tob',
        picture: 'https://avataaars.io/?avatarStyle=Circle&topType=Hijab&accessoriesType=Round&hatColor=PastelGreen&hairColor=Platinum&facialHairType=BeardMagestic&facialHairColor=Auburn&clotheType=Overall&clotheColor=White&eyeType=WinkWacky&eyebrowType=DefaultNatural&mouthType=Eating&skinColor=Light'
    },
];

exports.api = (app) => {
    app.get('/posts', (req, res) => {
        res.send(
            [{
                title: "Hello World!",
                description: "Hi there! How are you?"
            }]
        )
    });
    app.post('/users/authenticate', function (req, res) {
        res.send('POST request to the homepage');
    });
};