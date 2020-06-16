document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score')
    const resultDsiplay = document.querySelector('.result');
    const width = 4;
    const winScore = 2048;
    let score = 0;
    let squares = [];

    //create a playing board;
    function createBoard() {

        for( let i=0; i < width*width ; i++){
            let square = document.createElement('div');
            let num = 0;
            square.innerHTML = `<span class="num" data-num=${num}></span>`
            gridDisplay.appendChild(square);
            squares.push(square);
            
        }
        generate()
        generate()
        
    }
    createBoard()
    // addNumClass();

    //generate a random number;
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if(squares[randomNumber].children[0].getAttribute('data-num') == 0){
            let num = 2;
            squares[randomNumber].innerHTML = `<span class="num" data-num=${num}></span>`;
            // checkForGameOver();
        }else generate();

    }


    //swipe right
    function moveRight() {
        for( let i=0 ; i < width*width; i++){
            if( i % 4 === 0){//0,4,8,12
                //get each num in row
                let totalOne = squares[i].children[0].getAttribute('data-num');
                let totalTwo = squares[i+1].children[0].getAttribute('data-num');
                let totalThree = squares[i+2].children[0].getAttribute('data-num');
                let totalFour = squares[i+3].children[0].getAttribute('data-num');
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                // console.log(row)

                let filteredRow = row.filter ( num => num);
                let missing = width - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);
                
                squares[i].children[0].setAttribute('data-num',newRow[0]) 
                squares[i+1].children[0].setAttribute('data-num',newRow[1]) 
                squares[i+2].children[0].setAttribute('data-num',newRow[2]) 
                squares[i+3].children[0].setAttribute('data-num',newRow[3]) 
            }
        }
    }

    //swipe left
    function moveLeft() {
        for( let i=0 ; i < width*width; i++){
            if( i % 4 === 0){//0,4,8,12
                //get each num in row
                let totalOne = squares[i].children[0].getAttribute('data-num');
                let totalTwo = squares[i+1].children[0].getAttribute('data-num');
                let totalThree = squares[i+2].children[0].getAttribute('data-num');
                let totalFour = squares[i+3].children[0].getAttribute('data-num');
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter ( num => num);
                let missing = width - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros);

                squares[i].children[0].setAttribute('data-num',newRow[0]);
                squares[i+1].children[0].setAttribute('data-num',newRow[1]);
                squares[i+2].children[0].setAttribute('data-num',newRow[2]);
                squares[i+3].children[0].setAttribute('data-num',newRow[3]);
            }
        }
    }

    //swipe down
    function moveDown() {
        for (let i=0; i< width; i++){
            let totalOne = squares[i].children[0].getAttribute('data-num');
            let totalTwo = squares[i+width].children[0].getAttribute('data-num');
            let totalThree = squares[i+(width*2)].children[0].getAttribute('data-num');
            let totalFour = squares[i+(width*3)].children[0].getAttribute('data-num');
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter ( num => num);
            let missing = width - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredColumn);
                
            squares[i].children[0].setAttribute('data-num',newColumn[0]);
            squares[i+width].children[0].setAttribute('data-num',newColumn[1]);
            squares[i+(width*2)].children[0].setAttribute('data-num',newColumn[2]);
            squares[i+(width*3)].children[0].setAttribute('data-num',newColumn[3]);
        }
    }

    //swipe Up
    function moveUp() {
        for (let i=0; i< width; i++){
            let totalOne = squares[i].children[0].getAttribute('data-num');
            let totalTwo = squares[i+width].children[0].getAttribute('data-num');
            let totalThree = squares[i+(width*2)].children[0].getAttribute('data-num');
            let totalFour = squares[i+(width*3)].children[0].getAttribute('data-num');
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter ( num => num);
            let missing = width - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros)
                
            squares[i].children[0].setAttribute('data-num',newColumn[0]);
            squares[i+width].children[0].setAttribute('data-num',newColumn[1]);
            squares[i+(width*2)].children[0].setAttribute('data-num',newColumn[2]);
            squares[i+(width*3)].children[0].setAttribute('data-num',newColumn[3]);

        }

    }

    
    function combineRow() {
        for (let i= 0; i < 15; i++){
            if (squares[i].children[0].getAttribute('data-num') === squares[i+1].children[0].getAttribute('data-num')) {
                let combinedTotal = parseInt(squares[i].children[0].getAttribute('data-num')) + parseInt(squares[i+1].children[0].getAttribute('data-num'));

                squares[i].children[0].setAttribute('data-num',combinedTotal);
                squares[i+1].children[0].setAttribute('data-num',0);
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
                checkForGameOver();
            }
        }
        checkForWin()
    }

    function combineColumn() {
        for (let i= 0; i < 12; i++){
            if (squares[i].children[0].getAttribute('data-num') === squares[i+width].children[0].getAttribute('data-num')) {
            

                let combinedTotal = parseInt(squares[i].children[0].getAttribute('data-num')) + parseInt(squares[i+width].children[0].getAttribute('data-num'));
                // console.log(squares[i].children[0].innerHTML)
                // console.log(squares[i+width].children[0].innerHTML)

                squares[i].children[0].setAttribute('data-num',combinedTotal);
                squares[i+width].children[0].setAttribute('data-num',0);
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
                checkForGameOver();

            }
        }
        checkForWin()
    }


    
    //key functions
    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generate();
    }
    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    }
    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generate();
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generate();
    }


    //assign key codes
    function control (e) {
        switch (e.keyCode){
            case 37:
                keyLeft();
                break;

            case 38:
                keyUp();
                break;

            case 39:
                keyRight();
                break;
            case 40:
                keyDown();
                break;
        }
    }

    //check for number 2048
    function checkForWin() {
        for( let i=0; i < squares.length; i++){
            if(squares[i].children[0].getAttribute('data-num') == winScore){
                scoreDisplay.innerHTML = 'YOU WIN!'
                document.removeEventListener('keyup',control)
            }
        }
    }

    //check if there are no zeros on the boards and
    function checkForGameOver() {
        let zeros = 0
        for( let i =0; i< squares.length; i++ ){
            if(squares[i].children[0].getAttribute('data-num') ==0){
                zeros++;
            }
        }
        if(zeros === 0){
            scoreDisplay.innerHTML = "YOU LOSE";
            document.removeEventListener('keyup',control)
        }
    }

    document.addEventListener('keyup',control);

    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);
    
    let xDown = null,                                            
        yDown = null;
    
    function getTouches(e) {
      return e.touches ||             // browser API
             e.originalEvent.touches; // jQuery
    }                                                     
    
    function handleTouchStart(e) {
        const firstTouch = getTouches(e)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };                                                
    
    function handleTouchMove(e) {
        if ( ! xDown || ! yDown ) {
            return;
        }
    
        var xUp = e.touches[0].clientX;                                    
        var yUp = e.touches[0].clientY;
    
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
    
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* left swipe */ 
                keyLeft();
            } else {
                /* right swipe */
                keyRight();
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* up swipe */ 
                keyUp();
            } else { 
                /* down swipe */
                keyDown();
            }                                                                 
        }
        /* reset values */
        xDown = null;
        yDown = null;                                             
    };


});



