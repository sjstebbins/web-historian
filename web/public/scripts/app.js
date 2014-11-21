$(document).ready(function(){
  $('form').on('submit',function(event){
    event.preventDefault();
    console.log('submitting form');
    $.ajax({
      type: "POST",
      url: 'http://127.0.0.1:8080/',
      data: JSON.stringify($( "input:first" ).val()),
      dataType: 'application/json'
    })
    .done(function(data) {
      debugger;
    })
  });

});
