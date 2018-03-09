module.exports = function solveSudoku(matrix) {
  let sudoku = matrix;
  let guess;
  let wrongMove = {
    i: 0,
    j: 0,
    value: 0,
  };
  let badVariants = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
  ];
  let store = [];
  let step = sudoku.map(arr=>arr.slice());
  let n = 0;

  store.push(step);


  function checkBadVariant(badVariants,variants,i,j){
    return (Array.isArray(badVariants[i][j]) == true )?variants.filter((el) => !badVariants[i][j].includes(el)): variants;
  }

  function storeSudoku(sodoku, store){
      step = sudoku.map(arr=>arr.slice());                                                                                                                 
      store.push(step);
  }

function checkVariant(variants,i,j){
  if (variants.length>1){
    wrongMove.i = i;
    wrongMove.j = j;
    wrongMove.value = variants[0]; 
    storeSudoku(sudoku, store);
  }else{
    storeActivate = false;
  }
  return  variants[0];
}

    function findBestVariant(guess, sudoku){                                                                                
      let variants;
      for (let l=1; l<10; l++){
        for (let i=0; i<9; i++){
          for (let j=0; j<9; j++){
            if (guess[i][j].length == l){
              variants = guess[i][j];
              return sudoku[i][j] = checkVariant(variants,i,j);
            }
          }
        }
      }  
  }

  function findNumbers (sudoku, badVariants){   
      let varMatrix = makeRowArray(sudoku);
      let blockMatrix = makeBlockArray(sudoku);
      let rowMatrix = makeRowArray(sudoku);
      let colMatrix = makeColArray(sudoku);
      let blockNumber;
      let variants;
      for(let i=0;i<9;i++){
        for(let j=0; j<9;j++){
            variants = [];
            if(varMatrix[i][j] == 0) {  
              blockNumber = Math.floor(i / 3) * 3 + Math.floor(j / 3);
              for (let x=1;x<10;x++){
                if(!blockMatrix[blockNumber].includes(x) && !rowMatrix[i].includes(x) && !colMatrix[j].includes(x)){   
                  variants.push(x);                                                                                     
                } 
              }
              if(variants.length != 0){                                                                             
                varMatrix[i][j] = checkBadVariant(badVariants,variants,i,j);
              }else{                                                                                       
                return false;
              }
            }
        }
      }
      return varMatrix;
    }

  function equals (array1) {                                                                                                          
      let array = array1.map(element=>element);
      let array2  = [1,2,3,4,5,6,7,8,9];
      array.sort();
      if (array.length != array2.length)
          return false;
      for (var i = 0; i < array.length; i++) {               
          if (array[i] != array2[i]) { 
              return false;   
          }           
      }       
      return true;
    }
  
    function makeBlockArray(sudoku){                                                                                                      
      let blockArray = [];
        let b;
      for(let i=0;i<9;i++){
        for(let j=0; j<9;j++){
          b = Math.floor(i / 3) * 3 + Math.floor(j / 3);
          (blockArray[b] == undefined)? blockArray.push([sudoku[i][j]]): blockArray[b].push(sudoku[i][j]);
        }
      }    
      return blockArray;
    }
  
    function makeRowArray(sudoku){                                                                                                         
      let RowArray = [];
      for(let i=0;i<9;i++){
        for(let j=0; j<9;j++){
          (RowArray[i] == undefined)? RowArray.push([sudoku[i][j]]): RowArray[i].push(sudoku[i][j]); 
        }
      }
      return RowArray;
    }
  
    function makeColArray(sudoku){                                                                                                                
      let colArray = [];
      for(let i=0;i<9;i++){
        for(let j=0; j<9;j++){
          (colArray[i] == undefined)? colArray.push([sudoku[j][i]]): colArray[i].push(sudoku[j][i]); 
        }
      }
      return colArray;
    }
  
    function foundResult(sudoku) {                                                                                                                                       
      let blockMatrix = makeBlockArray(sudoku);
      let rowMatrix = makeRowArray(sudoku);
      let colMatrix = makeColArray(sudoku);
      for (let i=0; i<=8; i++) { 
        while (equals(blockMatrix[i]) == false || equals(rowMatrix[i]) == false || equals(colMatrix[i]) == false) {  
          return false;
        }
      }
      return true;
    }

  while (foundResult(sudoku) == false) {                                                                                                                                                                     
    guess = findNumbers(sudoku,badVariants);
    if (guess == false){      
      (Array.isArray(badVariants[wrongMove.i][wrongMove.j]))?badVariants[wrongMove.i][wrongMove.j].push(wrongMove.value): badVariants[wrongMove.i][wrongMove.j] = [wrongMove.value];
      sudoku = store.pop();
      guess = findNumbers(sudoku,badVariants);
    }
                                                                                                                                                          
    findBestVariant(guess,sudoku);                                                                                                                                                                                                                                  
    
  }  
  return sudoku;
}
