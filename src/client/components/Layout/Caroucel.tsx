import ArrowBackIosIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowForwardIosIcon from "@mui/icons-material/KeyboardArrowRight";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

// Define the type for the card object
interface Card {
    title: string;
    description: string;
    imageUrl: string;
}

interface CardCarouselProps {
    cards: Card[];
    title: string;
    maxCardsToShow: number;
}

// Explicitly type the style objects
const defaultCardStyles: React.CSSProperties = {
    margin: "8px",
    borderRadius: "15px",
    width: "100%",
    height: "auto",
    position: "relative",
    maxWidth: "lg",
};

const styles = {
    carouselWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    } as React.CSSProperties,
    cardCarousel: {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        marginBottom: "20px",
        maxWidth: "80vw", // Adjust as needed to fit the viewport
    } as React.CSSProperties,
    cardContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        maxWidth: "100%",
    } as React.CSSProperties,
    buttonStyles: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        zIndex: 1,
    } as React.CSSProperties,
};

const CardCarousel: React.FC<CardCarouselProps> = ({ cards, title, maxCardsToShow }) => {
    const [startIndex, setStartIndex] = useState<number>(0);

    const nextCard = () => {
        const nextIndex = startIndex + 1 >= cards.length - maxCardsToShow ? 0 : startIndex + 1;
        setStartIndex(nextIndex);
    };

    const prevCard = () => {
        const prevIndex = startIndex === 0 ? cards.length - maxCardsToShow : startIndex - 1;
        setStartIndex(prevIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextCard();
        }, 5000); // Advance every 5 seconds

        return () => clearInterval(interval);
    }, [startIndex, cards.length, maxCardsToShow]);

    return (
        <div style={styles.cardCarousel}>
            <div style={styles.cardContainer}>
                {cards.slice(startIndex, startIndex + maxCardsToShow).map((card, index) => (
                    <div key={index} className="active" style={defaultCardStyles}>
                        <img src={card.imageUrl} alt={card.title} style={defaultCardStyles} />
                    </div>
                ))}
                <Button style={{ ...styles.buttonStyles, left: "0" }} onClick={prevCard}>
                    <ArrowBackIosIcon />
                </Button>
                <Button
                    style={{ ...styles.buttonStyles, right: "0" }}
                    onClick={nextCard}
                    disabled={startIndex + maxCardsToShow >= cards.length}
                >
                    <ArrowForwardIosIcon />
                </Button>
            </div>
        </div>
    );
};


const cards: Card[] = [
    {
        title: "Card 1",
        description: "Description for Card 1",
        imageUrl: "https://bellissimo.uz/_next/image?url=https%3A%2F%2Fio.bellissimo.uz%2Fimages%2Fa95649d2-ee7e-4606-a65e-262015e5b1c6_uz.jpg&w=1920&q=75",
    },
    {
        title: "Card 2",
        description: "Description for Card 2",
        imageUrl: "https://bellissimo.uz/_next/image?url=https%3A%2F%2Fio.bellissimo.uz%2Fimages%2Fa7b348ce-343a-4127-889b-583edd12b213_uz.jpg&w=1920&q=75",
    },
    {
        title: "Card 3",
        description: "Description for Card 3",
        imageUrl: "https://bellissimo.uz/_next/image?url=https%3A%2F%2Fio.bellissimo.uz%2Fimages%2Fdb9ec296-5c11-474a-a79e-57ed2debd2f2_uz.jpg&w=1920&q=75",
    },
    {
        title: "Card 4",
        description: "Description for Card 4",
        imageUrl: "https://bellissimo.uz/_next/image?url=https%3A%2F%2Fio.bellissimo.uz%2Fimages%2Fabdf7424-78c1-461e-a964-de97befabb53_uz.jpg&w=1920&q=75",
    },
];

const Carousel: React.FC = () => {
    return (
        <div style={styles.carouselWrapper}>
            <CardCarousel cards={cards} title="Cards" maxCardsToShow={1} />
        </div>
    );
};

export default Carousel;
