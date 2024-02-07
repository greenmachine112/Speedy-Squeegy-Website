function sendMail(){
    var params = {
        to_name: document.getElementById("to_name").value ,
        email: document.getElementById("email").value ,
        message: document.getElementById("message"). value
    };

    const serviceID = "quote-email"; 
    const templateID = "quote-template1";

    emailjs.send(serviceID,templateID,params)
    .then( 
        res => {
            document.getElementById("to_name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            document.getElementById("phone").value = "";
            console.log(res); 
            alert("Your quote is in your inbox.");
        })

    .catch(err=> console.log(err))
}