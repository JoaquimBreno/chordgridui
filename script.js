document.addEventListener('DOMContentLoaded', function() {
    var isFileLoaded = false;

    function adjustContainerSize() {
        if (isFileLoaded) {
            document.getElementById('chordContainer').style.transition = 'height 0.5s ease';
            document.getElementById('chordContainer').style.height = '400px';
            document.getElementById('previous').style.display = 'inline-block';
            document.getElementById('next').style.display = 'inline-block';
        } else {
            document.getElementById('chordContainer').style.transition = 'height 0.5s ease';
            document.getElementById('chordContainer').style.height = '50px';
            document.getElementById('previous').style.display = 'none';
            document.getElementById('next').style.display = 'none';
        }
    }

    document.getElementById('fileInput').addEventListener('change', function(event) {
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new FileReader();
      
        reader.onload = function(e) {
          const jsonContent = e.target.result;
          const data = JSON.parse(jsonContent);
          isFileLoaded = true;
          adjustContainerSize();
          createChordBox(data);
        };
      
        reader.readAsText(file);
    });
    var uploadButton = document.getElementById('uploadContainer');

    uploadButton.addEventListener('dragover', function(event) {
        event.preventDefault(); 
        uploadButton.classList.add('drag-over'); 
    });

    uploadButton.addEventListener('drop', function(event) {
        event.preventDefault(); 
        uploadButton.classList.remove('drag-over'); 
        console.log("here")
        var files = event.dataTransfer.files;

        if (files.length > 0) {
            var file = files[0];

            if (file.type === 'application/json') {
                var reader = new FileReader();

                reader.onload = function(event) {
                    var jsonContent = event.target.result; 
                    var jsonData = JSON.parse(jsonContent); 
                    isFileLoaded = true;
                    adjustContainerSize();
                    createChordBox(jsonData);
                };
                reader.readAsText(file);
            } else {
                console.error('O arquivo não é do tipo JSON.');
            }
        } else {
            console.error('Nenhum arquivo foi solto.');
        }
        
    });
    uploadButton.addEventListener('dragleave', function(event) {
        event.preventDefault();
        uploadButton.classList.remove('drag-over'); 
    });

    adjustContainerSize();
});

var currentChordIndex = 0;
var fingerExists = false;

function createChordBox(data) {
    var bodyElement = document.body;
    var chordContainer = document.getElementById("chordcontainer")
    // Adiciona botões de navegação
    document.getElementById("previous").addEventListener('click', function() {
        currentChordIndex = (currentChordIndex - 1 + data.positions.length) % data.positions.length;
        updateChordBox(data);
    });

    document.getElementById("next").addEventListener('click', function() {
        currentChordIndex = (currentChordIndex + 1) % data.positions.length;
        updateChordBox(data);
    });
    // Cria o acorde inicial
    updateChordBox(data);

}

function bulletListener(data){
    var bullets = document.querySelectorAll("#chord-bullet");
    bullets.forEach(function(bullet) {
        bullet.addEventListener('click', function() {
            let classes = bullet.classList;
            let classArray = Array.from(classes);
            let fingerIndex = classArray[0].split('_')[1];
            console.log(fingerIndex);
            updateFingers(data, fingerIndex);
        });
    });
}
function generateNavigator(data, chordContainer, fingerIndex){
    if(data.fingers.length > 1 && Array.isArray(data.fingers)){
        if(fingerExists = true){
            var oldNavigator = document.getElementById('navigator');
            if (oldNavigator) {
                oldNavigator.innerHTML = '';
            }
        }
        fingerExists = true;
        var navigator = document.getElementById('navigator');
        for (let index = 0; index < data.fingers.length; index++) {
            var bullet = document.createElement('i');
            const chordId = 'chord_' + index ;
            bullet.setAttribute('id', 'chord-bullet'); 
            bullet.setAttribute('class', chordId);
            if(index == fingerIndex){
                bullet.classList.add('fas');
                bullet.classList.add('fa-circle');             
            }
            else{
                bullet.classList.add('far');
                bullet.classList.add('fa-circle');
            }
            navigator.appendChild(bullet);
        }
        oldNavigator.style.transition = 'opacity 0.25s ease'; // Adicionando a transição de opacidade
        oldNavigator.style.opacity = '0';
        chordContainer.appendChild(navigator);
        setTimeout(function() {
            oldNavigator.style.opacity = '1'; // Mudando a opacidade para 1 para mostrar o elemento
        }, 250);
    }
    else{
        fingerExists = false;
        var oldNavigator = document.getElementById('navigator');
        if (oldNavigator) {
            oldNavigator.innerHTML = '';
        }
    }
}

function updateChordBox(data) {
    var chordContainer = document.getElementById('chordContainer');
    // Remove o elemento de acorde anterior, se existir
    var divElement = document.getElementById('chord');
    var oldChord = document.getElementById('chord-div');
    if (oldChord) {
        divElement.removeChild(oldChord);
    }
    var chordDiv = document.createElement('div');
    chordDiv.setAttribute('id', 'chord-div');
    // Obtém a posição do acorde atual
    var currentChord = data.positions[currentChordIndex];

    // Define os atributos com base nos dados do JSON
    var chordName = document.createElement('h1');
    chordName.textContent = data.key + data.suffix;
    chordDiv.appendChild(chordName);
    // Cria o elemento <chord> para o acorde atual
    var chordElement = document.createElement("chord");

    chordElement.setAttribute("positions", currentChord.frets);
    if(Array.isArray(currentChord.fingers)){
        chordElement.setAttribute("fingers", currentChord.fingers[0].replace(/0/g,"-"));
    }
    else{
        chordElement.setAttribute("fingers", currentChord.fingers.replace(/0/g,"-"));
    }
    chordElement.setAttribute("size", 5);
    chordDiv.appendChild(chordElement);
    chordDiv.style.transition = 'opacity 0.25s ease'; // Adicionando a transição de opacidade
    chordDiv.style.opacity = '0';
    divElement.appendChild(chordDiv);
    chordContainer.appendChild(divElement);
    setTimeout(function() {
        chordDiv.style.opacity = '1'; // Mudando a opacidade para 1 para mostrar o elemento
    }, 250);

    // Adiciona o bullet navigator ao corpo do documento, navegar os fingers
    generateNavigator(currentChord, chordContainer, 0);

    
    // Remove todos os scripts existentes no documento
    var oldScripts = document.querySelectorAll('script');
    oldScripts.forEach(function(script) {
        script.parentNode.removeChild(script);
    });

    // Adiciona o novo script de substituição de acordes
    var newScriptElement = document.createElement("script");
    newScriptElement.textContent = 'chords.replace();';
    document.body.appendChild(newScriptElement);

    if(currentChord.fingers.length > 1){
        bulletListener(data);
    }
}

function updateFingers(data, fingerIndex){
    var chordContainer = document.getElementById('chordContainer');
    var divElement = document.getElementById("chord");
    var chordDiv = document.getElementById('chord-div');
    if (chordDiv) {
        chordDiv.innerHTML = '';
    }
    // Obtém a posição do acorde atual
    var currentChord = data.positions[currentChordIndex];

    // Define os atributos com base nos dados do JSON
    var chordName = document.createElement('h1');
    chordName.textContent = data.key + data.suffix;
    chordDiv.appendChild(chordName);
    console.log("fingers: ")
    console.log(currentChord.fingers[fingerIndex])
    // Cria o elemento <chord> para o acorde atual
    var chordElement = document.createElement("chord");
    chordElement.setAttribute("positions", currentChord.frets);
    chordElement.setAttribute("fingers", currentChord.fingers[fingerIndex].replace(/0/g,"-"));
    chordElement.setAttribute("size", 5);
    chordDiv.appendChild(chordElement);
    chordDiv.style.transition = 'opacity 0.25s ease'; // Adicionando a transição de opacidade
    chordDiv.style.opacity = '0';
    divElement.appendChild(chordDiv);

    setTimeout(function() {
        chordDiv.style.opacity = '1'; // Mudando a opacidade para 1 para mostrar o elemento
    }, 250);
    chordContainer.appendChild(divElement);

    generateNavigator(currentChord, chordContainer, fingerIndex);
    // Remove todos os scripts existentes no documento
    var oldScripts = document.querySelectorAll('script');
    oldScripts.forEach(function(script) {
        script.parentNode.removeChild(script);
    });

    // Adiciona o novo script de substituição de acordes
    var newScriptElement = document.createElement("script");
    newScriptElement.textContent = 'chords.replace();';
    document.body.appendChild(newScriptElement);
    if(currentChord.fingers.length > 1){
        bulletListener(data);
    }
}
