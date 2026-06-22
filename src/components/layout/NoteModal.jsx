import {useState, useRef, useEffect} from "react";
import {Bold, Italic, Image} from "lucide-react";

function getTextColor(bg) {
  const color = bg.replace("#", "");

  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 150 ? "black" : "white";
}

function NoteModal({ close, onSave, initialNote }) {
  const [note, setNote] = useState(
    initialNote || {
      title: "",
      content: "",
      bgColor: "#ffffff",
      category: [],
    }
  );

  const contentRef = useRef(null);

  useEffect(() => {
  if (contentRef.current) {
    contentRef.current.innerHTML = initialNote?.content || "";
  }
}, [initialNote]);

  function addImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const imgHtml = `<img src="${reader.result}" class="max-w-full rounded-lg my-2"/>`;
      const updatedContent = (contentRef.current?.innerHTML || note.content) + imgHtml;

      if (contentRef.current) {
        contentRef.current.innerHTML = updatedContent;
      }

      setNote((prev) => ({
        ...prev,
        content: updatedContent,
      }));
    };

    reader.readAsDataURL(file);
    e.target.value = "";
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
        className="w-[750px] h-[500px] rounded-2xl p-8 shadow-xl"
      >
        <input
          placeholder="Title"
          value={note.title}
          className="w-full text-2xl font-semibold outline-none mb-5 bg-transparent"
          style={{
            color: getTextColor(note.bgColor),
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
            style={{ color: getTextColor(note.bgColor) }}
          >
            <Bold size={20} />
          </button>

          <button
            type="button"
            onClick={() => applyFormat("italic")}
            style={{ color: getTextColor(note.bgColor) }}
          >
            <Italic size={20} />
          </button>

          <label
            className="flex items-center gap-2 cursor-pointer"
            style={{ color: getTextColor(note.bgColor) }}
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
            <span style={{ color: getTextColor(note.bgColor) }}>Color</span>

            <input
              type="color"
              value={note.bgColor}
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
          className="note-content border border-gray-400 rounded-lg h-60 p-4 outline-none overflow-y-auto text-left align-top whitespace-pre-wrap"
          style={{
            color: getTextColor(note.bgColor),
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
            color: getTextColor(note.bgColor),
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
            className="px-2 font-medium hover:opacity-70 transition-opacity"
            style={{ color: getTextColor(note.bgColor) }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-2 font-medium hover:opacity-70 transition-opacity"
            style={{ color: getTextColor(note.bgColor) }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteModal;
