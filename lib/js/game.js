function startGame() {
  // document.getElementById('templates').innerHTML = '';
  loadFile('templates', 'template/game.html').then(function(res) {

    var gameTemp = 'games/MTG-Commander.json';
    // Load selected template
    loadFileContents('lib/json/' + gameTemp).then(function(res) {
      var game = JSON.parse(res);
      var numPlayers = 1;

      // Loop through players
      for (var index = 0; index < numPlayers; index++) {
        var parent = document.createElement('div');
        parent.setAttribute('id', 'player' + index);
        parent.classList.add('player');

        if (index === 0) {
          parent.classList.add('active');
        }

        document.getElementById('content').appendChild(parent);
        // var parent = document.getElementById('player' + player);

        // Create each counter
        var temp, increment, inc;

        // Primary Counter
        var primary = game.primary;
        if (primary.increments.length > 1) {
          temp = convertToElement(document.getElementById('p-multi-template').innerHTML);
          temp.getElementsByClassName('counter-name')[0].innerHTML = primary.name;
          temp.getElementsByClassName('counter-value')[0].innerHTML = primary.start;

          var pMulti = temp.getElementsByClassName('multi-counter')[0];
          for (var p = 0; p < primary.increments.length; p++) {
            increment = convertToElement(document.getElementById('increment-group-template').innerHTML);
            increment.getElementsByClassName('loss')[0].innerHTML = primary.increments[p];
            increment.getElementsByClassName('gain')[0].innerHTML = primary.increments[p];
            appendChildNodes(increment, pMulti);
          }
          appendChildNodes(temp, parent);
        }
        else {
          temp = convertToElement(document.getElementById('p-single-template').innerHTML);
          temp.getElementsByClassName('counter-name')[0].innerHTML = primary.name;
          temp.getElementsByClassName('counter-value')[0].innerHTML = primary.start;
          temp.getElementsByClassName('loss')[0].innerHTML = primary.increments[0];
          temp.getElementsByClassName('gain')[0].innerHTML = primary.increments[0];
          appendChildNodes(temp, parent);
        }

        // Secondary counter
        var secondary = game.secondary;
        for (var s = 0; s < secondary.length; s++) {
          var stmp = secondary[s];
          if (stmp.increments.length > 1) {
            temp = convertToElement(document.getElementById('s-multi-template').innerHTML);
            temp.getElementsByClassName('counter-name')[0].innerHTML = stmp.name;
            temp.getElementsByClassName('counter-value')[0].innerHTML = stmp.start;

            var sMulti = temp.getElementsByClassName('multi-counter')[0];
            for (var si = 0; si < stmp.increments.length; si++) {
              increment = convertToElement(document.getElementById('increment-group-template').innerHTML);
              increment.getElementsByClassName('loss')[0].innerHTML = stmp.increments[si];
              increment.getElementsByClassName('gain')[0].innerHTML = stmp.increments[si];
              appendChildNodes(increment, sMulti);
            }
            appendChildNodes(temp, parent);
          }
          else {
            temp = convertToElement(document.getElementById('s-single-template').innerHTML);
            temp.getElementsByClassName('counter-name')[0].innerHTML = stmp.name;
            temp.getElementsByClassName('counter-value')[0].innerHTML = stmp.start;
            inc = stmp.increments[0];
            temp.getElementsByClassName('loss')[0].innerHTML = (inc !== undefined) ? inc : stmp.increments;
            temp.getElementsByClassName('gain')[0].innerHTML = (inc !== undefined) ? inc : stmp.increments;
            appendChildNodes(temp, parent);
          }
        }

        // Tertiary counter
        var tertiary = game.tertiary;
        for (var t = 0; t < tertiary.length; t++) {
          var tTmp = tertiary[t];
          temp = convertToElement(document.getElementById('t-single-template').innerHTML);
          temp.getElementsByClassName('counter-name')[0].innerHTML = tTmp.name;
          temp.getElementsByClassName('counter-value')[0].innerHTML = tTmp.start;
          inc = tTmp.increments[0];
          temp.getElementsByClassName('loss')[0].innerHTML = (inc !== undefined) ? inc : tTmp.increments;
          temp.getElementsByClassName('gain')[0].innerHTML = (inc !== undefined) ? inc : tTmp.increments;
          appendChildNodes(temp, parent);
        }
      }
    });
  });
}