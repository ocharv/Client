/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null; //Math.random()
    this.name = null;
    this.username = null;
    this.token = null;
    this.status = null;
    this.games = null;
    this.moves = null;
    Object.assign(this, data);
  }
}
export default User;
