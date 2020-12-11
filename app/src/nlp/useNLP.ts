import Axios from 'axios';
import { useEffect, useState } from 'react';
import NLP from './../models/NLP';

function useNLP(text: string, isActive: boolean) {
  const [nlp, setNlp] = useState<NLP | null>(null);

  const baseURL =
    process.env.REACT_APP_NLP_URL || 'http://localhost:8080/api/corenlp';

  const api = Axios.create({ baseURL });

  useEffect(() => {
    if (isActive) {
      (async () => {
        return api
          .get('', { params: { text } })
          .then((response) => {
            console.log('NLP Response');
            console.log(response.data);
            setNlp(response.data);
          })
          .catch((error) => {
            console.log(error);
            return {};
          });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isActive]);
  return {
    nlp,
    resetNlp: () => setNlp(null),
  };
}

export default useNLP;
