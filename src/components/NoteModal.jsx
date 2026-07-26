import {useState, useRef, useEffect} from "react";
import {Bold, Italic, Image} from "lucide-react";
import  getTextColor  from "../utils/color";
const API_URL = import.meta.env.VITE_API_URL;

function NoteModal({ close, onSave, initialNote }) {
  const [note, setNote] = useState(
    initialNote || {
      title: "",
      content: "",
      bgColor: "#ffffff",
      category: [],
      images: [],
    }
  );

  const contentRef = useRef(null);
  const textColor = getTextColor(note.bgColor);

  useEffect(() => {
  if (contentRef.current) {
    contentRef.current.innerHTML = initialNote?.content || "";
  }
}, [initialNote]);

async function addImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image",file);

    try{
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/upload`,{
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message);
      }

      const imgHtml = `<img src="${data.url}"/>`;
      const updatedContent = (contentRef.current?.innerHTML || note.content) + imgHtml;

      if (contentRef.current) {
        contentRef.current.innerHTML = updatedContent;
      }

      setNote((prev) => ({
        ...prev,
        content: updatedContent,
        images: [
          ...prev.images,
          {
            url: data.url,
            public_id: data.public_id,
          },
        ],
      }));
  } catch(error){
    console.log("Image upload failed: ", error.message);
  }
  e.target.value="";
}

  function applyFormat(command) {
    document.execCommand(command);
    contentRef.current?.focus();
  }

  function handleSave() {
  const updatedNote = {
    ...note,
    content: contentRef.current?.innerHTML || "",
  };

  onSave(updatedNote);
  close();
}

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        style={{
          backgroundColor: note.bgColor,
        }}
        className="w-[750px] h-[90vh] rounded-2xl p-8 shadow-xl flex flex-col"
      >
        <input
          placeholder="Title"
          value={note.title}
          className="w-full text-2xl font-semibold outline-none mb-5 bg-transparent"
          style={{
            color: textColor,
          }}
          onChange={(e) =>
            setNote({
              ...note,
              title: e.target.value,
            })
          }
        />

        <div className="flex gap-5 items-center mb-4">
          <button
            type="button"
            onClick={() => applyFormat("bold")}
            style={{ color: textColor }}
            className="cursor-pointer"
          >
            <Bold size={20} />
          </button>

          <button
            type="button"
            onClick={() => applyFormat("italic")}
            style={{ color: textColor }}
            className="cursor-pointer"
          >
            <Italic size={20} />
          </button>

          <label
            className="flex items-center gap-2 cursor-pointer"
            style={{ color: textColor }}
          >
            <Image size={20} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={addImage}
            />
          </label>

          <div className="flex items-center gap-2">
            <span style={{ color: textColor }}>Color</span>

            <input
              type="color"
              value={note.bgColor}
              className="cursor-pointer"
              onChange={(e) =>
                setNote({
                  ...note,
                  bgColor: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div
          ref={contentRef}
          contentEditable
          suppressContentEditableWarning
          autoFocus={!initialNote}
          className="note-content border flex-1 border-gray-400 rounded-lg p-4 overflow-y-auto "
          style={{
            color: textColor,
          }}
          data-placeholder="Write your note..."
          onInput={(e) =>
            setNote({
              ...note,
              content: e.currentTarget.innerHTML,
            })
          }
        />
        <style>{`
        .note-content img{
          display: block;
          width: 80%;
          max-height: 200px;
          object-fit: contain;
          margin: 0.5rem auto;
        }
          .note-content:empty:before {
            content: attr(data-placeholder);
            opacity: 0.5;
            pointer-events: none;
          }
        `}</style>

        <input
          placeholder="Category"
          value={note.category.join(",")}
          className="border border-gray-300/40 mt-4 p-2 rounded w-full bg-transparent placeholder-current"
          style={{
            color: textColor,
          }}
          onChange={(e) =>
            setNote({
              ...note,
              category: e.target.value.split(","),
            })
          }
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            type="button"
            onClick={() => close?.()}
            className="px-2 font-medium hover:opacity-70 transition-opacity cursor-pointer"
            style={{ color: textColor }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-2 font-medium hover:opacity-70 transition-opacity cursor-pointer"
            style={{ color: textColor }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteModal;
