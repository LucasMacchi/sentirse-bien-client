import { FormEvent, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../Context/GlobalState';
import './Review.css';

export default function Review() {
    const global = useContext(GlobalContext);
    const [name, setName] = useState("");
    const [review, setReview] = useState({
        nombre: "",
        rating: 0,
        comment: ""
    });
    const [btn, setBtn] = useState(false);

    useEffect(() => {
        if (global?.user) {
            setName(global.user.first_name + ' ' + global.user.last_name);
        }
    }, [global?.isLog]);

    const postReview = async (event: FormEvent) => {
        event.preventDefault();
        setBtn(true);
        if (global?.isLog) setReview({ ...review, nombre: name ? name : "Anonimo" });
        const result = await global?.makeReview(review.comment, review.rating, review.nombre);
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
        setReview({ ...review, nombre: name });
    };

    return (
        <div className={`review-backdrop ${global?.MReview ? 'active' : ''}`}>
            <div className="review-modal">
                <form onSubmit={postReview} className="review-form">
                    <h2>Deja tu Reseña!</h2>
                    {!global?.isLog && (
                        <div className="review-input-group">
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={review.nombre}
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
