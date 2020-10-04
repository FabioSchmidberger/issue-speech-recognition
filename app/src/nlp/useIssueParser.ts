import { useEffect, useState } from 'react';
import EntityType from '../models/EntityType';
import Issue, { IssueElementsList } from '../models/Issue';
import NLP from '../models/NLP';
import matchToList from './matchToList';
import { useIssueElementLists } from '../state/IssueElementsReducer';

const emptyIssue: Issue = {
  title: '',
  body: '',
  labels: [],
  components: [],
  weight: 0,
  assignees: [],
  priority: [],
};

const testIssue: Issue = {
  title: 'The titlebar of our App should be green.',
  body:
    'Change it to our new cooperate colors. We need to improve this a lot. THe question is if all of this will even fit. I doubt that. Because this UI Sucks.',
  labels: ['bug', 'enhancement'],
  components: ['login-service', 'ui-components'],
  weight: 0,
  assignees: ['FabioSchmidberger'],
  priority: ['MEDIUM'],
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
    title: getTitle(nlp),
    body: getBody(nlp),
    labels: getLables(nlp, issueElementLists.labels),
    components: getComponents(nlp, issueElementLists.components),
    weight: getWeight(nlp),
    assignees: getAssignees(nlp, issueElementLists.assignees),
    priority: getPriority(nlp, issueElementLists.priorities),
  };
}

function getTitle(nlp: NLP) {
  console.log(nlp);
  let title = nlp.sentences[0].tokens
    .map((token) => token.originalText)
    .join(' ');

  return title;
}

function getBody(nlp: NLP) {
  let description = 'Description';
  if (
    nlp.sentences.length > 1 &&
    nlp.sentences[1].entitymentions.length === 0
  ) {
    description = nlp.sentences[1].tokens
      .map((token) => token.originalText)
      .join(' ');
  }

  return description;
}

function getAssignees(nlp: NLP, possibleAssignees: string[]) {
  const recognizedPersons = getEntitymentions(nlp, EntityType.PERSON);
  return matchEntities(recognizedPersons, possibleAssignees);
}

function getPriority(nlp: NLP, possiblePriorities: string[]) {
  const recognizedPriorities = getEntitymentions(nlp, EntityType.PRIORITY);
  return matchEntities(recognizedPriorities, possiblePriorities);
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
  const matchedEntities = recognizedElements.map((element) =>
    matchToList(element, possibleElements),
  );
  console.log(matchedEntities);
  return removeDuplicates(matchedEntities);
}

function removeDuplicates(list: string[]) {
  return list.filter((item, i) => list.indexOf(item) === i);
}

export default useIssueParser;
