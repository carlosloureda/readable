
import React from 'react'
import { Comment, CommentForm } from 'components'
import { Link } from 'react-router-dom'
import { getUUIC } from '../../../utils/api'
import { connect } from 'react-redux'
import { addComment, editComment } from '../../../actions/index';

class CommentFormContainer extends React.Component {

    constructor (props) {
        super(props)
        // Edit form
        if (props.comment) {
            this.state = {
                comment: {
                    id: props.comment.id,
                    author: props.comment.author,
                    body: props.comment.body
                },
                validation: {
                    author: false,
                    body: false
                }
            }
        } else {
            this.state = {
                comment: {
                    author: '',
                    body: ''
                },
                validation: {
                    author: false,
                    body: false
                }
            }
        }
    }

    handleChange = (event) => {
        const target = event.target;
        this.setState({
            ...this.state,
            comment: {
                ...this.state.comment,
                [target.name]: target.value
            },
                validation: {
                ...this.state.validation,
                [target.name]: target.value == ''
            }
        });
    }

    addComment = () => {
        const comment = {
            ...this.state.comment,
            id: getUUIC(),
            timestamp: Date.now(),
            parentId: this.props.parentId
        }
        if (! this.validateForm() ) return;
        this.props.addComment(comment).then(() => {
            if (this.props.addCommentCallback) {
                this.props.addCommentCallback();
            }
        })
    }

    editComment = () => {
        const payload = {
            author: this.state.comment.author,
            body: this.state.comment.body
        }
        if (! this.validateForm() ) return;
        this.props.editComment(this.state.comment.id, payload).then(() => {
            this.props.onCancelEdition();
        })
    }

    validateForm = () => {
        if (this.state.comment.author != "" && this.state.comment.body != ""){
          return true;
        } else {
          this.setState({
            ...this.state,
            validation: {
              author: this.state.comment.author == "",
              body: this.state.comment.body == ""
            }
          })
          return false;
        }
    }

    render() {
        const handlers = {
            handleChange: this.handleChange,
            addComment: this.addComment,
            editComment: this.editComment,
            onCancelEdition: this.props.onCancelEdition
        }
        return (
            <CommentForm
                comment={this.state.comment}
                validation={this.state.validation}
                handlers={handlers}
            ></CommentForm>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps (dispatch) {
    return {
        addComment: (comment) => dispatch(addComment(comment)),
        editComment: (id, payload) => dispatch(editComment(id, payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentFormContainer)
