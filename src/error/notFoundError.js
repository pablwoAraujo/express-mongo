class NotFoundError extends Error{
  constructor(message = "", ...args) {
    super(message, ...args);
    this.message = message || "Not Found";
  }
}

export default NotFoundError;