import javax.servlet.http.HttpServlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.google.gson.Gson;

import edu.stanford.nlp.pipeline.CoreDocument;
import edu.stanford.nlp.pipeline.CoreEntityMention;
import edu.stanford.nlp.pipeline.CoreSentence;
import edu.stanford.nlp.pipeline.StanfordCoreNLP

;

public class CorenlpServelet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

		String text = request.getParameter("text");
		
		
		
		Properties props = new Properties();
	    // set the list of annotators to run
	    props.setProperty("annotators", "tokenize,ssplit,pos,lemma,ner,parse,depparse,coref,kbp,quote");
	    // set a property for an annotator, in this case the coref annotator is being set to use the neural algorithm
	    props.setProperty("coref.algorithm", "neural");
	    // build pipeline
	    StanfordCoreNLP pipeline = new StanfordCoreNLP(props);
	    // create a document object
	    CoreDocument document = new CoreDocument(text);
	    // annnotate the document
	    pipeline.annotate(document);
	    // examples

		
		CoreSentence sentence = document.sentences().get(0);
		
		List<String> nerTags = sentence.nerTags();
		List<String> posTags = sentence.posTags();
		List<CoreEntityMention> entityMentions = sentence.entityMentions();
		

		if (text != null) {
			String json = "{";
			json += "\"nerTags\": " + new Gson().toJson(nerTags) + ",";
			json += "\"posTags\": " + new Gson().toJson(posTags) + ",";
			json += "\"entityMentions\": " + getEntityMentionsJson(entityMentions) + ",";
			json += "}";
			response.getOutputStream().println(json);
		} else {
			// That person wasn't found, so return an empty JSON object. We could also
			// return an error.
			response.getOutputStream().println("{}");
		}
		response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Methods","GET, OPTIONS, HEAD, PUT, POST");
	}

	private String getEntityMentionsJson(List<CoreEntityMention> entityMentions) {
		List<String> jsonEntities= new ArrayList<String>();
		
		for(CoreEntityMention entityMention : entityMentions) {
			jsonEntities.add(getEntityToJson(entityMention));
		}
		
		String json= new Gson().toJson(jsonEntities);
		
		System.out.println("JSON" + json);
		return json;
	}
	
	private String getEntityToJson(CoreEntityMention entityMention) {
		String json = "{";
		json += "entityType: " + entityMention.entityType() + ",";
		json += "charOffsets: " + entityMention.charOffsets().toString() + ",";
		json += "text: " + entityMention.text() + ",";
		json += "}";
		
		return json;
	}
}
