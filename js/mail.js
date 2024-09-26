$(document).ready(function () {
  $("#contactForm").validate({
    submitHandler: function (form) {
      var sLoader = $("#submit-loader");
      var submitButton = $(".submitform"); // Button class as specified in your HTML

      // Disable the submit button to prevent multiple submissions
      submitButton.prop("disabled", true);

      $.ajax({
        type: "POST",
        url: "https://elygolearning.com/portfolioSendEmail.php", // URL of the PHP script
        data: $(form).serialize(),
        beforeSend: function () {
          sLoader.fadeIn(); // Show loading animation
        },
        success: function (msg) {
          sLoader.fadeOut(); // Hide loading animation
          if (msg === "OK") {
            $("#message-warning").hide();
            $("#contactForm").fadeOut();
            $("#message-success").fadeIn();
          } else {
            $("#message-warning").html(msg);
            $("#message-warning").fadeIn();
          }
        },
        error: function () {
          sLoader.fadeOut(); // Hide loading animation
          $("#message-warning").html("Something went wrong. Please try again.");
          $("#message-warning").fadeIn();
        },
        complete: function () {
          // Re-enable the submit button
          submitButton.prop("disabled", false);
        },
      });
    },
  });
});
