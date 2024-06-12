import React, {useState} from "react";
import {styled} from "styled-components";

const ShowMore = styled.div`
  position: relative;

  & p {
    margin: 0;
  }

  & button {
    background-color: transparent;
    border: none;
    color: blue;
    cursor: pointer;
    padding: 0;
    font-size: 16px;
  }
`;

const ShowMoreText = ({text, maxLength}: { text: string; maxLength: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const getDisplayText = () => {
        if (isExpanded || text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };

    return (
        <ShowMore>
            <p>{getDisplayText()}</p>
            {text.length > maxLength && (
                <button onClick={toggleExpand}>
                    {isExpanded ? 'Show Less' : 'Show More'}
                </button>
            )}
        </ShowMore>
    );
};

export default ShowMoreText;
