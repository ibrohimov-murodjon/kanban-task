import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import { MoreVertical, X, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { addCard, updateListTitle, deleteList } from "../../store/boardSlice";
import Card from "../Card/Card";

function List({ list }) {
  const [newCardTitle, setNewCardTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [listTitle, setListTitle] = useState(list.title);
  const [showListActions, setShowListActions] = useState(false);
  const dispatch = useDispatch();
  const addCardRef = useRef(null);
  const listActionsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (addCardRef.current && !addCardRef.current.contains(event.target)) {
        setIsAddingCard(false);
        setNewCardTitle("");
      }
      if (
        listActionsRef.current &&
        !listActionsRef.current.contains(event.target)
      ) {
        setShowListActions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      dispatch(
        addCard({
          listId: list.id,
          card: {
            id: `card-${Date.now()}`,
            title: newCardTitle,
            description: "",
          },
        })
      );
      toast.success("Card added successfully!");
      setNewCardTitle("");
      setIsAddingCard(false);
    }
  };

  const handleUpdateListTitle = () => {
    if (!listTitle.trim()) {
      toast.error("List name cannot be empty!");
      setListTitle(list.title);
      setIsEditing(false);
      return;
    }
    dispatch(updateListTitle({ listId: list.id, title: listTitle }));
    toast.success("List name updated successfully!");
    setIsEditing(false);
  };

  const handleDeleteList = () => {
    dispatch(deleteList({ listId: list.id }));
    toast.success("List deleted successfully!");
    setShowListActions(false);
  };

  return (
    <Droppable droppableId={list.id.toString()}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="bg-gray-200 p-4 rounded-lg shadow-md w-72 mr-4 flex-shrink-0 max-h-[calc(100vh-100px)] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-2">
            {isEditing ? (
              <input
                type="text"
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                onBlur={handleUpdateListTitle}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleUpdateListTitle();
                  }
                }}
                className="w-full p-2 rounded"
                autoFocus
              />
            ) : (
              <h3
                className="text-lg font-semibold cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                {list.title}
              </h3>
            )}
            <div className="relative" ref={listActionsRef}>
              <button
                onClick={() => setShowListActions(!showListActions)}
                className="p-1 hover:bg-gray-300 rounded"
              >
                <MoreVertical size={20} />
              </button>
              {showListActions && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    <button
                      onClick={handleDeleteList}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Delete List
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2 mb-2">
            {list.cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} listId={list.id} />
            ))}
          </div>
          {provided.placeholder}
          <div ref={addCardRef}>
            {isAddingCard ? (
              <div className="mt-2 space-y-2">
                <input
                  type="text"
                  placeholder="Enter a card title..."
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  className="w-full p-2 rounded"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddCard}
                    className="bg-blue-500 text-[14px] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Add Card
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingCard(false);
                      setNewCardTitle("");
                    }}
                    className="text-gray-600 hover:text-gray-800 py-2 px-4"
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingCard(true)}
                className="text-gray-600 flex items-center gap-2 hover:bg-gray-300 w-full rounded p-2 text-left mt-2"
              >
                <Plus size={16} /> <span>Add another card</span>
              </button>
            )}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default List;
