$(document).ready(function() {
  $("#reqForm").submit(function() {
    $('input[type="submit"]').prop('disabled', true);
    var pl = {
      email: $("#emailField").val()
    };
    $.ajax({
      type: "POST",
      url: "https://552scvp8h6.execute-api.us-east-1.amazonaws.com/prod/slack",
      data: JSON.stringify(pl),
      contentType: "application/json",
      dataType: "json",
      crossDomain: true,
      headers: {
        'x-api-key': "4gZxNJrIPG46QdDftGEzgVLIatr10oR5MKzxdHOd"
      }
    }).done(function(data) {
      if (data.result) {
        $('.result').text('Your invitation was sent!')
          .removeClass("error")
          .addClass("succeed");
      } else {
        if (data.error == 'already_invited') {
          $('.result').text('Already sent!')
            .removeClass("succeed")
            .addClass("error");
        } else {
          $('.result').text(data.error)
            .removeClass("succeed")
            .addClass("error");
        }
      }
    }).fail(function(data) {
      $('.result').text('Invitation has failed!')
          .removeClass("succeed")
          .addClass("error");
    }).always(function() {
      $('input[type="submit"]').prop('disabled', false);
    });
    return false;
  });
});
