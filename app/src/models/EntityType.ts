export const noEntityType = 'O';
export type NoEntityType = typeof noEntityType;
enum EntityType {
  NoEntityType = 'O',
  LABEL = 'LABEL',
  LABEL_INTENT = 'LABEL_INTENT',
  TITLE_INTENT = 'TITLE_INTENT',
  ASSIGN_INTENT = 'ASSIGN_INTENT',
  COMPONENT_INTENT = 'COMPONENT_INTENT',
  COMPONENT = 'COMPONENT',
  PERSON = 'PERSON',
  WEIGHT_INTENT = 'WEIGHT_INTENT',
  NUMBER = 'NUMBER',
  PRIORITY = 'PRIORITY',
  PRIORITY_INTENT = 'PRIORITY_INTENT',
}

const blue = 'blue';
const yellow = 'hsl(52, 100%, 50%)';
const red = 'hsl(0, 100%, 40%)';
const green = 'green';
const orange = 'hsl(37, 100%, 55%)';
const purple = 'hsl(310, 100%, 70%)';
const black = 'black';

export const entityColors: { [key in EntityType]: string | undefined } = {
  O: black,
  LABEL: blue,
  LABEL_INTENT: yellow,
  TITLE_INTENT: green,
  ASSIGN_INTENT: green,
  PERSON: red,
  COMPONENT: orange,
  COMPONENT_INTENT: purple,
  WEIGHT_INTENT: purple,
  NUMBER: green,
  PRIORITY: red,
  PRIORITY_INTENT: purple,
};

export default EntityType;
