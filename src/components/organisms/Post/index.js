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
import Grid from 'material-ui/Grid';

const Post = withRouter(({post, layout, handlers, classes, history}) => {
    const title = "Do you want to delete this post?";
    const body = "This action can't be undone. Deleting a post also deletes its comments";
    const primaryButtonText = "Delete";
    const secondaryButtonText = "Cancel";

    //TODO: Think on how we can put this on a constat and export it
    if (layout && layout == "LIST_ITEM") {
        return (
        <ListItem
            key={post.id}
            // className={classes.container}
            onClick={(e) => {e.stopPropagation(); history.push(`/${post.category}/${post.id}`)}}
        >
            <div className={classes.upVotePostWrapper}>
                <IconButton
                    onClick={(e) => {e.stopPropagation();handlers.votePost(post.id, "upVote")}}
                    aria-label="upvote">
                    <ThumbUpIcon style={{ fontSize: 40, color: 'green' }} />
                </IconButton>
                <div style={{ fontSize: '1.5em' }}>
                    {post.voteScore}
                </div>
                <IconButton
                    onClick={(e) => {e.stopPropagation();handlers.votePost(post.id, "downVote")}}
                    aria-label="downvote">
                    <ThumbDownIcon style={{ fontSize: 40, color: 'red' }} />
                </IconButton>
            </div>
            <Grid
                style={{ height: 100 }}
                container spacing={8}
            >
                <Grid item xs={12}>
                    <ListItemText secondary={post.category} />
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.postTitle}> {post.title} </div>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText secondary={'by ' + post.author + ' at ' + DateUtils.parseDatetime(post.timestamp)} />
                     {post.commentCount > 0 &&
                        <IconButton>
                            {post.commentCount}
                            <CommentIcon />
                        </IconButton>
                    }
                </Grid>
            </Grid>
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
<div>
        <div>
            <div className={classes.container}>
                <div className={classes.postHeaderVoteButtons}>
                    <div className={classes.upVotePostWrapper}>
                        <IconButton
                            onClick={(e) => {e.stopPropagation();handlers.votePost(post.id, "upVote")}}
                            aria-label="upvote">
                            <ThumbUpIcon style={{ fontSize: 40, color: 'green' }} />
                        </IconButton>
                        <div style={{ fontSize: '1.5em' }}>
                            {post.voteScore}
                        </div>
                        <IconButton
                            onClick={(e) => {e.stopPropagation();handlers.votePost(post.id, "downVote")}}
                            aria-label="downvote">
                            <ThumbDownIcon style={{ fontSize: 40, color: 'red' }} />
                        </IconButton>
                    </div>
                </div>
                <div className={classes.postHeaderTitle} >
                    <div className={classes.categoryText} >
                        <Chip label={post.category} />
                    </div>
                    <div style={{ fontSize: '3em' }} >{post.title}</div>
                    <div style={{ fontSize: '1.5em' }} >
                        {post.body}
                    </div>
                    <div className={classes.categoryText}>
                        {'by ' + post.author + ' at ' + DateUtils.parseDatetime(post.timestamp)}
                    </div>
                    <div className={classes.categoryText}>
                        {post.commentCount} comments
                    </div>
                </div>
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
            </div>
        </div>

</div>
    )
})


export default Post
