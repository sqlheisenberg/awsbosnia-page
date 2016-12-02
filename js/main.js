$(document).ready(function() {
  $("#reqForm").submit(function() {
    $('input[type="submit"]').prop('disabled', true);
    var pl = {
      email: $("#emailField").val()
    };
    $.ajax({
      type: "POST",
      url: "https://956uxyx6ej.execute-api.ap-northeast-1.amazonaws.com/prod/slack",
      data: JSON.stringify(pl),
      contentType: "application/json",
      dataType: "json",
      crossDomain: true,
      headers: {
        'x-api-key': "kMupZ06nx12GSGSM36Hpc7e984bHBvBDwAlAIWY7"
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
      $('.result').text('Invitation was failed')
          .removeClass("succeed")
          .addClass("error");
    }).always(function() {
      $('input[type="submit"]').prop('disabled', false);
    });
    return false;
  });
});
