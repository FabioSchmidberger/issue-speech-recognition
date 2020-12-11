import java.io.Console;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import com.google.gson.Gson;

import edu.stanford.nlp.pipeline.Annotation;
import edu.stanford.nlp.pipeline.CoreDocument;
import edu.stanford.nlp.pipeline.CoreEntityMention;
import edu.stanford.nlp.pipeline.CoreSentence;
import edu.stanford.nlp.pipeline.JSONOutputter;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import edu.stanford.nlp.simple.Sentence;

public class CorenlpJsonConverter {

	public static void main(String[] args) {

		String text = "Fabio will move to Paris tomorrow. Today Max is hungry.";

		Properties props = new Properties();
		// set the list of annotators to run
		props.setProperty("annotators", "tokenize,ssplit,pos,lemma,ner,parse,depparse,coref,kbp,quote");
		// set a property for an annotator, in this case the coref annotator is being
		// set to use the neural algorithm
		props.setProperty("coref.algorithm", "neural");
		props.setProperty("outputFormat", "json");
		//props.setProperty("ner.model", "/usr/local/models/ner.model.ser.gz");
		// build pipeline
		StanfordCoreNLP pipeline = new StanfordCoreNLP(props);
		// create a document object
		CoreDocument document = new CoreDocument(text);
		// annnotate the document
		pipeline.annotate(document);

		// examples
		
		conventCoreSentencesToJson(document.sentences());
	
		try {
			String result = new JSONOutputter().print(document.annotation());
			System.out.println(result);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	public static String conventCoreSentencesToJson(List<CoreSentence> sentences) {
		List<String> jsonSentences = new ArrayList<String>();
		for(CoreSentence sentence : sentences) {
			jsonSentences.add(convertCoreSentenceToJson(sentence));
		}
		System.out.println(jsonSentences);
		return jsonSentences.toString();
	}

	private static String convertCoreSentenceToJson(CoreSentence sentence) {

		List<String> nerTags = sentence.nerTags();
		List<String> posTags = sentence.posTags();
		
		System.out.println(sentence.tokens());

		List<CoreEntityMention> entityMentions = sentence.entityMentions();

		String json = "{";
		json += "\"text\": " + "\""+ sentence.text() + "\"" + ",";
		json += "\"nerTags\": " + new Gson().toJson(nerTags) + ",";
		json += "\"posTags\": " + new Gson().toJson(posTags) + ",";
		json += "\"tokens\": " + new Gson().toJson("") + ",";
		json += "\"entityMentions\": " + getEntityMentionsJson(entityMentions);
		json += "}";

		return json;
	}

	private static String getEntityMentionsJson(List<CoreEntityMention> entityMentions) {
		List<String> jsonEntities = new ArrayList<String>();

		for (CoreEntityMention entityMention : entityMentions) {
			jsonEntities.add(getEntityToJson(entityMention));
		}

		return jsonEntities.toString();
	}

	private static String getEntityToJson(CoreEntityMention entityMention) {
		String json = "{";
		json += "\"entityType\": " + "\"" + entityMention.entityType() + "\""+ ",";
		json += "\"charOffsetStart\": " + entityMention.charOffsets().first() + ",";
		json += "\"charOffsetEnd\": " + entityMention.charOffsets().second() + ",";
		json += "\"text\": " + "\""+ entityMention.text() + "\"";
		json += "}";

		return json;
	}

}
