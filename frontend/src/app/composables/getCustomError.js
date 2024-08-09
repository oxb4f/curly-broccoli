class CustomError extends Error {
  constructor(name, details) {
    super();

    Error.captureStackTrace(this, CustomError);

    this.name = name ?? super.name;
    this.details = details;
  }

  static from(error) {
    const name = error.payload?.message;

    function toObj(arr, value) {
      return arr.reduceRight((acc, item) => ({ [item]: acc }), value);
    }

    const details =
      error.payload?.details?.reduce((object, detail) => {
        return { ...object, ...toObj(detail.path, detail.message) };
      }, {}) ?? {};

    console.log(details);

    return new CustomError(name, details);
  }
}

export default class ValidationError extends CustomError {
  constructor(name, details) {
    super(name, details);
  }
}
