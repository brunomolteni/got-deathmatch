export function setupFacebookLogin(callback){
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=235062097012315&status=1";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
     window.fbAsyncInit = ()=>{
       FB.getLoginStatus(callback);
     }
  }

export function share(successCb){
  FB.ui(
   {
    method: 'share',
    href: 'http://gotdeathmatch.com'
  }, function(response){
    console.log(response);
    if(response && !Array.isArray(response) && !response.error_message){
      successCb();
    }
  });
}
