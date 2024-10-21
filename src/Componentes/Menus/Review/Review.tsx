import { FormEvent, useContext, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalState';
import logo from "../../../assets/logo.png";
import './Review.css';

export default function Review() {
    const global = useContext(GlobalContext);

    const [review, setReview] = useState({
        name: "",
        rating: 0,
        comment: ""
    });

    const [btn, setBtn] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const closeBtn = () => {
        setIsClosing(true);
        setTimeout(() => {
            global?.changeMenuReview(false);
            setIsClosing(false);
        }, 500);
    };

    const postReview = async (event: FormEvent) => {
        event.preventDefault();
        setBtn(true);
        if (global?.isLog) setReview({ ...review, name: global.user.first_name + ' ' + global.user.last_name });
        const result = await global?.makeReview(review.comment, review.rating, review.name);
        if (result) {
            global?.alertStatus(true, "success", "Gracias por dejar tu reseña!");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            global?.alertStatus(true, "error", "Error al dejar reseña");
            setBtn(false);
        }
    };

    const handleReviewComment = (comment: string) => {
        setReview({ ...review, comment });
    };

    const handleReviewRating = (rating: number) => {
        setReview({ ...review, rating });
    };

    const handleReviewName = (name: string) => {
        setReview({ ...review, name });
    };

    return (
        <div className={`review-backdrop ${global?.MReview ? 'active' : ''} ${isClosing ? 'closing' : ''}`}>
            <div className="review-modal">
                <div className="review-header">
                    <img src={logo} alt="Logo" className="review-logo" />
                    <button onClick={closeBtn} className="review-close-btn">&times;</button>
                </div>
                <form onSubmit={postReview} className="review-form">
                    <h2>Deja tu Reseña!</h2>
                    {!global?.isLog && (
                        <div className="review-input-group">
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={review.name}
                                onChange={(e) => handleReviewName(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className="review-input-group">
                        <textarea
                            placeholder="Escribe tu comentario"
                            value={review.comment}
                            onChange={(e) => handleReviewComment(e.target.value)}
                            required
                        />
                    </div>
                    <div className="review-rating">
                        <p>¡Califícanos!</p>
                        <div className="star-container">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${review.rating >= star ? 'filled' : ''}`}
                                    onClick={() => handleReviewRating(star)}
                                    onMouseEnter={() => setReview({ ...review, rating: star })}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="review-submit-btn" disabled={btn}>
                        Dejar Reseña
                    </button>
                </form>
            </div>
        </div>
    );
}
