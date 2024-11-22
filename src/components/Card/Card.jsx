import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import { updateCard, deleteCard } from "../../store/boardSlice";
import CardModal from "../CardModal/CardModal";

function Card({ card, index, listId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateCard = (updates) => {
    dispatch(updateCard({ listId, cardId: card.id, updates }));
    toast.success("Card updated successfully!");
  };

  const handleDeleteCard = () => {
    dispatch(deleteCard({ listId, cardId: card.id }));
    toast.success("Card deleted successfully!");
    setIsModalOpen(false);
  };

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-white p-3 rounded shadow-sm mb-2 cursor-pointer"
            onClick={handleCardClick}
          >
            <h4 className="font-medium">{card.title}</h4>
          </div>
        )}
      </Draggable>
      {isModalOpen && (
        <CardModal
          card={card}
          onClose={handleCloseModal}
          onUpdate={handleUpdateCard}
          onDelete={handleDeleteCard}
        />
      )}
    </>
  );
}

export default Card;
