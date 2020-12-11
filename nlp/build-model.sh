#!/bin/bash
BASEDIR=$(dirname $(readlink -f "$0"))
repo_root_path=$(readlink -f "${BASEDIR}/..")
(
  cd "$repo_root_path/nlp"
  # use CORE_NLP_PATH env variable if set (usually in CI), if not set use repo default path
  CORE_NLP_PATH="${CORE_NLP_PATH:-./corenlp/stanford-corenlp-full-2018-10-05/*}"

  # train model
  time java -Xmx2g -cp "$CORE_NLP_PATH" edu.stanford.nlp.ie.crf.CRFClassifier -prop ner.model.props

  MODEL_RESOURCE_PATH=./corenlpApi/models

  mkdir -p "$MODEL_RESOURCE_PATH"
  # move model to resource folder so it can be packaged to war
  mv ner.model.ser.gz "$MODEL_RESOURCE_PATH"
)

echo "Finished Building Model"