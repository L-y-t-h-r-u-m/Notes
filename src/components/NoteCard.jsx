import DOMPurify from "dompurify";
import  getTextColor  from "../utils/color";

function NoteCard({ note, onDelete, onEdit, actionType = "default", onRestore, onPermanentDelete }) {
  const textColor = getTextColor(note.bgColor);
  return (
    <>
    <div
      style={{ backgroundColor: note.bgColor, color: textColor }}
      className="w-72 min-h-[12rem] max-h-96 flex flex-col rounded-xl p-5 shadow-lg text-black relative transition-all hover:scale-[104%]"
      onClick={() => actionType!=="trash" && onEdit(note)}
    >
      <h2 className="font-bold text-xl mb-3 shrink-0">
        {note.title || "Untitled"}
      </h2>

      <div
        className="flex-grow overflow-y-auto prose prose-sm max-w-none mb-4 custom-scrollbar"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.content) }}
      />

      {/* Categories */}
      {note.category && note.category.length > 0 && (
        <div className="flex gap-2 mb-4 flex-wrap shrink-0">
          {note.category.map((cat, index) => (
            <span
              key={index}
              style={{
                backgroundColor:
                  textColor === "white"
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.1)",
              }}
              className="px-2 py-1 rounded text-xs font-medium"
            >
              {cat}
            </span>
          ))}
        </div>
      )}

      <div
        className="mt-auto flex justify-between items-center shrink-0 border-t pt-3"
        style={{
          borderColor:
            textColor === "white" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
        }}
      >
        {
        actionType=="trash"?
        (
        <>
        {/* Edit Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRestore(note._id);
          }}
          className="flex gap-1.5 items-center opacity-80 hover:opacity-100 transition-colors font-semibold text-sm"
        >
          Restore
        </button>

        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPermanentDelete(note._id);
          }}
          className="flex gap-1.5 items-center opacity-80 hover:opacity-100 transition-colors font-semibold text-sm"
        >
          Delete
        </button></> )
        :(
        <>
        {/* Edit Button */}
        <button
          onClick={() => onEdit(note)}
          className="flex gap-1.5 items-center opacity-80 hover:opacity-100 transition-colors font-semibold text-sm"
        >
          Edit
        </button>

        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note._id);
          }}
          className="flex gap-1.5 items-center opacity-80 hover:opacity-100 transition-colors font-semibold text-sm"
        >
          Delete
        </button></> )}
      </div>
    </div>
    </>
  );
}

export default NoteCard;
