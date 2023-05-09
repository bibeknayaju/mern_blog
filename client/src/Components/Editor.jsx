import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Editor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ "code-block": "code" }], // added code-block button to the toolbar

      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "code-block", // added "code-block" format
  ];

  return (
    <div className="mb-10">
      <ReactQuill
        className="h-52"
        value={value}
        theme={"snow"}
        formats={formats}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
}
