class User {
  constructor(email, username) {
    this.Email = email;
    this.Username = username;
  }

  toString() {
    return `{User: \n
            Email: ${this.Email}\n
            Username: ${this.Username}}`;
  }

  static userConverter = {
    toFirestore: user => {
      return {
        Name: user.Email,
        Surname: user.Username,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new User(data.Email, data.Username);
    },
  };
}



export default User;
