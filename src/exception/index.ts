class MyError extends Error {
  public code: any;
  constructor(code, message) {
    super(message);
    this.code = code;
    this.message = message;
    this.name = "MyError";
  }
}

export default MyError;
