$(document).ready(function(){
	
	$('input.typeahead').typeahead({
				// name: 'countries',
				// console.log(hello);
				remote: 'http://localhost:3000/search?key=%QUERY'
				// limit: 10
			});

});
// $(document).ready(function()){


	function getData() {
		var query=$("#myInput").val();
		    // var query=JSON.parse(query);
		    console.log(query);

		     $.ajax({                           // ajax call to send the value of input server-side.
		     	url:'http://localhost:3000/testIt',
		     	type:'GET',
		     	datatype:'json',
		     	crossDomain : true,
		     	data:{"name":query},
		     	contentType:'application/json',
		     	success:function(data){
		     		// alert("success");
		     		// alert(data);
		     	}
		     });
		     var model ={};
		     var text = document.getElementById('myInput').value;
		     $.ajax({
		     	url: "http://localhost:3000/getcompanydata?q=" + text,
		     	data:model,
		     	dataType: "json",
		     	success : function (data) {
					 console.log(data);
					data = data.StudentsDataOut;
					console.log(data);
				var myString = "";
				for (var i = 0; i < data.length; i++) {
					var phoneid = data[i].phoneid;
					var company = data[i].company;
					var model = data[i].model;
					var screen_size=data[i].screen_size;
					var price=data[i].price
					
					var temp = "<a href = http://localhost:3000/phoneinfo?pid="+ phoneid + '>' +company +'&nbsp&nbsp&nbsp' + model + '&nbsp&nbsp&nbsp' +"</a></br></br>";
					var COUNT="Results Found:" + data.length+"</br>";
					myString= myString + temp;
				};
				if(data.length==0)
					var COUNT="Results Found:"+ 0 ;
					
					showIt(myString,COUNT);
				}
			});
		 }
		 function showIt(data,COUNT){
		 	testIt = data;
		 	document.getElementById('URL').innerHTML = data;
		 	document.getElementById('Counts').innerHTML = COUNT;
		 }
		