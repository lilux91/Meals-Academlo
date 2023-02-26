const jwt = require('jsonwebtoken'); //importamos

// DEFINIMOS LA FUNCIÓN QUE RECIBIRA EL ID COMO ARGUMENTO
const generateJWT = id => {
  //PARA QUE LA FUNCIÓN RETORNE UNA PROMESA YA QUE NO SABEMOS CUANTO TIEMPO
  //SE DEMORE EN GENERAR EL JWT UTILIZAMOS EL PROMISE.
  return new Promise((resolve, reject) => {
    //ESTABLECEMOS EL PAYLOAD DEL TOKEN QUE SERA EL ID DEL USUARIO
    const payload = { id };
    //FIRMAMOS EL TOKEN CON EL ID DEL USUARIO Y LE AGREGAMOS UN TIEMPO
    // DE EXPIRACIÓN
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: process.env.JWT_EXPIRE_IN,
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        //RESOLVEMOS ENVIANDO EL TOKEN
        resolve(token);
      }
    );
  });
};

// EXPORTAMOS LA FUNCIÓN
module.exports = generateJWT;
