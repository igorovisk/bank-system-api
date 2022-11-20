const bcrypt = require('bcrypt');

export class Encrypt {
  saltRounds = 10;

  async encryptString(target: String) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(
        target,
        this.saltRounds,
        function (err: String, hash: String) {
          return resolve(hash);
        },
      );
    });
  }
}
