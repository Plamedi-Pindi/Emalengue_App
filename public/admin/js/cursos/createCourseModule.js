const module = document.getElementById('module');
const moduleContainer = document.getElementById('moduleContainer');
const moduleButton = document.getElementById('moduleButton');
const playlistStatus = document.getElementById('playlistStatus');
const moduleDelete = document.getElementById('moduleDelete');
const playlist1 = document.getElementById('playlist1');

// ADD EVENT TO THE moduleButton ===============================================================
moduleButton.addEventListener('click', () => {

    // Turn invisble the playlist
    playlistStatus.style.display = 'none';
    playlist1.setAttribute('name', 'nothing');

    // Module count
    const moduleCount = parseInt(module.childElementCount) + 1;


    // STAP 1 ===========================================
    // Create module container div
    const moduleContainer = document.createElement("div");
    // Set Attribute to module container
    moduleContainer.setAttribute("class", "row");
    moduleContainer.setAttribute("id", "moduleContainer");

    // Create subtitle for module
    const subtitle = document.createElement('h5');
    // Create text
    const subtitleText = document.createTextNode(`Module ${moduleCount}`);
    // Insert text into subtile
    subtitle.appendChild(subtitleText);

    // ********** Insert subtitle into module container
    moduleContainer.append(subtitle);

    // STAP 2 ===========================================
    // Create nomeContainer for module
    const nomeContainer = document.createElement('div');
    // Set Attribut for nomeContainer
    nomeContainer.setAttribute("class", "col-11 col-md-5 container-fluid");

    // Create lable for nomeContainer
    const nomeLabel = document.createElement('label');
    // set Atrribute form nomeLabel
    nomeLabel.setAttribute("for", "moduleName")
    // Create text for nomeLabel
    const nomeLabelText = document.createTextNode('Título do modulo:');
    // Insert nomeLabelText into nomeLabel
    nomeLabel.appendChild(nomeLabelText);
    // Insert label to nomeContainer
    nomeContainer.append(nomeLabel);

    // Create input for nomeContainer 
    const nomeInput = document.createElement("input");
    //Create input for order
    const order = document.createElement("input");
    // Set Attribute to nomeInput
    nomeInput.setAttribute("type", "text");
    nomeInput.setAttribute("name", "moduleName");
    nomeInput.setAttribute("id", "moduleName");
    nomeInput.setAttribute("placeholder", "Escolha um título");

    // Set Attribute for order
    order.setAttribute("type", "text");
    order.setAttribute("hidden", "true");
    order.setAttribute("name", "order");
    order.setAttribute("value", `${moduleCount}`);

    
    // Insert nomeInput into nomeContainer
    nomeContainer.append(nomeInput);
    nomeContainer.append(order);

    // ********* Insert nomeContainer into moduleContainer
    moduleContainer.append(nomeContainer);

    // STAP 3 ===========================================
    // Create playlistContainer
    const playlistContainer = document.createElement("div");
    // Set Attribut for playlistContainer
    playlistContainer.setAttribute("class", "col-11 col-md-5 container-fluid");

    // Create lable for playlistContainer
    const playlistLabel = document.createElement('label');
    // set Atrribute form playlistLabel
    playlistLabel.setAttribute("for", "modulePlaylist")
    // Create text for playlistLabel
    const playlistLabelText = document.createTextNode('Playlist:'); 
    // Insert playlistLabelText into playlistLabel
    playlistLabel.appendChild(playlistLabelText);
    // Insert label to playlistContainer
    playlistContainer.append(playlistLabel);

    // Create input for playlistContainer 
    const playlistInput = document.createElement("input");
    // Set Attribute to playlistInput
    playlistInput.setAttribute("type", "text");
    playlistInput.setAttribute("name", "playlist");
    playlistInput.setAttribute("id", "modulePlaylist");
    playlistInput.setAttribute("placeholder", "https://");
    // Insert playlistInput into playlistContainer
    playlistContainer.append(playlistInput);

    // ********* Insert playlistContainer into moduleContainer
    moduleContainer.append(playlistContainer);

    // FINAL STAP =======================================
    // Insert the module container into moduleAdd div
    module.append(moduleContainer);

    // CONDITIONAL ISSUES
    if (moduleCount > 0) {
        moduleDelete.style.display = 'block';

    } else {
        moduleDelete.style.display = 'none';
    }


    //alert(module.childElementCount)

})

// ADD EVENT TO moduleDelete ======================================================================
moduleDelete.addEventListener('click', () => {
    const lastModule = module.lastElementChild;
    const moduleCount = parseInt(module.childElementCount);
    playlist1.setAttribute('name', 'playlist');

    // Remove the last Module
    lastModule.remove()

    // Conditional issue
    if (moduleCount == 1) {
        moduleDelete.style.display = 'none';
        playlistStatus.style.display = 'block';

    } else {
        moduleDelete.style.display = 'block';
    }
})