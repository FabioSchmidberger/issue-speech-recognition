#!/bin/bash
BASEDIR=$(dirname $(readlink -f "$0"))
repo_root_path=$(readlink -f "${BASEDIR}/..")
(
  cd "$repo_root_path/nlp"
  pwd

  CORE_NLP_PATH="${CORE_NLP_PATH:-./corenlp/stanford-corenlp-full-2018-10-05/*}"
  echo "TEST"
  
  java -cp $CORE_NLP_PATH edu.stanford.nlp.ie.crf.CRFClassifier -loadClassifier ./corenlp/stanford-corenlp-full-2018-10-05/model/ner-model.ser.gz -testFile test/data.test
)