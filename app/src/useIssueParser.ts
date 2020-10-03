import { useEffect, useState } from 'react';
import EntityType from './models/EntityType';
import Issue, { IssuePriority } from './models/Issue';
import NLP from './models/NLP';

const emptyIssue: Issue = {
  title: 'The titlebar should be green.',
  body: 'Change it to our new cooperate colors.',
  labels: ['bug', 'enhancement'],
  components: ['login-service', 'ui-components'],
  weight: 0,
  assignees: ['FabioSchmidberger'],
  priority: IssuePriority.MEDIUM,
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
    body: 'Description',
    labels: getLables(nlp),
    components: getComponents(nlp),
    weight: getWeight(nlp),
    assignees: getAssignees(nlp),
    priority: getPriority(nlp),
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

function getAssignees(nlp: NLP) {
  const persons = getEntitymentions(nlp, EntityType.PERSON);
  return persons;
}

function getPriority(nlp: NLP) {
  const priority = getEntitymentions(nlp, EntityType.PRIORITY);
  return IssuePriority.MEDIUM;
}

function getComponents(nlp: NLP) {
  const components = getEntitymentions(nlp, EntityType.COMPONENT);
  return components;
}

function getLables(nlp: NLP) {
  const lables = getEntitymentions(nlp, EntityType.LABEL);
  return lables;
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
