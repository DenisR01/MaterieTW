/*
 - funcția distance primește ca parametrii două array-uri
 - fiecare element poate apărea cel mult o dată într-un array; orice apariții suplimentare sunt ignorate 
 - distanța dintre cele 2 array-uri este numărul de elemente diferite dintre ele
 - dacă parametrii nu sunt array-uri se va arunca o excepție ("InvalidType")
*/
/*
 - the distance function receives as parameters two arrays
 - each element can appear in each array at most once; any duplicates are ignored
 - the distance between the 2 arrays is the number of different elements between them
 - if the parameters are not arrays an exception is thrown ("InvalidType")
*/

function distance(first, second){

	if(!Array.isArray(first) || !Array.isArray(second)){
		throw new Error("InvalidType");
	}
	
	let set1 = [...new Set(first)];
	let set2 = [...new Set(second)];
	let dif=0;

		for(let i of set1){
			if(set2.indexOf(i)===-1){
			dif++;
		}
		else{
			set2.splice(set2.indexOf(i),1);
		}
	}
		
	
	dif+=set2.length;
	return dif;

	
	
	
}


module.exports.distance = distance