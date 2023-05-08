let xTurn = true;
let isWinner = false;
const boardArray = [];
const gameWinnerArray = [
    [1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]
];

const BoardSquare = ({id}) => {
    const [fill, setFill] = React.useState('');
    const [playerWinner, setPlayerWinner] = React.useState();
    const tieReboot = () => {
        window.location.reload(false);
    }

    const gameWinner = (e) => {
        let xCheckArray = boardArray.filter((item) => item.text === 'X');
        let oCheckArray = boardArray.filter((item) => item.text === 'O');
        let xWinArray = []
        let oWinArray = []


        function formMoveArray(array, arrayWin){
            for(let i = 0; i < array.length; i++){
                arrayWin.push(array[i].id);
            }
        }

        function checker(array1, array2) {
            for(let i = 0; i < gameWinnerArray.length; i++){
                if(gameWinnerArray[i].every(item => array1.includes(item))){
                    setPlayerWinner(true);
                    isWinner=true;
                    break;
                }
            }
        }

        formMoveArray(xCheckArray, xWinArray);
        formMoveArray(oCheckArray, oWinArray);
        checker(xWinArray, xCheckArray);
        checker(oWinArray, oCheckArray);
    }

    const winnerScreen = (e) => {
        console.log(e.target.innerText);
        setTimeout(() => {
            e.target.style.position = 'absolute';
            e.target.style.top = '0';
            e.target.style.left = '0';
            e.target.style.transition = '.5s'
            e.target.style.width = '100%';
            e.target.style.height = '100%';
            e.target.style.backgroundColor = 'rgb(0, 179, 255)';
            setFill(`Congrats! ${e.target.innerText} Player!`);
        }, 1000);

    }

    const clickHandler = (e) => {
        if(isWinner){
            return;
        }
        if(!e.target.innerText){
            if(xTurn){
                let letter = 'X';
                setFill(letter);
                e.target.innerText = letter;
                boardArray.push({text: letter, id: id});
                xTurn = false;
                gameWinner(e);
                if(isWinner){
                    winnerScreen(e);
                }
            }else{
                let letter = 'O';
                setFill(letter);
                e.target.innerText = letter;
                boardArray.push({text: letter, id: id});
                xTurn = true;
                gameWinner(e);
                if(isWinner){
                    winnerScreen(e);
                }
            }
        }else{
            return;
        }
    }

    return(
        <div className='board-square'onClick={clickHandler} id={id}>{fill}</div>
    )
}

const Board = () => {
    const squaresArray = [1,2,3,4,5,6,7,8,9];
    return(
        <>
            <div className='board-wrapper'>
                {squaresArray.map((item) => {
                    return <BoardSquare key={item} id={item}/> 
                })}
            </div>
            <div className='button-wrapper'>
                <button onClick={() => window.location.reload(false)} className='reset-button'>Reset</button>
            </div>
        </>
    )
}

const App = () => {
    
    return (
        <div className='game-wrapper'>
            <h1 className='title'>TIC TAC TOE</h1>
            <Board />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));