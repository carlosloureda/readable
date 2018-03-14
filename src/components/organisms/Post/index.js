import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { ConfirmModal } from 'components'
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ThumbDownIcon from 'material-ui-icons/ThumbDown';
import CommentIcon from 'material-ui-icons/Comment';
import { ListItem, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import { DateUtils } from '../../../utils/utils';

// import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';


const Post = withRouter(({post, layout, handlers, history}) => {
    const title = "Do you want to delete this post?";
    const body = "This action can't be undone. Deleting a post also deletes its comments";
    const primaryButtonText = "Delete";
    const secondaryButtonText = "Cancel";

    //TODO: Think on how we can put this on a constat and export it
    if (layout && layout == "LIST_ITEM") {
        return (<ListItem key={post.id} onClick={(e) => {e.stopPropagation(); history.push(`/post/${post.id}`)}}>
            <IconButton
                onClick={(e) => {e.stopPropagation();handlers.votePost(post.id, "upVote")}}
                aria-label="upvote">
                <ThumbUpIcon />
            </IconButton>
            <span>{post.voteScore}</span>
            <IconButton
                onClick={(e) => {e.stopPropagation();handlers.votePost(post.id, "downVote")}}
                aria-label="downvote">
                <ThumbDownIcon />
            </IconButton>
            <ListItemText primary={post.author} secondary={DateUtils.parseDatetime(post.timestamp)} />
            <ListItemText primary={post.title} />
            <ListItemText secondary={post.category} />
            {post.commentCount > 0 &&
                <IconButton>
                    <CommentIcon />
                    {post.commentCount}
                </IconButton>
            }
            {/* TODO: Maybe we can use names instead of the url */}
            <Button
                onClick={(e) => {e.stopPropagation(); history.push(`/post/edit/${post.id}`)}}
                variant="raised" color="primary" className={null}>
                Edit
            </Button>
            <ConfirmModal
                title = {title}
                body = {body}
                primaryButtonText = {primaryButtonText}
                secondaryButtonText = {secondaryButtonText}
                onPrimaryAction={handlers.removePost}
                />
        </ListItem>)
    }
    return (
        <Card >
            <div>
                <Chip label={post.category} />
            </div>
            <div >
                <CardContent >
                    <Typography variant="subheading" color="textSecondary">
                        by {post.author},  at {DateUtils.parseDatetime(post.timestamp)}
                        {/* <ListItemText primary={post.author} secondary={DateUtils.parseDatetime(post.timestamp)} /> */}
                    </Typography>
                    <Typography variant="subheading" color="textSecondary">
                        {post.title}
                    </Typography>
                    <Divider />
                    <Typography variant="headline">{post.body}</Typography>
                </CardContent>
                <div >
                    <IconButton
                        onClick={() => handlers.votePost(post.id, "upVote")}
                        aria-label="upvote">
                        <ThumbUpIcon />
                    </IconButton>
                    <span>{post.voteScore}</span>
                    <IconButton
                        onClick={() => handlers.votePost(post.id, "downVote")}
                        aria-label="downvote">
                        <ThumbDownIcon />
                    </IconButton>
                </div>
            </div>
            {/* <CardMedia
                image="/static/images/cropped-frog.jpg"
                title="Live from space album cover"
            /> */}
                {post.commentCount > 0 &&
                <IconButton>
                    {post.commentCount}
                    <CommentIcon />
                </IconButton>
            }
            <div>
                {/* TODO: Maybe we can use names instead of the url */}
                <Button
                    onClick={(e) => {e.stopPropagation(); history.push(`/post/edit/${post.id}`)}}
                    variant="raised" color="primary" className={null}>
                    Edit
                </Button>
                <ConfirmModal
                    title = {title}
                    body = {body}
                    primaryButtonText = {primaryButtonText}
                    secondaryButtonText = {secondaryButtonText}
                    onPrimaryAction={handlers.removePost}
                />
            </div>
        </Card>
    )
})


export default Post
