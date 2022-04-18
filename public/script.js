var pedido = new XMLHttpRequest();
var tentativas = 6; 
var tamanhopalavras = 5; 
var TentativaAtual = 0; 
var LetraAtual = 0; 
var VocePerdeu = false;
var word;

var pedido2 = new XMLHttpRequest();
var pedido3 = new XMLHttpRequest();

pedido.onreadystatechange = function (){
    if(pedido.readyState == 4 && pedido.status == 200){
        word = pedido.response;
        console.log(word);
    }
}

pedido.open("GET","/getpalavra",true);
pedido.send();


window.onload = function () {
    CarregarGame();


}




function CarregarGame() {


    for (let r = 0; r < tentativas; r++) {
        for (let c = 0; c < tamanhopalavras; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }


    let keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ç"],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
    ]

    for (let i = 0; i < keyboard.length; i++) {
        let currRow = keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboard-row");

        for (let j = 0; j < currRow.length; j++) {
            let Tecladozy = document.createElement("div");

            let key = currRow[j];
            Tecladozy.innerText = key;
            if (key == "Enter") {
                Tecladozy.id = "Enter";
            }
            else if (key == "⌫") {
                Tecladozy.id = "Backspace";
            }
            else if ("A" <= key && key <= "Z") {
                Tecladozy.id = "Key" + key; // "Key" + "A";
            }

            Tecladozy.addEventListener("click", processKey);

            if (key == "Enter") {
                Tecladozy.classList.add("enter-key-tile");
            } else {
                Tecladozy.classList.add("key-tile");
            }
            keyboardRow.appendChild(Tecladozy);
        }
        document.body.appendChild(keyboardRow);
    }



    document.addEventListener("keyup", (e) => {
        processInput(e);
    })
}

function processKey() {
    e = { "Pos": this.id };
    processInput(e);
}



function processInput(e) {
    if (VocePerdeu) return;
    
    
    if ("KeyA" <= e.Pos && e.Pos <= "KeyZ") {
        if (LetraAtual < tamanhopalavras) {
            let Brown321 = document.getElementById(TentativaAtual.toString() + '-' + LetraAtual.toString());
            if (Brown321.innerText == "") {
                Brown321.innerText = e.Pos[3];
                LetraAtual += 1;
            }
        }
    }
    
    
    
    else if (e.Pos == "Backspace") {
        if (0 < LetraAtual && LetraAtual <= tamanhopalavras) {
            LetraAtual -= 1;
        }
        let Brown321 = document.getElementById(TentativaAtual.toString() + '-' + LetraAtual.toString());
        Brown321.innerText = "";
    }

    
    
    
    else if (e.Pos == "Enter") {
        VerificarPalavra();
    }

    
    
    if (!VocePerdeu && TentativaAtual == tentativas) {
        VocePerdeu = true;
        document.getElementById("answer").innerText = word;
    }
}

function VerificarPalavra() {
    let PassePa;
    let PalavraCliente = "";
    var xzq;
    
    
    document.getElementById("answer").innerText = "";


    for (let c = 0; c < tamanhopalavras; c++) {
        let Brown321 = document.getElementById(TentativaAtual.toString() + '-' + c.toString());
        let Tenz22 = Brown321.innerText;
        PalavraCliente += Tenz22;
    }

    PalavraCliente = PalavraCliente.toLowerCase(); //case sensitive
    console.log(PalavraCliente);
      




    let correct = 0;

    let Tenz22Count = {}; 
    for (let i = 0; i < word.length; i++) {
        
        let Tenz22 = word[i];

        if (Tenz22Count[Tenz22]) {
            Tenz22Count[Tenz22] += 1;
        }
        else {
            Tenz22Count[Tenz22] = 1;
        }
    }

    console.log(Tenz22Count);


    for (let c = 0; c < tamanhopalavras; c++) {
        
        let Brown321 = document.getElementById(TentativaAtual.toString() + '-' + c.toString());
        
        let Tenz22 = Brown321.innerText;


        if (word[c] == Tenz22) {
            Brown321.classList.add("correct");

            let Tecladozy = document.getElementById("Key" + Tenz22);
            
            Tecladozy.classList.remove("present");
            
            Tecladozy.classList.add("correct");

            correct += 1;
            Tenz22Count[Tenz22] -= 1; 
        }

        if (correct == tamanhopalavras) {
            
            VocePerdeu = true;

        }
    }

    console.log(Tenz22Count);
    
    
    for (let c = 0; c < tamanhopalavras; c++) {
        let Brown321 = document.getElementById(TentativaAtual.toString() + '-' + c.toString());
        
        let Tenz22 = Brown321.innerText;


        
        
        if (!Brown321.classList.contains("correct")) {

            
            
            
            if (word.includes(Tenz22) && Tenz22Count[Tenz22] > 0) {
                
                Brown321.classList.add("present");

                let Tecladozy = document.getElementById("Key" + Tenz22);
                if (!Tecladozy.classList.contains("correct")) {
                    
                    Tecladozy.classList.add("present");
                }
                Tenz22Count[Tenz22] -= 1;
            } 
            else {
                Brown321.classList.add("absent");
                
                let Tecladozy = document.getElementById("Key" + Tenz22);
                
                
                Tecladozy.classList.add("absent")
            }
        }
    }

    TentativaAtual += 1; 
    LetraAtual = 0; 
}

function RestartGame(){
    setTimeout(function () {
        window.location.reload(false);
    }, 2000);
}