
let req = new XMLHttpRequest();
let prior;
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            prior = JSON.parse(req.responseText);
            //console.log(prior);

        }
    };
    
    req.open("GET", "https://api.jsonbin.io/v3/b/63347d4ca1610e63863c3e1f/latest?meta=false", true);
    req.setRequestHeader("X-Master-Key", "$2b$10$o6pQLZLaCilO.k6GzYNmw.UNoUhErQZPnum2M58ISKoxCV1Nifncu");
    req.send();

function submitData(){
    let apertoChiuso    =  document.querySelector('input[name="apertoChiuso"]:checked').value;
    let zona            =          document.querySelector('input[name="zone"]:checked').value;
    let percorso        =      document.querySelector('input[name="percorso"]:checked').value;
    let street          =        document.querySelector('input[name="street"]:checked').value;
    let museum          =        document.querySelector('input[name="museum"]:checked').value;
    let curious         =       document.querySelector('input[name="curious"]:checked').value;
    let email           =         document.getElementById('email').value;
    let nome            =          document.getElementById('name').value;
    //console.log(apertoChiuso, zona, percorso, street, museum, curious, email);
    
    // variables are all set. now bundle in json and send. Everything works 
    var json = { 
        "name": nome,
        "email": email,
        "isAperto": apertoChiuso,
        "zona": zona,
        "percorso": percorso,
        "likesStreet": street,
        "timeToVisitMuseum": museum,
        "isCurious": curious
        
    };

    let req = new XMLHttpRequest();

    // json works. now update every answer with something more 

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE){
            console.log(req.responseText);
        }
    };

    req.open("PUT", "https://api.jsonbin.io/v3/b/63347d4ca1610e63863c3e1f?meta=false", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", "$2b$10$o6pQLZLaCilO.k6GzYNmw.UNoUhErQZPnum2M58ISKoxCV1Nifncu");

    req.send(JSON.stringify([json, prior])
    );
 
};
