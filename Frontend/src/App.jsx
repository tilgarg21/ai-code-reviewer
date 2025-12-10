import { useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "./App.css";
import axios from "axios";

const App = () => {
  const [code, setCode] = useState(`function sum(){
  return a + b;
}`);

  const [review, setReview] = useState("");

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   Prism.highlightAll();
  // }, []);

  async function reviewCode() {
    try{
    setLoading(true);
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const response = await axios.post(`${BASE_URL}/ai/get-review`, {
      code,
    });
    // console.log(response.data);
    setReview(response.data);
  }
  catch(error){
    console.error("Error in reviewing code", error);
    setReview("Error: " + (error?.response?.data?.error || error.message));
  }
  finally{
    setLoading(false);
  }
}
  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                Prism.highlight(code, Prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">
          {loading ? "Reviewing..." : "Review"}
          </div>
        </div>
        <div className="right">
          <Markdown
          rehypePlugins={[rehypeHighlight]}
          >{review}
          </Markdown>
        </div>
      </main>
    </>
  );
};

export default App;
