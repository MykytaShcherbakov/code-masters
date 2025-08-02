import React from 'react';
import { IoMdHeart } from 'react-icons/io';
import './FavoriteButton.scss';

export default function FavoriteButton({ isFavorite, onClick }) {
  return (
    <button
      className={`favorite-btn${isFavorite ? ' active' : ''}`}
      onClick={onClick}
    >
      <IoMdHeart className={`heart-icon${isFavorite ? ' active' : ''}`} />
    </button>
  );
}