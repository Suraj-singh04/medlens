# summarize.py
import sys
import json
from transformers import pipeline

def summarize_text(text):
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    
    # Craft a layman prompt
    prompt = (
            "You are a helpful medical assistant. Read this blood test report and explain its key points "
            "in very simple language for the patient. Mention abnormal values and what they may mean, like anemia, low platelets, etc. "
            "Avoid making up any information.\n\n"
            + text
        )

    summary = summarizer(prompt, max_length=300, min_length=80, do_sample=False)
    return summary[0]['summary_text']

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"summary": "No input text provided."}))
        sys.exit(1)

    input_text = sys.argv[1]
    try:
        summary = summarize_text(input_text)
        print(json.dumps({"summary": summary}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
