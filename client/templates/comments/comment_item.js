Template.commentItem.helpers({
  submittedText: function() {
    return this.submitted.toString();
  }
});

Template.commentItem.events({
      'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Delete this comment?" + this._id)) {
            var currentCommentId = this._id;

            var comment = Comments.find({ id: this._id });
            var postId= comment.postId;

            
      
            //Comments.remove(currentCommentId);
            Router.go('postPage', { _id: postId});
            //Router.go('home');

        }
    }
});
