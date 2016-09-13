Template.commentSubmit.onCreated(function() {
  Session.set('commentSubmitErrors', {});
});

Template.commentSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('commentSubmitErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('commentSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.commentSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
    var $zy = $(e.target).find('[name=zy]');
    var comment = {
      body: $body.val(),
      zy: $zy.val(),
      postId: template.data._id
    };

    var errors = {};
    if (!comment.body) {
      errors.body = "Please write some content";
      return Session.set('commentSubmitErrors', errors);
    }
    if (!comment.zy) {
      errors.zy = "Please write some content for zy";
      return Session.set('commentSubmitErrors', errors);
    }

    Meteor.call('commentInsert', comment, function(error, commentId) {
      if (error) {
        throwError(error.reason);
      } else {
        $body.val('');
        $zy.val('');

      }
    });
  }
});
