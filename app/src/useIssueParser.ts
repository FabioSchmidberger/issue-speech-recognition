import { useEffect, useState } from 'react';
import EntityType from './models/EntityType';
import Issue, { IssueElementsList, IssuePriority } from './models/Issue';
import NLP from './models/NLP';
import matchToList from './nlp/matchToList';
import { useIssueElementLists } from './state/IssueElementsReducer';

const emptyIssue: Issue = {
  title: '',
  body: '',
  labels: [],
  components: [],
  weight: 0,
  assignees: [],
  priority: IssuePriority.NONE,
};

const testIssue: Issue = {
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
  const issueElementLists = useIssueElementLists();

  useEffect(() => {
    const issue = buildIssue(nlp, issueElementLists);
    setIssue(issue);
  }, [nlp, issueElementLists]);

  return {
    issue,
    setIssue,
  };
}

function buildIssue(
  nlp: NLP | null,
  issueElementLists: IssueElementsList,
): Issue {
  if (!nlp) return emptyIssue;

  return {
    title: 'Test',
    body: 'Description',
    labels: getLables(nlp, issueElementLists.labels),
    components: getComponents(nlp, issueElementLists.components),
    weight: getWeight(nlp),
    assignees: getAssignees(nlp, issueElementLists.assignees),
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

function matchEntities(
  recognizedElements: string[],
  possibleElements: string[],
) {
  return recognizedElements.map((element) =>
    matchToList(element, possibleElements),
  );
}

function getAssignees(nlp: NLP, possibleAssignees: string[]) {
  const recognizedPersons = getEntitymentions(nlp, EntityType.PERSON);
  return matchEntities(recognizedPersons, possibleAssignees);
}

function getPriority(nlp: NLP) {
  const priority = getEntitymentions(nlp, EntityType.PRIORITY);
  return IssuePriority.MEDIUM;
}

function getComponents(nlp: NLP, possibleComponents: string[]) {
  const recognizedComponents = getEntitymentions(nlp, EntityType.COMPONENT);
  return matchEntities(recognizedComponents, possibleComponents);
}

function getLables(nlp: NLP, possibleLables: string[]) {
  const recognizedLables = getEntitymentions(nlp, EntityType.LABEL);
  return matchEntities(recognizedLables, possibleLables);
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
