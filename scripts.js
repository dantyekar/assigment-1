function getVals() {
  // Get slider values
  var parent = this.parentNode;
  var slides = parent.getElementsByTagName("input");
  var slide1 = parseFloat(slides[0].value);
  var slide2 = parseFloat(slides[1].value);
  // Neither slider will clip the other, so make sure we determine which is larger
  if (slide1 > slide2) {
    var tmp = slide2;
    slide2 = slide1;
    slide1 = tmp;
  }

  slides[1].style.background= 'linear-gradient(to right, #cccccc '+slide1+'%, orange '+slide1+'%, orange '+slide2+'%, #cccccc '+slide2+'%)' ;

  var displayElement1 = document.getElementById("sliderValue1");
  displayElement1.innerHTML = "$ " + slide1;
  var displayElement2 = document.getElementById("sliderValue2");
  displayElement2.innerHTML = "$ " + slide2;

  loadFoodWithPrice(data, slide1, slide2);
}

window.onload = function() {
  // Initialize Sliders
  var sliderSections = document.getElementsByClassName("range-slider");
  for (var x = 0; x < sliderSections.length; x++) {
    var sliders = sliderSections[x].getElementsByTagName("input");
    for (var y = 0; y < sliders.length; y++) {
      if (sliders[y].type === "range") {
        sliders[y].oninput = getVals;
        // Manually trigger event first time to display values
        sliders[y].oninput();
      }
    }
  }
};
document.addEventListener("DOMContentLoaded", loadFoodDefault);

var loadFoodDefault = function(){
	var foodTable = document.getElementById("foodTable");
	let tempString= "";
	data.sort(function (a, b) {
 		return a.foodPrice - b.foodPrice;
	});
	for(let i=0; i<data.length;i++)
	{
		if(i%4 === 0)
		{
			tempString = tempString + "<div class='row'>"; console.log("RowAdded! "+i);
		}

		tempString = tempString + "<div class='col-md-3'><div class='card'> <img class='card-img-top' src='" +
							data[i].imgUrl +
							"' alt='Card image'><div class='card-body'><h4 class='card-title'>" + 
							data[i].foodName +
							"</h4><p class='card-text'>" +
							data[i].foodCategory +
							"</p><p class='card-text price'>$" +
							data[i].foodPrice +
							"</p></div></div></div>";

		if(i%4 === 3)
		{
			tempString = tempString + "</div>"; console.log("RowEnded! "+i);
		}
	}
	if ((data.length-1)%4 !== 3)
	{
		tempString = tempString + "</div>";
	}
	foodTable.innerHTML = tempString;
};


var loadFoodWithPrice = function(content, price1, price2){
	var foodTable = document.getElementById("foodTable");
	let tempString = "";
	let count = 0;
	content.sort(function (a, b) {
 		return a.foodPrice - b.foodPrice;
	});
	for (let i=0;i<content.length;i++)
	{
		if((content[i].foodPrice>=price1) && (content[i].foodPrice<=price2)) 
		{
			if(count%4 === 0)
			{
				tempString = tempString + "<div class='row'>"; console.log("RowAdded! "+i);
			}
			tempString = tempString + "<div class='col-md-3'><div class='card'> <img class='card-img-top' src='" +
							data[i].imgUrl +
							"' alt='Card image'><div class='card-body'><h4 class='card-title'>" + 
							data[i].foodName +
							"</h4><p class='card-text'>" +
							data[i].foodCategory +
							"</p><p class='card-text price'>$" +
							data[i].foodPrice +
							"</p></div></div></div>";
			if(count%4 === 3)
			{
				tempString = tempString + "</div>"; console.log("RowEnded! "+i);
			}
			count++;

		}
		
	}
	if ((count-1)%4 !== 3)
	{
		tempString = tempString + "</div>";
	}
	foodTable.innerHTML = tempString;
	console.log(tempString);
}


