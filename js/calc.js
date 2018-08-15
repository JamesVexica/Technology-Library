var Voltage = 0;
var CableCSA = 0;
var SupplyWattage = 0;
var Tolerance = 0;
var CableLength = 0;
var Current = 0;
var vDrop = 0;
var vDropMax = 0;

//console.log("Voltage = " + Voltage);
//console.log("CableCSA = " + CableCSA);
//console.log("SupplyWattage = " + SupplyWattage);
//console.log("Tolerance = " + Tolerance);
//console.log("CableLength = " + CableLength);
//console.log("Current = " + Current);
//console.log("vDrop = " + vDrop);
//console.log("vDropMax = " + vDropMax);

document.getElementById("cabName").style.color = "#A9A9A9";
document.getElementById("supName").style.color = "#A9A9A9";
document.getElementById("tolName").style.color = "#A9A9A9";
document.getElementById("cabLName").style.color = "#A9A9A9";
document.getElementById("curName").style.color = "#A9A9A9";

var radios = document.getElementsByName('CableCSA');
for (var i = 0; i< radios.length;  i++){
    radios[i].disabled = true;
}
var radios = document.getElementsByName('SupplyWattage');
for (var i = 0; i< radios.length;  i++){
    radios[i].disabled = true;
}

var radios = document.getElementsByName('Tolerance');
for (var i = 0; i< radios.length;  i++){
    radios[i].disabled = true;
}

function vDropCalc(){
	vDrop = CableLength * CableCSA * Current * 2;

		if (isNaN(vDrop)){

	}else{
	vDrop = round(vDrop, 4);

	document.getElementById("VoltageDrop").innerHTML=vDrop;
	}
}


function vDropMaxCalc(){
	vDropMax = Tolerance * Voltage;

	if (vDrop == 0){
		document.getElementById("VoltageCheck").innerHTML = "<img src='img/thumbdown.png'>";
		var a = document.querySelector("#End"); 
		a.setAttribute("class", "button alert");
	}else{
	if (vDrop > vDropMax){
		document.getElementById("VoltageCheck").innerHTML = "<img src='img/thumbdown.png'>";
		var a = document.querySelector("#End"); 
		a.setAttribute("class", "button alert");
	}else{
		document.getElementById("VoltageCheck").innerHTML = "<img src='img/thumbup.png'>";
		var a = document.querySelector("#End"); 
		a.setAttribute("class", "button success");
	}

}}

function enableButtons(){
	if (Voltage > 0){
		document.getElementById("cabName").style.color = "#ffffff";
		var radios = document.getElementsByName('CableCSA');
		for (var i = 0; i< radios.length;  i++){
		radios[i].disabled = false;
		}
	}
	if (CableCSA > 0){
		document.getElementById("supName").style.color = "#ffffff";
		var radios = document.getElementsByName('SupplyWattage');
		for (var i = 0; i< radios.length;  i++){
		radios[i].disabled = false;
		}
	}
	if (SupplyWattage > 0){
		document.getElementById("tolName").style.color = "#ffffff";
		var radios = document.getElementsByName('Tolerance');
		for (var i = 0; i< radios.length;  i++){
		radios[i].disabled = false;
		}
	}
	if (Tolerance > 0){
		document.getElementById("cabLName").style.color = "#ffffff";
		var a = document.querySelector("#CurrentSlider2"); 
		a.setAttribute("class", "slider");
		}
	if (CableLength > 0){
		document.getElementById("curName").style.color = "#ffffff";
		var a = document.querySelector("#CurrentSlider1"); 
		a.setAttribute("class", "slider");
		}
}


function setCurrentMax(){
	Current = SupplyWattage / Voltage;
	Current = Math.round(Current);
	if (Current == 0){
		Current = 1;
	}
	var CurrentSlider = new Foundation.Slider( $("#CurrentSlider1"), {end: Current});


}

document.getElementById('Voltage').onchange = function() {


	if (document.getElementById('Voltage5').checked){
	
	Voltage = document.getElementById('Voltage5').value;
	
	}
	if (document.getElementById('Voltage12').checked){
	
	Voltage = document.getElementById('Voltage12').value;
	
	}
	if (document.getElementById('Voltage24').checked){
	
	Voltage = document.getElementById('Voltage24').value;
	
	}
	if (document.getElementById('Voltage48').checked){
	
	Voltage = document.getElementById('Voltage48').value;
	
	}

	vDropMaxCalc()
	setCurrentMax()
	enableButtons()
}

document.getElementById('CableCSA').onchange = function() {


	if (document.getElementById('Cable0.75').checked){
	
	CableCSA = document.getElementById('Cable0.75').value;
	
	}
	if (document.getElementById('Cable1.5').checked){
	
	CableCSA = document.getElementById('Cable1.5').value;
	
	}
	if (document.getElementById('Cable2.5').checked){
	
	CableCSA = document.getElementById('Cable2.5').value;
	
	}
	if (document.getElementById('Cable4.0').checked){
	
	CableCSA = document.getElementById('Cable4.0').value;
	
	}
	if (document.getElementById('Cable6.0').checked){
	
	CableCSA = document.getElementById('Cable6.0').value;
	
	}

	vDropCalc();
	vDropMaxCalc()
	enableButtons()

}

document.getElementById('SupplyWattage').onchange = function() {

	SupplyWattage = document.getElementById('SupplyWattage').value;

	vDropMaxCalc()
	setCurrentMax()
	enableButtons()

}

document.getElementById('Tolerance').onchange = function() {

	Tolerance = document.getElementById('Tolerance').value;

	vDropMaxCalc()
		enableButtons()
}

$('.slider').on('changed.zf.slider', function() {

	Current = document.getElementById('Current').value;

	CableLength = document.getElementById('CableLength').value;

	document.getElementById("VoltageAmps").innerHTML=Current

	vDropCalc();
	vDropMaxCalc()
	enableButtons()
})




function round(value, exp) {
  if (typeof exp === 'undefined' || +exp === 0)
    return Math.round(value);

  value = +value;
  exp = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
    return NaN;

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}
