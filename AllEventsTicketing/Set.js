function Set() {
	
	
	this.intersection = function(listA, listB) {
    
	   var resultList = [];
       
	   /*-------------------------------Insert your code here -------------------------------------*/
	   
        if (listA === null || listB === null) { // check for invalid inputs
			return null; // exit and return null to indicate error
			}

			for (var i = 0; i < listA.length; i++) { // for every element in listA
				var nextValue = listA[i]; // get next value in the list

				// for every element in listB
				for (var j = 0; j < listB.length; j++) {
					if (listB[j] === nextValue) { // this listB element equals nextValue
						resultList.push(listB[j]); // add listB element to end of resultList
						break; // break out of (exit) the listB inner loop
						}
				} // end listB inner loop
			} // end listA outer loop
        
	   /*-------------------------------Insert your code here -------------------------------------*/
       
	   return resultList;
	}
    
    
    
	this.union = function(listA, listB) {

	   var resultList = [];
       
	   /*-------------------------------Insert your code here -------------------------------------*/
	   
        if (listA === null || listB === null) {
			return null;
		}

		resultList = listA.concat(listB);
		for (var i = 0; i < resultList.length; ++i) {
			for (var j = i + 1; j < resultList.length; ++j) {
				if (resultList[i] === resultList[j]) {
					resultList.splice(j--, 1);
				}
			}
		}
        
	   /*-------------------------------Insert your code here -------------------------------------*/ 
	   
	   return resultList;
	}




	this.relativeComplement = function(listA, listB) {

	   var resultList = [];
       
	   /*-------------------------------Insert your code here -------------------------------------*/
	   	   
        if (listA === null || listB === null) {
            return null;
        }

        	for (var i = 0; i < listA.length; i++) {
                var found = true;
                for (var j = 0; j < listB.length; j++) {
                    if (listA[i] === listB[j]) {
                        var found = false;
                        break;
                    }
                }

                if (found === true) {
                    resultList.push(listA[i]);
                }
            }
        
	   /*-------------------------------Insert your code here -------------------------------------*/
       
	   return resultList;
	}



	this.symmetricDifference = function(listA, listB) {

	   var resultList = [];
       
	   /*-------------------------------Insert your code here -------------------------------------*/
            
        if (listA === null || listB === null) {
            return null;
        }
        
        var abResult = this.relativeComplement(listA, listB);
        a = abResult.length;

        var baResult = this.relativeComplement(listB, listA);
        b = baResult.length;
            
        for (var i = 0; i < b; i++) abResult[a++] = baResult[i];
            
        return abResult;
        
	   /*-------------------------------Insert your code here -------------------------------------*/
       
	   return resultList;
	}	
	

}
