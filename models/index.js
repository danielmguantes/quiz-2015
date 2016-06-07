var path = require('path');

// Cargar ORM
var Sequelize = require('sequelize');

var url, storage;
if (!process.env.DATABASE_URL) {
    url = "sqlite:///";
    storage = "quiz.sqlite";
} else {
    url = process.env.DATABASE_URL;
    storage = process.env.DATABASE_STORAGE || "";
}
var sequelize = new Sequelize(url, 
	 						  { storage: storage,
				              	omitNull: true 
				              });

// Importar las definiciones de las tablas Quiz de quiz.js y Comment comment.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

var Comment = sequelize.import(path.join(__dirname,'comment'));

var User= sequelize.import(path.join(__dirname,'user'));

// Importar la definicion de la tabla Attachments de attachment.js
var Attachment = sequelize.import(path.join(__dirname,'attachment'));

//Relaciones
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);


// Relacion 1 a N entre User y Quiz:
User.hasMany(Quiz, {foreignKey: 'AuthorId'});
Quiz.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});


// Relacion 1 a N entre User y COmment:
User.hasMany(Comment, {foreignKey: 'AuthorId'});
Comment.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});

// Relacion 1-a-1 ente Quiz y Attachment
Attachment.belongsTo(Quiz);
Quiz.hasOne(Attachment);



//
exports.Quiz = Quiz; // exportar definición de tabla Quiz
exports.Comment=Comment;
exports.User=User;
exports.Attachment = Attachment; // exportar definición de tabla Attachments