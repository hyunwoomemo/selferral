import ReactQuill from "react-quill";

export const QuillEditor = ({ content, setContent }) => {
  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <div>
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],

            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["link", "image", "code-block"],
            ["blockquote", "hr"],
            [{ align: [] }], // Add alignment options here
          ],
        }}
        placeholder="내용을 입력해주세요.."
        theme="snow"
      />
    </div>
  );
};
