import React from 'react';
import styled from 'styled-components';
import EntityType, { entityColors } from '../models/EntityType';
import NLP from '../models/NLP';
import Tooltip from './Tooltip';

interface Props {
  text: string;
  nlp: NLP | null;
  isRecording: boolean;
}

const TextWithMarkings: React.FC<Props> = ({ text, nlp, isRecording }) => {
  if (isRecording || !nlp || !nlp.sentences)
    return <TextContainer>{text}</TextContainer>;

  return (
    <NlpTextContainer>
      <>
        {nlp.sentences.map((sentence) =>
          sentence.tokens.map((token) => {
            return (
              <TokenContainer>
                <TokenText key={token.index} entity={token.ner}>
                  {token.originalText}
                </TokenText>
                {token.ner !== EntityType.NoEntityType && (
                  <Tooltip text={token.ner} />
                )}
              </TokenContainer>
            );
          }),
        )}
      </>
    </NlpTextContainer>
  );
};

const TextContainer = styled.div`
  font-size: 30px;
  padding: 50px;
  margin: 20px;
  width: 700px;
  min-height: 400px;
  line-height: 2;
  border-radius: 20px;
  background-color: hsl(200, 10%, 95%);

  @media (max-width: 768px) {
    width: 300px;
    min-height: 200px;
    font-size: 20px;
    padding: 10px;
  }
`;

const NlpTextContainer = styled.div`
  font-size: 30px;
  padding: 50px;
  margin: 20px;
  width: 700px;
  min-height: 400px;
  border-radius: 20px;
  background-color: hsl(200, 10%, 95%);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;

  @media (max-width: 768px) {
    width: 300px;
    min-height: 200px;
    font-size: 20px;
    padding: 10px;
  }
`;

const TokenContainer = styled.div`
  display: flex;
  margin: 10px;
  flex-direction: column;
  flex-wrap: wrap;
`;

const TokenText = styled.div`
  color: ${(props: { entity: EntityType }) => entityColors[props.entity]};
  line-height: 1;
  margin: 0;
`;

export default TextWithMarkings;
