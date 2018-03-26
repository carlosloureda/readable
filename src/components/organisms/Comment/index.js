import React from 'react'
import { Link} from 'react-router-dom'
import { ConfirmModal } from 'components'
import { ListItem, ListItemText } from 'material-ui/List';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ThumbDownIcon from 'material-ui-icons/ThumbDown';
import Typography from 'material-ui/Typography';
import { DateUtils } from '../../../utils/utils';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

const Comment = ({comment, handlers, layout}) => {
  const title = "Do you want to delete this comment?";
  const body = "This action can't be undone.";
  const primaryButtonText = "Delete";
  const secondaryButtonText = "Cancel";
  const showEditComment = (comment && comment.id) ? true : false;
  return (<ListItem key={comment.id}>
      <div>
        <IconButton
            onClick={() => handlers.voteComment(comment.id, "upVote")}
            aria-label="upvote">
            <ThumbUpIcon />
        </IconButton>
        <span>{comment.voteScore}</span>
        <IconButton
            onClick={() => handlers.voteComment(comment.id, "downVote")}
            aria-label="downvote">
            <ThumbDownIcon />
        </IconButton>
      </div>
      <div>
        <Typography variant="headline">{comment.body}</Typography>
        <Typography variant="subheading" color="textSecondary">
          by {comment.author},  at {DateUtils.parseDatetime(comment.timestamp)}
        </Typography>
      </div>
      <IconButton
          onClick={handlers.toggleEditMode}
          aria-label="Edit" color="primary"
        >
          <ModeEditIcon />
        </IconButton>
      <ConfirmModal
        title = {title}
        body = {body}
        layout="MINIMAL_BUTTONS"
        primaryButtonText = {primaryButtonText}
        secondaryButtonText = {secondaryButtonText}
        onPrimaryAction={handlers.removeComment}
        />
    </ListItem>
  )
}

export default Comment
