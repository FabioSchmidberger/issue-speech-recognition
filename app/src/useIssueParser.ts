import { useEffect, useState } from 'react';
import EntityType from './models/EntityType';
import Issue from './models/Issue';
import NLP from './models/NLP';

const emptyIssue: Issue = {
  title: '',
  description: '',
  lables: '',
  components: '',
  weight: 0,
  assignee: '',
};

function useIssueParser(nlp: NLP | null) {
  const [issue, setIssue] = useState<Issue>(emptyIssue);

  useEffect(() => {
    const issue = buildIssue(nlp);
    setIssue(issue);
  }, [nlp]);

  return {
    issue,
    setIssue,
  };
}

function buildIssue(nlp: NLP | null): Issue {
  if (!nlp) return emptyIssue;

  return {
    title: 'Test',
    description: 'Description',
    lables: getLables(nlp),
    components: getComponents(nlp),
    weight: getWeight(nlp),
    assignee: getAssignee(nlp),
  };
}

function getEntitymentions(nlp: NLP, entityType: EntityType) {
  const entityMentions = nlp.sentences.flatMap((sentence) =>
    sentence.entitymentions
      .filter((entityMention) => entityMention.ner === entityType)
      .map((entityMention) => entityMention.text),
  );

  return entityMentions;
}

function getAssignee(nlp: NLP) {
  const persons = getEntitymentions(nlp, EntityType.PERSON);
  return persons.toString();
}

function getComponents(nlp: NLP) {
  const components = getEntitymentions(nlp, EntityType.COMPONENT);
  return components.toString();
}

function getLables(nlp: NLP) {
  const lables = getEntitymentions(nlp, EntityType.LABEL);
  return lables.toString();
}

function getWeight(nlp: NLP) {
  const numbers = getEntitymentions(nlp, EntityType.NUMBER);

  const issueWeight =
    numbers.length > 0 && !isNaN(parseInt(numbers[0]))
      ? parseInt(numbers[0])
      : 0;

  return issueWeight;
}

export default useIssueParser;
