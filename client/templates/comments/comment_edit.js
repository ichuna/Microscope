Template.commentEdit.onCreated(function() {
    Session.set('commentEditErrors', {});
});

Template.commentEdit.helpers({
    errorMessage: function(field) {
        return Session.get('commentEditErrors')[field];
    },
    errorClass: function(field) {
        return !!Session.get('commentEditErrors')[field] ? 'has-error' : '';
    }
});

Template.commentEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentCommentId = this._id;

        var commentProperties = {
            body: $(e.target).find('[name=body]').val(),
            zy: $(e.target).find('[name=zy]').val()
        }

        var errors = validateComment(commentProperties);
        if (errors.body || errors.zy)
            return Session.set('commentEditErrors', errors);

        Comments.update(currentCommentId, { $set: commentProperties }, function(error) {
            if (error) {
                // display the error to the user
                throwError(error.reason);
            } else {

                var comment = Comments.findOne({ id: this._id });
                Router.go('postPage', { _id: comment.postId });
            }
        });
    },

    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Delete this comment?")) {
            var currentCommentId = this._id;
      
            Comments.remove(currentCommentId);
            Router.go('home');
        }
    }
});
