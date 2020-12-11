import EntityType from './EntityType';

export interface Token {
  ner: EntityType;
  lemma: string;
  characterOffsetBegin: number;
  characterOffsetEnd: number;
  index: number;
  originalText: string;
}

export interface CoreEntityMention {
  ner: EntityType;
  text: string;
  characterOffsetBegin: number;
  characterOffsetEnd: number;
}

export interface CoreSentence {
  tokens: Token[];
  entitymentions: CoreEntityMention[];
}

interface NLP {
  sentences: CoreSentence[];
}

export default NLP;
