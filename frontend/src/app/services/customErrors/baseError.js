export default class BaseError extends Error {
  constructor(name, details) {
    super();

    Error.captureStackTrace(this, BaseError);

    this.name = name ?? super.name;
    this.details = details;
  }

  static from(error) {
    const type = error?.type;

    function toObj(arr, value) {
      return arr.reduceRight((acc, item) => ({ [item]: acc }), value);
    }

    const details =
      error.payload?.details?.reduce((object, detail) => {
        return { ...object, ...toObj(detail.path, detail.message) };
      }, {}) ?? {};

    return new this(type, details);
  }
}
