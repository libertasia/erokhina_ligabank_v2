import React from 'react';
import logoLogin from '../../img/logo-login.svg';
import sprite from '../../img/sprite.svg';
// import React, {useRef, useEffect, useState} from 'react';
// import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
// import {ActionCreator} from '../../store/action';
// import {Rating} from '../../const';

// const MOUSE_DOWN = `mousedown`;

// const RATINGS_COUNT = 5;

// const RADIX = 10;

// const ReviewField = {
//   NAME: `name`,
//   PROS: `pros`,
//   CONS: `cons`,
//   RATING: `rating`,
//   COMMENT: `comment`,
// };

// function useOnClick(ref, handler) {
//   useEffect(() => {
//     const listener = (event) => {
//       // Do nothing if clicking ref's element or descendent elements
//       if (!ref.current || ref.current.contains(event.target)) {
//         return;
//       }

//       handler(event);
//     };

//     document.addEventListener(MOUSE_DOWN, listener);

//     return () => {
//       document.removeEventListener(MOUSE_DOWN, listener);
//     };
//   }, []); // Empty array ensures that effect is only run on mount and unmount
// }

const LoginPopup = () => {

  // const {isVisible, handleClose, onReviewSubmit} = props;

  // const [review, setReview] = useState({
  //   name: ``,
  //   pros: ``,
  //   cons: ``,
  //   rating: Rating.THREE,
  //   comment: ``,
  // });

  // const [isNameMissing, setIsNameMissing] = useState(false);
  // const [isCommentMissing, setIsCommentMissing] = useState(false);

  // const setName = (evt) => {
  //   setReview({...review, name: evt.target.value});
  //   localStorage.setItem(ReviewField.NAME, evt.target.value);
  // };
  // const setPros = (evt) => {
  //   setReview({...review, pros: evt.target.value});
  //   localStorage.setItem(ReviewField.PROS, evt.target.value);
  // };
  // const setCons = (evt) => {
  //   setReview({...review, cons: evt.target.value});
  //   localStorage.setItem(ReviewField.CONS, evt.target.value);
  // };
  // const setRating = (evt) => {
  //   setReview({...review, rating: parseInt(evt.target.value, RADIX)});
  //   localStorage.setItem(ReviewField.RATING, evt.target.value);
  // };
  // const setComment = (evt) => {
  //   setReview({...review, comment: evt.target.value});
  //   localStorage.setItem(ReviewField.COMMENT, evt.target.value);
  // };

  // const ref = useRef();

  // const inputEl = useRef(null);

  // useOnClick(ref, () => handleClose(false));

  // useEffect(() => {
  //   inputEl.current.focus();
  //   const reviewName = localStorage.getItem(ReviewField.NAME);
  //   const pros = localStorage.getItem(ReviewField.PROS);
  //   const cons = localStorage.getItem(ReviewField.CONS);
  //   const savedRating = localStorage.getItem(ReviewField.RATING);
  //   const rating = savedRating ? parseInt(localStorage.getItem(ReviewField.RATING), 10) : Rating.THREE;

  //   const comment = localStorage.getItem(ReviewField.COMMENT);
  //   setReview({
  //     ...review,
  //     name: reviewName !== null ? reviewName : ``,
  //     pros: pros !== null ? pros : ``,
  //     cons: cons !== null ? cons : ``,
  //     rating: rating !== null ? rating : Rating.THREE,
  //     comment: comment !== null ? comment : ``,
  //   });
  // }, []);

  // const hiddenClassName = isVisible ? `reviews__form-wrapper--display-block` : `reviews__form-wrapper--display-none`;

  // const hiddenNameClassName = isNameMissing ? `` : `visually-hidden`;

  // const hiddenCommentClassName = isCommentMissing ? `` : `visually-hidden`;

  // const requiredInputClassName = `add-review-form__input--required`;
  // const nameRequiredClassName = review.name === `` ? requiredInputClassName : ``;
  // const commentRequiredClassName = review.comment === `` ? requiredInputClassName : ``;

  // const ratingValues = Array.from({length: RATINGS_COUNT}, (_, i) => i + 1);

  // const handleFormSubmit = (evt) => {
  //   evt.preventDefault();
  //   let hasError = false;
  //   if (!review.name || !review.name.trim()) {
  //     setIsNameMissing(true);
  //     hasError = true;
  //   } else {
  //     setIsNameMissing(false);
  //   }
  //   if (!review.comment || !review.comment.trim()) {
  //     setIsCommentMissing(true);
  //     hasError = true;
  //   } else {
  //     setIsCommentMissing(false);
  //   }
  //   if (hasError) {
  //     return;
  //   }
  //   onReviewSubmit(review);
  //   handleClose();
  // };

  return (
    <div className="popup-wrapper">
      <section className="popup-wrapper__section login-popup">
        <h2 className="visually-hidden">Вход в интернет-банк</h2>
        <div className="login-popup__header">
          <a className="login-popup__logo" href="#">
            <img className="login-popup__image" src={logoLogin} width={150} height={27} alt="Логотип Лига Банк»" />
          </a>
          <button className="login-popup__btn-close" type="button">
            <span className="visually-hidden">Закрыть попап</span>
            <svg width={16} height={16}>
              <use href={sprite + `#popup-close`} />
            </svg>
          </button>
        </div>

        <form className="login-popup__form" action="#" method="post">
          <div className="login-popup__form-field">
            <label className="login-popup__form-label" htmlFor="user-email">Логин</label>
            <input className="login-popup__form-input" type="email" id="user-email" name="user-email"/>
          </div>
          <div className="login-popup__form-field login-popup__form-field--password">
            <label className="login-popup__form-label" htmlFor="user-password">Пароль</label>
            <input className="login-popup__form-input" type="password" id="user-password" name="user-password"/>
            <button className="login-popup__show-password-btn" type="button">
              <span className="visually-hidden">Показать пароль</span>
              <svg width={22} height={12}>
                <use href={sprite + `#password-show`} />
              </svg>
            </button>
          </div>
          <a className="login-popup__password-link" href="#">Забыли пароль?</a>
          <button className="login-popup__submit-btn" type="submit">Войти</button>
        </form>
      </section>
    </div>
    // <React.Fragment>
    //   <div className={`reviews__form-wrapper ${hiddenClassName}`}>
    //     <form ref={ref} className="reviews__form add-review-form" action="#" method="post" onSubmit={handleFormSubmit}>
    //       <h2 className="add-review-form__title">Оставить отзыв</h2>
    //       <div className="add-review-form__fields-wrapper">
    //         <div className="add-review-form__section add-review-form__section--first">
    //           <div className="add-review-form__field add-review-form__field--required">
    //             <span className={`add-review-form__text ${hiddenNameClassName}`}>Пожалуйста, заполните поле</span>
    //             <input className={`add-review-form__input ${nameRequiredClassName}`} type="text" placeholder="Имя" name="user-name" id="user-name" autoFocus={true} ref={inputEl} onChange={setName} value={review.name}/>
    //             <label className="add-review-form__label visually-hidden" htmlFor="user-name" >Имя</label>
    //           </div>
    //           <div className="add-review-form__field">
    //             <input className="add-review-form__input" type="text" placeholder="Достоинства" name="advantages" id="advantages" onChange={setPros} value={review.pros}/>
    //             <label className="add-review-form__label visually-hidden" htmlFor="advantages" >Достоинства</label>
    //           </div>
    //           <div className="add-review-form__field">
    //             <input className="add-review-form__input" type="text" placeholder="Недостатки" name="disadvantages" id="disadvantages" onChange={setCons} value={review.cons}/>
    //             <label className="add-review-form__label visually-hidden" htmlFor="disadvantages" >Недостатки</label>
    //           </div>
    //         </div>

  //         <div className="add-review-form__section">
  //           <div className="add-review-form__rating-stars" onChange={setRating}>
  //             <p className="add-review-form__rating-text">Оцените товар:</p>
  //             <div className="add-review-form__rating-wrapper">
  //               {
  //                 ratingValues.slice(0).reverse().map((value) => (
  //                   <React.Fragment key={`star-${value}`}>
  //                     <input className="add-review-form__rating-input visually-hidden" tabIndex="0" id={`star-${value}`} type="radio" name="rating" value={value} defaultChecked={value === review.rating}/>
  //                     <label className="add-review-form__rating-label" htmlFor={`star-${value}`}>Rating {value}</label>
  //                   </React.Fragment>
  //                 ))
  //               }
  //             </div>
  //           </div>
  //           <div className="add-review-form__comment">
  //             <span className={`add-review-form__text ${hiddenCommentClassName}`}>Пожалуйста, заполните поле</span>
  //             <textarea className={`add-review-form__textarea ${commentRequiredClassName}`} name="review-text" id="review-text" placeholder="Комментарий" onChange={setComment} value={review.comment}/>
  //           </div>
  //         </div>
  //       </div>

  //       <button className="add-review-form__btn-submit" type="submit">Оставить отзыв</button>
  //       <button className="add-review-form__btn-close" type="button" aria-label="Закрыть попап" onClick={handleClose}>
  //         <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  //           <path d="M13.6399 15.0096L7.50482 8.86495L1.36977 15.0096L0 13.6399L6.14469 7.50482L0 1.36978L1.36977 0L7.50482 6.14469L13.6399 0.00964652L15 1.36978L8.86495 7.50482L15 13.6399L13.6399 15.0096Z" fill="#9F9E9E"/>
  //         </svg>
  //       </button>
  //     </form>
  //   </div>
  // </React.Fragment>
  );
};

// AddReviewForm.propTypes = {
//   isVisible: PropTypes.bool.isRequired,
//   handleClose: PropTypes.func.isRequired,
//   onReviewSubmit: PropTypes.func.isRequired,
// };


// const mapDispatchToProps = (dispatch) => ({
//   onReviewSubmit(review) {
//     dispatch(ActionCreator.addReview(review));
//   },
// });

export default LoginPopup;
// export {LoginPopup};
// export default connect(null, mapDispatchToProps)(LoginPopup);
