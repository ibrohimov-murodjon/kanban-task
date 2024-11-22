import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { moveCard, addList } from "../../store/boardSlice";
import List from "../List/List";
import { Plus } from "lucide-react";

function Board() {
  const lists = useSelector((state) => state.board.lists);
  const dispatch = useDispatch();
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    dispatch(
      moveCard({
        fromListId: source.droppableId,
        toListId: destination.droppableId,
        cardId: draggableId,
      })
    );
  };

  const handleAddList = () => {
    if (newListTitle.trim()) {
      dispatch(
        addList({
          id: `list-${Date.now()}`,
          title: newListTitle,
          cards: [],
        })
      );
      setNewListTitle("");
      setIsAddingList(false);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex p-4 overflow-x-auto">
        {lists.map((list) => (
          <List key={list.id} list={list} />
        ))}
        <div className="flex-shrink-0">
          {isAddingList ? (
            <div className="bg-white p-2 rounded-lg shadow-md w-72">
              <input
                type="text"
                placeholder="Enter a list title..."
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddList}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Add list
                </button>
                <button
                  onClick={() => {
                    setIsAddingList(false);
                    setNewListTitle("");
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingList(true)}
              className="bg-white/20 flex items-center justify-center gap-2 hover:bg-white/30 text-white px-4 py-2 rounded w-72"
            >
              <Plus size={16} /> <span>Add another list</span>
            </button>
          )}
        </div>
      </div>
    </DragDropContext>
  );
}

export default Board;
