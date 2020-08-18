#!/bin/bash
BASEDIR=$(dirname $(readlink -f "$0"))
repo_root_path=$(readlink -f "${BASEDIR}/..")
(
  cd "$repo_root_path/nlp"
  # use CORE_NLP_PATH variable if set (usually in CI), if not set use repo default path
  CORE_NLP_PATH="${CORE_NLP_PATH:-./corenlp/stanford-corenlp-full-2018-10-05/*}"

  cd ${CORE_NLP_PATH}

  time java -mx9g -cp "$CORE_NLP_PATH" edu.stanford.nlp.pipeline.StanfordCoreNLPServer -serverProperties corenlp.properties -port 9000 -timeout 15000
)