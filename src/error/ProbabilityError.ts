export default class ProbabilityError extends Error {

    public static BAD_VALUE: string = "Probability must be in range(0, 1)."

    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, ProbabilityError.prototype);
    }
}
