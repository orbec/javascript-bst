export default class Node {
  #data;
  #right;
  #left;

  constructor(data = null, left = null, right = null) {
    this.#data = data;
    this.#left = left;
    this.#right = right;
  }

  get data() {
    return this.#data;
  }
  set data(data) {
    this.#data = data;
  }

  get right() {
    return this.#right;
  }

  set right(right) {
    this.#right = right;
  }

  get left() {
    return this.#left;
  }

  set left(left) {
    this.#left = left;
  }
}
