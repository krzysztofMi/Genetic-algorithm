export const bukinFunction = (X: any) : number => {
    return 100*Math.sqrt(Math.abs(X[1] - 0.01*X[1]*X[0])) + 0.01*Math.abs(X[0] + 10)
}
