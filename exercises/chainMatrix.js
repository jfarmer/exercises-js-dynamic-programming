/**
 * Given an array of matrix dimensions, return the fewest number of multiplications
 * required to calculate the product of matrixes with those dimensions.
 *
 * Assume we're doing naïve matrix multiplication, where multiplying
 * an MxN matrix by an NxP matrixrequires M*N*P multiplications.
 *
 * For example, if A is 10x20, B is 20x2, and C is 2x40, then
 * (AB)C requires (10*20*2) + (20*2*40) = 2000 multiplications
 * A(BC) requires (20*2*40) + (10*20*40) = 9600 multiplications
 *
 *
 * @example
 * chainMatrix([10, 20, 2, 40]); // returns 2000
 */
function chainMatrix(dimensions) {

}

if (require.main === module) {
  console.log('Running sanity checks:');

  // Add some sanity checks here
}

module.exports = chainMatrix;
