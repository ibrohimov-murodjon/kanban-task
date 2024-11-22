import React, { useState } from "react";
import { Trash, Tag, Check, Pencil } from "lucide-react";

function CardModal({ card, onClose, onUpdate, onDelete }) {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(card.description || "");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(card.title);

  const handleSaveDescription = () => {
    onUpdate({ description });
    setIsEditingDescription(false);
  };

  const handleSaveTitle = () => {
    onUpdate({ title });
    setIsEditingTitle(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-lg shadow-xl z-50">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex-1">
            {isEditingTitle ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleSaveTitle}
                className="w-full text-xl font-semibold px-2 py-1 border rounded"
                autoFocus
              />
            ) : (
              <h2
                className="text-xl font-semibold cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                onClick={() => setIsEditingTitle(true)}
              >
                {title}
              </h2>
            )}
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex">
          {/* Left side */}
          <div className="flex-1 pr-8">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Description
              </h3>
              <div className="group relative">
                {isEditingDescription ? (
                  <div>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2 border rounded-lg min-h-[100px]"
                      placeholder="Add a more detailed description..."
                      autoFocus
                    />
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={handleSaveDescription}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingDescription(false);
                          setDescription(card.description || "");
                        }}
                        className="px-3 py-1.5 text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="min-h-[100px] p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => setIsEditingDescription(true)}
                  >
                    <div className="flex items-start gap-2">
                      <p className="flex-1 text-gray-700">
                        {description || "Add a more detailed description..."}
                      </p>
                      <button className="flex items-center gap-2 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-700">
                        <Pencil size={18} /> <span>Edit</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="w-48">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                ADD TO CARD
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2">
                  <Tag size={20} /> Label
                </button>
                <button className="w-full text-left px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2">
                  <Check size={20} /> CheckList
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                ACTIONS
              </h3>
              <button
                onClick={onDelete}
                className="w-full text-left px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2"
              >
                <Trash size={20} /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardModal;
