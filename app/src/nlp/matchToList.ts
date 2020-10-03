function matchToList(value: string, candidates: string[]) {
  const matchingCandidates = candidates.filter((candidate) =>
    candidate.toLowerCase().includes(value.toLowerCase()),
  );

  if (matchingCandidates.length === 1) return matchingCandidates[0];

  if (matchingCandidates.length > 1)
    return getClosestCandidate(value, matchingCandidates);

  if (matchingCandidates.length === 0)
    return getClosestCandidate(value, candidates);

  return '';
}

function getClosestCandidate(value: string, candidates: string[]) {
  let closestCandidate = '';

  /**
   * Apply trigram matching for each candidate value.
   * Select match with highest score.
   */
  let maxTrigramScore = -1;

  for (const candidate of candidates) {
    const score = getTrigramScore(value.toLowerCase(), candidate.toLowerCase());
    if (score > maxTrigramScore) {
      closestCandidate = candidate;
      maxTrigramScore = score;
    }
  }

  return closestCandidate;
}

function getTrigramScore(a: string, b: string) {
  const aTrigrams = getTrigrams(a);
  const bTrigrams = getTrigrams(b);

  let numMatching = 0;
  const numUnique = new Set([...aTrigrams, ...bTrigrams]).size;

  aTrigrams.forEach((aTrigram) => {
    bTrigrams.forEach((bTrigram) => {
      if (aTrigram === bTrigram) {
        numMatching++;
      }
    });
  });

  return numMatching / numUnique;
}

/* 
  A trigram algorithm is a case of n-gram, 
  a contiguous sequence of n (three, in this case) items from a given sample. 
*/

function getTrigrams(str: string): string[] {
  const trigrams = [];
  const data = '  '.concat(str, '  ');
  for (let i = data.length - 3; i >= 0; i = i - 1) {
    trigrams.push(data.slice(i, i + 3));
  }
  return trigrams;
}

export default matchToList;
