import React from 'react';
import { useAppSelector } from '../../../../../hooks/redux-hooks';
import AddReviews from './AddReviews/AddReviews';

interface Review {
  email: string;
  text: string;
  advantages?: string;
  disadvantages?: string;
}

const Reviews = () => {
  const item = useAppSelector((state) => state.item.selectedItem);
  const userEmail = useAppSelector((state) =>state.user.email);

  if (!item) {
    return <div>Loading</div>;
  }
  if (!item.reviews) {
    return (
      <div className='review-warning'>
        No reviews...
        {/* {userEmail ? (
          <AddReviews />
        ) : (
          <div className='review-warning'>Please log in to leave a review.</div>
        )} */}
      </div>
    );
  }

  const firstFourReviews = item.reviews.slice(0, 4);

  return (
    <section className='review-section'>
      <h3>Reviews</h3>
      <ul>
        {firstFourReviews.map((review: Review, index: number) => (
          <li
            className='review' 
            key={index}>
            <p> {review.email}<br /></p>
            <p>{review.text}<br /></p>
            {review.advantages && (
              <p>
                <strong>Advantages:</strong> {review.advantages}<br />
              </p>
            )}
            {review.disadvantages && (
              <p>
                <strong>Disadvantages:</strong> {review.disadvantages}<br />
              </p>
            )}
          </li>
        ))}
      </ul>
      {userEmail ? (
          <AddReviews />
        ) : (
          <div className='review-warning'>Please log in to leave a review.</div>
       )}
    </section>
  );
};

export default Reviews;
