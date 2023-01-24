import React from 'react';
import {IComment} from "@/store/types/track";

interface CommentItemProps {
    comment: IComment
}

const CommentItem: React.FC<CommentItemProps> = ({comment}) => {

    return (
        <div>
            <div><b>{comment.username}</b></div>
            <div>{comment.text}</div>
        </div>
    );
};

export default CommentItem;