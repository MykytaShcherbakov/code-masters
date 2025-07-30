import React from 'react';

function DescriptionBlock({ descToShow, isLongDesc, showFullDesc, setShowFullDesc, blockClass }) {
  return (
    <div className={`product-description-block ${blockClass}`}>
      <h4 className="product-description-title">Description</h4>
      <p className="product-description">
        {descToShow}
        {isLongDesc && !showFullDesc && (
          <button className="read-more-btn" onClick={() => setShowFullDesc(true)}>
            Read more
          </button>
        )}
      </p>
    </div>
  );
}

export default DescriptionBlock;