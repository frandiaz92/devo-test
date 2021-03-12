export default function getComplementaryKPairs(arr=[], k=0){
  if(!Array.isArray(arr) || !arr.length){
    return 0;
  }
  const idNums = {};
  arr.forEach(num => idNums[num] ? idNums[num] +=1 : idNums[num] = 1);
  let counter = 0;
  const uniqueNums = new Set(arr);
  uniqueNums.forEach(num=>{
    const numComplementary = idNums[k - num];
    counter += numComplementary ? numComplementary * idNums[num] : 0;
  });
  return counter;
}